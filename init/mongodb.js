const mongose = require("mongoose");
const ConnectionUrl = "mongodb://localhost:27017/Todoapp"; //Connection Url to MongoDB server

const connectmongodb = async () => {
  try {
    await mongose.connect(ConnectionUrl);
    console.log("Database Connceted");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectmongodb;
