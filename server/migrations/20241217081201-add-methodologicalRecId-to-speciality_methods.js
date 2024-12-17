'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('speciality_methods', 'methodologicalRecId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'methodological_recs',
        key: 'id'
      },
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('speciality_methods', 'methodologicalRecId');
  }
};
