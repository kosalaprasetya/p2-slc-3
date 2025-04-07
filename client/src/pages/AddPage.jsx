import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import http from '../helpers/http';
import Swal from 'sweetalert2';

const AddPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [gameImg, setGameImg] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [developer, setDeveloper] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http({
        method: 'POST',
        url: '/games',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
        data: { name, gameImg, releaseDate, developer, genre },
      });
      console.log(response);
      navigate('/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div className="p-10">
        <form
          className="bg-base-300 p-5 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Name"
                className="w-full input input-bordered input-accent"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Game Image (URL)</span>
              </label>
              <input
                value={gameImg}
                onChange={(e) => setGameImg(e.target.value)}
                name="gameImg"
                type="text"
                placeholder="Enter Game Image"
                className="w-full input input-bordered input-accent"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Release Date</span>
              </label>
              <input
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                name="releaseDate"
                type="date"
                placeholder="date"
                className="w-full input input-bordered input-accent"
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Developer</span>
              </label>
              <input
                value={developer}
                onChange={(e) => setDeveloper(e.target.value)}
                name="developer"
                type="text"
                placeholder="Enter Developer"
                className="w-full input input-bordered input-accent"
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="label">
              <span className="text-base label-text">Genre</span>
            </label>
            <select
              className="w-full btn btn-outline btn-accent"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              name="genre"
            >
              <option
                disabled
                selected
              >
                SELECT GENRE
              </option>
              <option value="MOBA">MOBA</option>
              <option value="FPS">FPS</option>
              <option value="BR">Battle Royale</option>
            </select>
          </div>

          <button className="w-full btn btn-accent mt-10">Add New Game</button>
        </form>
      </div>
    </>
  );
};

export default AddPage;
