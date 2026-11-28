/**
 * @param {import("sequelize").Sequelize} sequelize
 * @param {typeof import("sequelize").DataTypes} DataTypes
 * @returns {import("sequelize").ModelStatic<import("sequelize").Model>}
 */

module.exports = (sequelize, DataTypes) => {
  const Trash = sequelize.define(
    "Trash",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },

      sellerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      imageUrl: {
        type: DataTypes.STRING(2048),
        allowNull: false
      },

      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      growth: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false,
        defaultValue: 0,
      },
      
      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },

      location: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      discoveryContext: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },

      valuation: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0,
      },

      status: {
        type: DataTypes.ENUM("active", "inactive", "sold"),
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      tableName: "Trash",
      timestamps: true,
    }
  );

  return Trash;
};
