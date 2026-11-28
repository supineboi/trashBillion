/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {typeof import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelStatic<import("sequelize").Model>}
 */

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      trashId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING(2048),
        allowNull: false
      },

      categoryName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },

      icon: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },

      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      unitValuation: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },

      lineTotal: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
    },
    {
      tableName: "OrderItems",
      timestamps: true,
    }
  );

  return OrderItem;
};