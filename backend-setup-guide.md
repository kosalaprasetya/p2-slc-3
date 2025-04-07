# 🛠️ Backend Setup Guide (Express.js + Sequelize + JWT + Bcrypt + PostgreSQL)

Panduan lengkap setup backend menggunakan Express.js, Sequelize, JWT, bcrypt, CORS, dan PostgreSQL.

---

## 0. Inisialisasi Project

```bash
npm init -y
npm install express sequelize pg sequelize-cli bcryptjs jsonwebtoken cors
npm install --save-dev jest supertest
npx sequelize init
touch .gitignore
echo node_modules > .gitignore
```

---

## 1. Konfigurasi Database

Edit `config/config.json` (atau `config/config.js` jika menggunakan JS):

```json
"development": {
  "username": "postgres",
  "password": "yourpassword",
  "database": "your_db_name",
  "host": "127.0.0.1",
  "dialect": "postgres"
}
```

Buat database:

```bash
npx sequelize db:create
```

---

## 2. Membuat Model & Migration

```bash
npx sequelize model:generate --name User --attributes email:string,password:string
```

### Contoh Migration File

```js
email: {
  type: Sequelize.STRING,
  allowNull: false,
  unique: true
}
```

### Contoh Model File

```js
email: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: {
    msg: 'Email must be unique'
  },
  validate: {
    notNull: { msg: 'Email is required' },
    notEmpty: { msg: 'Email cannot be empty' },
    isEmail: { msg: 'Invalid email format' }
  }
}
```

---

## 3. Setup Relasi (Association)

### Migration (foreign key)

```js
userId: {
  type: Sequelize.INTEGER,
  references: {
    model: { tableName: 'Users' },
    key: 'id'
  }
}
```

### Model

```js
User.hasMany(Product);
Product.belongsTo(User);
```

---

## 4. Jalankan Migrasi

```bash
npx sequelize db:migrate
```

---

## 5. Setup Helpers

```bash
mkdir helpers
touch helpers/bcrypt.js helpers/jwt.js
```

### bcrypt.js

```js
const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword: (password) => bcrypt.hashSync(password, 10),
  comparePassword: (password, hash) => bcrypt.compareSync(password, hash)
}
```

### jwt.js

```js
const jwt = require('jsonwebtoken');
const SECRET = 'secretkey';

module.exports = {
  signToken: (payload) => jwt.sign(payload, SECRET),
  verifyToken: (token) => jwt.verify(token, SECRET)
}
```

---

## 6. Setup Express App

```bash
touch app.js
mkdir controllers routes middlewares
touch controllers/userController.js routes/userRoutes.js
```

### app.js

```js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

module.exports = app;
```

---

## 7. Auth: Register & Login

### Register
- Ambil email, password
- Hash password sebelum disimpan
- Simpan user ke database

### Login
- Validasi input
- Cek user berdasarkan email
- Bandingkan password
- Generate dan kirim `access_token`

---

## 8. Middleware: Error Handler

```js
module.exports = (err, req, res, next) => {
  let code = 500;
  let message = 'Internal Server Error';

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === 'Unauthorized') {
    code = 401;
    message = 'Invalid email/password';
  } else if (err.name === 'Forbidden') {
    code = 403;
    message = 'Access denied';
  } else if (err.name === 'NotFound') {
    code = 404;
    message = 'Data not found';
  }

  res.status(code).json({ message });
}
```

---

## 9. Middleware: Authentication

```js
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization?.split(' ')[1];
    if (!access_token) throw { name: 'Unauthorized' };

    const payload = verifyToken(access_token);
    const user = await User.findByPk(payload.id);
    if (!user) throw { name: 'Unauthorized' };

    req.user = { id: user.id, email: user.email };
    next();
  } catch (err) {
    next(err);
  }
}
```

---

## 10. Middleware: Authorization

```js
const { Product } = require('../models');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const product = await Product.findByPk(id);
  if (!product) throw { name: 'NotFound' };

  if (product.userId !== userId) throw { name: 'Forbidden' };

  next();
}
```

---

## 11. Product Features (CRUD)

### Get All Products (Auth)

```js
const products = await Product.findAll({
  where: { userId: req.user.id },
  attributes: { exclude: ['createdAt', 'updatedAt'] }
});
res.status(200).json(products);
```

### Create Product (Auth)

```js
const { name, price } = req.body;
const newProduct = await Product.create({ name, price, userId: req.user.id });
res.status(201).json(newProduct);
```

### Delete Product (Auth + Authorization)

```js
await Product.destroy({ where: { id: req.params.id } });
res.status(200).json({ message: 'Product deleted' });
```

### Update Product (Auth + Authorization)

```js
const { name, price } = req.body;
await Product.update({ name, price }, { where: { id: req.params.id } });
res.status(200).json({ message: 'Product updated' });
```

---

## ✅ Testing (Opsional)

Setup `jest` dan `supertest` untuk membuat test integration/unit.

```js
const request = require('supertest');
const app = require('../app');

test('GET /users should return all users', async () => {
  const res = await request(app).get('/users');
  expect(res.statusCode).toBe(200);
});
```

---

## ✅ Struktur Folder Final (Contoh)

```
├── app.js
├── config/
├── controllers/
├── helpers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── seeders/
└── .gitignore
```

---

## 🔚 Selesai!

Backend siap digunakan! Jalankan server:

```bash
node app.js
```

Untuk testing dan pengembangan lanjut, kamu bisa tambahkan fitur search, filter, pagination, soft delete, dsb.