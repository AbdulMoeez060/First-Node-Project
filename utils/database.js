const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://moeez2:moeez@cluster0.drot1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
    .then((result) => {
      console.log("Connected DB");
      callback(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;