/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {typeof import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelStatic<import("sequelize").Model>}
 */

module.exports = (sequelize, DataTypes) => {
  const Portfolio = sequelize.define(
    "Portfolio",
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

      trashId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "Portfolio",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["userId", "trashId"],
        },
      ],
    }
  );

  return Portfolio;
};
