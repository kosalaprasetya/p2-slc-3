'use strict';
const { hashPassword } = require('../helpers/bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const gamesData = require('../db/games.json');
    const usersData = require('../db/users.json');
    await queryInterface.bulkInsert(
      'Users',
      usersData.map((el) => {
        delete el.id;
        el.createdAt = el.updatedAt = new Date();
        el.password = hashPassword(el.password);
        return el;
      })
    );
    await queryInterface.bulkInsert(
      'Games',
      gamesData.map((el) => {
        delete el.id;
        el.createdAt = el.updatedAt = new Date();
        return el;
      })
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Games', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
