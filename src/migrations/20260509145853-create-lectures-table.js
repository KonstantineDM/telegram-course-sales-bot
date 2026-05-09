'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('lectures', {
      id: { primaryKey: true, type: 'uuid', unique: true, defaultValue: Sequelize.literal('uuid_generate_v4()') },
      name: { type: 'varchar', allowNull: false },
      description: { type: 'varchar', allowNull: false },
      price: { type: 'varchar', allowNull: false, defaultValue: 0 },
      currency: { type: 'varchar', allowNull: false, defaultValue: 'USD' },
      createdAt: { type: 'timestamptz', allowNull: false, defaultValue: new Date() },
      deletedAt: { type: 'timestamptz', allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lectures');
  },
};
