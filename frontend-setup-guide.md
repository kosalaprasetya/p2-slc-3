# ⚛️ Frontend Setup Guide (React + Vite + React Router + State Management)

Panduan cepat untuk membangun client side menggunakan React + Vite dengan struktur dan fitur sesuai dengan kebutuhan simulasi live code.

---

## 🛠️ Release 0.2: Client Setup

### 1. Inisialisasi Project dengan Vite

```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install react-router-dom axios
```

### 2. Struktur Folder

```
client/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
```

### 3. Setup Routing

Install `react-router-dom`, lalu di `main.jsx`:

```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>
```

Di `App.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import AddGame from './pages/AddGame';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-game" element={<AddGame />} />
    </Routes>
  );
}
```

---

## 🔐 Release 1: Authentication (Register, Login, Logout)

### 1. Halaman Register & Login

- Gunakan `axios` untuk POST ke `/register` dan `/login`
- Simpan token login ke `localStorage`
- Redirect user ke home (`/`) setelah login berhasil
- Tambahkan navigasi ke `/register` atau `/login` di form

### 2. Auto-login

Di `App.jsx` atau hook global, periksa token di `localStorage` untuk validasi login.

```js
const token = localStorage.getItem('access_token');
```

Jika tidak ada token, redirect ke `/login`.

### 3. Logout

- Buat tombol Logout di Navbar
- Hapus token dari `localStorage`, redirect ke `/login`

```js
localStorage.removeItem('access_token');
navigate('/login');
```

---

## 🎮 Release 2: Fetch Games

### 1. GET /games

- Fetch games dari server menggunakan `axios.get` dengan Authorization header.
- Simpan hasil di state (`useState` atau context).

```js
axios.get('/games', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
```

### 2. Halaman Home

- Gunakan component `GameCard` untuk tiap item.
- Hanya bisa diakses jika user sudah login.

```jsx
{games.map(game => <GameCard key={game.id} {...game} />)}
```

---

## ➕ Release 3: Add Game

### 1. Halaman AddGame

- Buat form dengan field game (misal: name, genre, release date)
- POST ke `/games` menggunakan `axios`
- Redirect ke `/` setelah berhasil
- Update list games di home (tanpa refresh)

---

## ❌ Release 4: Delete Game

### 1. Tombol Delete

- Tambahkan di komponen `GameCard`
- Ketika diklik, panggil DELETE `/games/:id`
- Update state list games setelah berhasil

```js
axios.delete(`/games/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
})
```

---

## ✅ Checkpoint Commit Format

```bash
git add .
git commit -m "Release 1.4 Client: Login Page, Done"
git push
```

---

## ✅ Komponen yang Harus Dibuat

- `pages/Register.jsx`
- `pages/Login.jsx`
- `pages/Home.jsx`
- `pages/AddGame.jsx`
- `components/GameCard.jsx`
- `components/Navbar.jsx`

---

## 🎯 Selesai!

Client siap dihubungkan ke server dan dikembangkan lebih lanjut!