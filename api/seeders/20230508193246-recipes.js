"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Recipes", [
      {
        name: "Pizza",
        content:
          "1 pre-made pizza crust, 1/2 cup pizza sauce, 1 cup shredded mozzarella cheese, and toppings of your choice.",
      },
      {
        name: "Burger",
        content: "Burger Buns, beef patty, tomatoe, lettuce, mayo, and ketchup",
      },
      {
        name: "Fettucini alfredo",
        content: "fettucini noodles, alfredo sauce, and basil",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Recipes", null, {});
  },
};
