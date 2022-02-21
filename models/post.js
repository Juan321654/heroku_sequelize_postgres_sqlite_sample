"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      // this.belongsTo(User, { foreignKey: "user_id" });
      this.belongsTo(User, { foreignKey: "user_id", targetKey: "user_id" });
    }
  }
  Post.init(
    {
      post_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
      underscored: true,
      foreignKey: "user_id",
    }
  );
  return Post;
};
