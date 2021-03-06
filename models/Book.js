module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    isbn: DataTypes.STRING,
    review: DataTypes.TEXT
  }, {
    freezeTableName: true,
    dialectOptions: {
      timeout: 29
    }
  });
  return Book;
};
