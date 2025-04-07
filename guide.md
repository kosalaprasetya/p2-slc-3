### **Langkah-Langkah Pengembangan**

#### **1. Setup Lingkungan**
- Pastikan semua dependency di package.json sudah terinstall dengan menjalankan:
  ```bash
  npm install
  ```
- Pastikan database PostgreSQL sudah berjalan dan konfigurasi di config.json sesuai.

#### **2. Migrasi dan Seed Data**
- Jalankan migrasi untuk membuat tabel:
  ```bash
  npx sequelize db:migrate
  ```
- Jalankan seeder untuk mengisi data awal:
  ```bash
  npx sequelize db:seed:all
  ```

#### **3. Validasi Fitur Utama**
Fokus pada fitur utama yang sudah ada:
1. **Autentikasi (Login & Register)**
2. **CRUD Game (Create, Read, Delete)**

#### **4. Testing**
- Jalankan unit test yang sudah ada untuk memastikan fitur berjalan:
  ```bash
  jest
  ```

#### **5. Dokumentasi**
- Pastikan dokumentasi API (`api_doc.md`) sudah sesuai dengan implementasi.

---

### **Alur Aplikasi**

#### **1. Register**

- **Input**: `email`, `name`, `password`
- **Proses**:
  1. Validasi input.
  2. Hash password menggunakan `bcryptjs`.
  3. Simpan data ke tabel `Users`.
- **Output**: Data user tanpa password.

#### **2. Login**

- **Input**: `email`, `password`
- **Proses**:
  1. Validasi input.
  2. Cari user berdasarkan email.
  3. Cocokkan password menggunakan `bcryptjs`.
  4. Jika cocok, buat token JWT.
- **Output**: `access_token`.

#### **3. Get Games**

- **Input**: Token JWT (header).
- **Proses**:
  1. Verifikasi token JWT.
  2. Ambil semua data game dari tabel `Games`.
- **Output**: Daftar game.

#### **4. Create Game**

- **Input**: Data game (`name`, `gameImg`, `releaseDate`, `developer`, `genre`) dan token JWT.
- **Proses**:
  1. Verifikasi token JWT.
  2. Validasi input.
  3. Simpan data ke tabel `Games`.
- **Output**: Data game yang baru dibuat.

#### **5. Delete Game**

- **Input**: `id` game (params) dan token JWT.
- **Proses**:
  1. Verifikasi token JWT.
  2. Cek apakah user memiliki akses ke game tersebut.
  3. Hapus data game dari tabel `Games`.
- **Output**: Pesan sukses.

---

### **Algoritma Fitur**

#### **1. Register**

```plaintext
1. Terima input: email, name, password.
2. Validasi input (tidak boleh kosong, email harus valid).
3. Hash password menggunakan bcrypt.
4. Simpan data ke tabel Users.
5. Kembalikan data user tanpa password.
```

#### **2. Login**

```plaintext
1. Terima input: email, password.
2. Validasi input (tidak boleh kosong).
3. Cari user berdasarkan email.
4. Jika user tidak ditemukan, kembalikan error.
5. Cocokkan password menggunakan bcrypt.
6. Jika cocok, buat token JWT.
7. Kembalikan token JWT.
```

#### **3. Get Games**

```plaintext
1. Ambil token dari header Authorization.
2. Verifikasi token JWT.
3. Jika token valid, ambil semua data game dari tabel Games.
4. Kembalikan daftar game.
```

#### **4. Create Game**

```plaintext
1. Ambil token dari header Authorization.
2. Verifikasi token JWT.
3. Validasi input game (tidak boleh kosong).
4. Simpan data game ke tabel Games dengan UserId dari token.
5. Kembalikan data game yang baru dibuat.
```

#### **5. Delete Game**

```plaintext
1. Ambil token dari header Authorization.
2. Verifikasi token JWT.
3. Cari game berdasarkan id.
4. Jika game tidak ditemukan, kembalikan error.
5. Cek apakah UserId pada game sama dengan UserId dari token.
6. Jika tidak sama, kembalikan error.
7. Hapus game dari tabel Games.
8. Kembalikan pesan sukses.
```

---

### **Contoh Implementasi Kode**

#### **Register (UserController)**

```javascript
static async register(req, res, next) {
  try {
    const { email, name, password } = req.body;
    const result = await User.create({ email, name, password });
    res.status(201).json({
      id: result.id,
      name: result.name,
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
}
```

#### **Login (UserController)**

```javascript
static async login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw { name: 'bad request', message: 'Email and Password are required' };

    const user = await User.findOne({ where: { email } });
    if (!user || !comparePassword(password, user.password)) {
      throw { name: 'unauthorized', message: 'Invalid email/password' };
    }

    const token = signToken({ id: user.id, email: user.email });
    res.status(200).json({ access_token: token });
  } catch (error) {
    next(error);
  }
}
```

#### **Get Games (GameController)**

```javascript
static async getGames(req, res, next) {
  try {
    const games = await Game.findAll();
    res.status(200).json(games);
  } catch (error) {
    next(error);
  }
}
```

#### **Delete Game (GameController)**

```javascript
static async deleteGame(req, res, next) {
  try {
    const { id } = req.params;
    const game = await Game.findByPk(id);
    if (!game) throw { name: 'not found', message: 'Game not found' };

    if (game.UserId !== req.user.id) throw { name: 'forbidden', message: 'You are not authorized' };

    await Game.destroy({ where: { id } });
    res.status(200).json({ message: 'Game has been deleted' });
  } catch (error) {
    next(error);
  }
}
```

---

### **Panduan untuk Pengembangan Serupa**

1. **Setup Awal**:

   - Gunakan `sequelize-cli` untuk membuat model, migrasi, dan seeder.
   - Pastikan struktur database sesuai kebutuhan.

2. **Autentikasi**:

   - Gunakan `bcryptjs` untuk hashing password.
   - Gunakan `jsonwebtoken` untuk token-based authentication.

3. **Middleware**:

   - Buat middleware untuk `authentication` dan `authorization`.

4. **Testing**:

   - Gunakan `jest` dan `supertest` untuk pengujian unit dan integrasi.

5. **Dokumentasi**:
   - Buat dokumentasi API yang jelas untuk mempermudah pengembangan di masa depan.
