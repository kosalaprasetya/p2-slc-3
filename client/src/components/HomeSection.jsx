import React, { useEffect, useState } from 'react';
import http from '../helpers/http';
import GameCard from './GameCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGames } from '../app/features/gamesData/gamesSlice';

const HomeSection = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => state.games.data);
  // const [gameData, setGameData] = useState([]);
  // const fetchGameData = async () => {
  //   try {
  //     const res = await http({
  //       method: 'GET',
  //       url: '/games',
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  //       },
  //     });
  //     const data = res.data.map((el) => {
  //       const newDate = new Date(el.releaseDate);
  //       el.releaseDate = newDate.toISOString().split('T')[0];
  //       return el;
  //     });
  //     setGameData(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  console.log(games);

  return (
    <>
      <main className="grid grid-cols-2 gap-5 px-10 my-8">
        {games.map((el, index) => {
          return (
            <GameCard
              {...el}
              key={index}
            />
          );
        })}
      </main>
    </>
  );
};

export default HomeSection;
