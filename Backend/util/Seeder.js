//////import Product Data
const productData = require("../data/product.json");

////import Product Schema
const product = require("../model/ProductModel");

///env files configrations
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.join("Backend", "Config", "config.env") });
////connect dataBase
const GetDataBase = require("../DataBase/dbconnection");
GetDataBase();

////seeder Function
const seedProducts = async () => {
  try {
    await product.deleteMany();
    console.log("dataBase Product Deleted . ");
    await product.insertMany(productData);
    console.log("All products add in seeder Fuction ..... ");
  } catch (error) {
    console.log(error);
  }
  process.exit()
};

seedProducts();
