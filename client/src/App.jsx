import { Route, Routes } from 'react-router';
import './App.css';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import PublicLayout from './layout/PublicLayout';
import AddPage from './pages/AddPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/register"
            element={<RegisterPage />}
          />
        </Route>

        <Route
          path="/"
          element={<MainLayout />}
        >
          <Route
            index
            element={<HomePage />}
          />
          <Route
            path="/add"
            element={<AddPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
