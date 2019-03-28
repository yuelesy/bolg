'use strict';
module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article', {
        image: DataTypes.STRING,
        body: DataTypes.TEXT,
        title: DataTypes.STRING,
        categoryId:DataTypes.STRING,
    }, {});
    Article.associate = function (models) {
        // associations can be defined here
        models.Article.belongsTo(models.Category);
    };
    return Article;
};