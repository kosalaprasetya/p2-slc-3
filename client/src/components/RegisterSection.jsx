import React, { useState } from 'react';
import logo from '../assets/hacktiv-esport.png';
import { Link, useNavigate } from 'react-router';
import http from '../helpers/http';
import Swal from 'sweetalert2';

const RegisterSection = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await http({
        method: 'POST',
        url: '/register',
        data: {
          name,
          email,
          password,
        },
      });
      Swal.fire({
        title: 'Register Success!',
        text: 'Now you can continue login',
        icon: 'success',
      });
      console.log(res);
      navigate('/login');
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
      <div className="relative flex flex-col justify-center overflow-hidden bg-base-100 mt-6 p-4">
        <div className="w-full p-6 m-auto rounded-lg shadow-md lg:max-w-lg bg-base-300">
          <div className="flex justify-center mb-5 mr-5">
            <img
              src={logo}
              className="w-1/2"
            />
          </div>
          <h1 className="text-3xl font-semibold text-center text-accent">Register</h1>

          <form
            className="space-y-4"
            onSubmit={handleRegister}
          >
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-full input input-bordered input-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full input input-bordered input-accent"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <button className="btn btn-accent w-full mt-5">Register</button>
            </div>
          </form>
          <div className="divider divider-accent mt-7">OR</div>
          <p className="text-center">
            Already have an account ? Click{' '}
            <Link
              to="/login"
              className="underline"
            >
              here
            </Link>{' '}
            to login
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
