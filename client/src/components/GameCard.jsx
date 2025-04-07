import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteGame } from '../app/features/gamesData/gamesSlice';

const GameCard = ({ id, developer, gameImg, genre, name, releaseDate }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="card bg-base-300 shadow flex flex-row">
        <figure className="flex flex-col">
          <img
            src={gameImg}
            alt="product image"
            className="max-w-sm h-3/4 rounded-lg shadow ml-5"
          />
        </figure>
        <div className="card-body flex-1">
          <b>{name}</b>
          <hr />
          <div>
            <i className="fa-solid fa-gamepad"></i> {genre}
          </div>
          <div>
            <i className="fa-brands fa-dev"></i> {developer}
          </div>
          <div>
            <i className="fa-solid fa-calendar-days"></i> {releaseDate}
          </div>
          <button
            className="btn btn-error btn-sm w-full mt-2"
            onClick={() => dispatch(deleteGame(id))}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default GameCard;
