'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING, allowNull: false },
      surname: { type: Sequelize.STRING, allowNull: false },
      patronymic: { type: Sequelize.STRING, allowNull: true },
      phone_number: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, unique: true, allowNull: false },
      password: { type: Sequelize.STRING, allowNull: false },
      roles: { type: Sequelize.STRING, defaultValue: "USER" },
      position: { type: Sequelize.STRING, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('methodological_recs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      date_realese: { type: Sequelize.DATE, allowNull: false },
      title: { type: Sequelize.STRING, unique: true, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      language: { type: Sequelize.STRING, allowNull: false },
      year_create: { type: Sequelize.INTEGER, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
      quantity_pages: { type: Sequelize.INTEGER, allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    await queryInterface.createTable('user_methodologicals', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      userId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'users', key: 'id' } },
      methodologicalRecId: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'methodological_recs', key: 'id' } },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });

    // Добавьте другие таблицы и ассоциации здесь...
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_methodologicals');
    await queryInterface.dropTable('methodological_recs');
    await queryInterface.dropTable('users');
    // Удалите другие таблицы здесь...
  }
};
