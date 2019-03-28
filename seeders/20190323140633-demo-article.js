'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:

    */
      return queryInterface.bulkInsert('Articles', [{
          image: 123,
          body: "五台山的春天和冬天可谓是傻傻分不清楚，春天可谓是春寒料峭，冬天那真是货真价实，碰上山上下雪，整个寺庙沉浸在皑皑白雪中，那可真是：忽如一夜春风来，千树万树梨花开。那空气绝对是肺的净化器，那风景绝对有穿越的感觉，青灯，古寺，钟声，带着斗笠的僧侣和喇嘛。",
          title: "五台山之春冬",
          categoryId:"1",
          createdAt: new Date(),
          updatedAt: new Date()

      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
