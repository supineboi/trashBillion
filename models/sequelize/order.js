/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {typeof import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelStatic<import("sequelize").Model>}
 */

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      orderNumber: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },

      totalAmount: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("confirmed", "cancelled"),
        allowNull: false,
        defaultValue: "confirmed",
      },
    },
    {
      tableName: "Orders",
      timestamps: true,
    }
  );

  return Order;
};
