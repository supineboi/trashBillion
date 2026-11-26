
const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Trash = sequelize.define("Trash", {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    valuation: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true
    },
    growth: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(50),
        defaultValue: "Available"
    },
    seller: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    listedOn: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "trash",
    timestamps: false
});

module.exports = Trash;
