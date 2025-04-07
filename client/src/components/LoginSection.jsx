import React, { useState } from 'react';
import logo from '../assets/hacktiv-esport.png';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import http from '../helpers/http';

const LoginSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await http({
        method: 'POST',
        url: '/login',
        data: {
          email,
          password,
        },
      });
      localStorage.setItem('access_token', res.data.access_token);
      console.log(res);
      return navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Something is wrong!',
        text: error.response.data.message,
        icon: 'error',
      });
    }
  };

  return (
    <section>
      <div className="relative flex flex-col justify-center h-[85dvh] overflow-hidden bg-base-100 mt-10 p-4">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-300">
          <div className="flex justify-center mb-5 mr-5">
            <img
              src={logo}
              className="w-1/2"
            />
          </div>
          <h1 className="text-3xl font-semibold text-center text-accent">Log In</h1>

          <form
            className="space-y-4"
            onSubmit={handleLogin}
          >
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full input input-bordered input-accent"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className="w-full input input-bordered input-accent"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button className="btn btn-accent w-full mt-5">Log In</button>
            </div>
          </form>
          <div className="divider divider-accent mt-7">OR</div>
          <p className="text-center">
            Don't have any account ? Click{' '}
            <Link
              to="/register"
              className="underline"
            >
              here
            </Link>{' '}
            to register
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
