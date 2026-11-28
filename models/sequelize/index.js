const sequelize = require('../../config/sequelize')
const { DataTypes } = require("sequelize");
const fs = require('fs/promises');
const path = require("path");


// Import models
const User = require("./user")(sequelize, DataTypes);
const Category = require("./category")(sequelize, DataTypes);
const Trash = require("./trash")(sequelize, DataTypes);
const Portfolio = require("./portfolio")(sequelize, DataTypes);
const Order = require("./order")(sequelize, DataTypes);
const OrderItem = require("./orderItem")(sequelize, DataTypes);

// Reusable association helper
const associate = (Parent, Child, foreignKey, parentAlias, childAlias) => {
  Parent.hasMany(Child, {
    foreignKey,
    as: parentAlias,
  });

  Child.belongsTo(Parent, {
    foreignKey,
    as: childAlias,
  });
};

// Define associations

associate(User, Trash, "sellerId", "createdTrash", "seller");

associate(Category, Trash, "categoryId", "trashListings", "category");

associate(User, Portfolio, "userId", "portfolios", "user");

associate(Trash, Portfolio, "trashId", "portfolioEntries", "trash");

associate(User, Order, "userId", "orders", "buyer");

associate(Order, OrderItem, "orderId", "items", "order");

associate(Trash, OrderItem, "trashId", "orderItems", "trash");

// ===================

const loadDefaults = async () => {
  const skipFiles =  [
    'trashes.json',
    'users.json'
  ]
  const folderPath = path.join(__dirname, '..', '..', 'data');

    try {
        const files = await fs.readdir(folderPath);
        for (const file of files) {
            if(skipFiles.includes(file)) continue;
            const filePath = path.join(folderPath, file);
            const content = await fs.readFile(filePath, 'utf-8');
            const data = JSON.parse(content);

            for(const entry of data){
               await Category.create(entry)
            }
        }

    } catch (error) {
        console.error(error);
    }
};

function initializeModels(){
    console.log("Initialize Sequelize -->")
    sequelize.sync({
        // force: true
    })
    .then( async res => {
      // loadDefaults()
      console.log("DATABASE CONNECTED SUCCESSFULLY!")
    })
    .catch(err => console.log("DATABASE NOT CONNECTED! :: ",err));
}

module.exports = {
  initializeModels,
  sequelize,
  User,
  Category,
  Trash,
  Portfolio,
  Order,
  OrderItem,
};
