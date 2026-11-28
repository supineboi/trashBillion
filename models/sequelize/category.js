/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {typeof import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelStatic<import("sequelize").Model>}
 */

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },

      icon: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      tableName: "Categories",
      timestamps: true,
    }
  );

  return Category;
};
