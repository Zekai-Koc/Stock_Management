const Mobile = require("./mobile");
const sequelize = require("./database");

// Combined data from data.json and additional dummy data
const mobilesData = [
   {
      IMEI: "123456789012345",
      Model: "Samsung Galaxy S10",
      Color: "Black",
      Storage: "128 GB",
      Grade: "A",
      SerialNumber: "s242",
   },
   {
      IMEI: "123456789012346",
      Model: "Samsung Galaxy S10+",
      Color: "White",
      Storage: "128 GB",
      Grade: "B",
      SerialNumber: "s243",
   },
   {
      IMEI: "123456789012347",
      Model: "Samsung Galaxy S10e",
      Color: "Green",
      Storage: "128 GB",
      Grade: "C",
      SerialNumber: "s244",
   },
   {
      IMEI: "123456789012348",
      Model: "iPhone XS",
      Color: "Gold",
      Storage: "64 GB",
      Grade: "A",
      SerialNumber: "s245",
   },
   {
      IMEI: "123456789012349",
      Model: "iPhone XS Max",
      Color: "Silver",
      Storage: "64 GB",
      Grade: "B",
      SerialNumber: "s246",
   },
   {
      IMEI: "123456789012350",
      Model: "iPhone 11",
      Color: "Black",
      Storage: "64 GB",
      Grade: "A",
      SerialNumber: "i001",
   },
   {
      IMEI: "123456789012351",
      Model: "iPhone 11 Pro",
      Color: "Space Gray",
      Storage: "256 GB",
      Grade: "B",
      SerialNumber: "i002",
   },
   {
      IMEI: "123456789012352",
      Model: "iPhone 12",
      Color: "Blue",
      Storage: "128 GB",
      Grade: "A",
      SerialNumber: "i003",
   },
   {
      IMEI: "123456789012353",
      Model: "iPhone 12 Pro",
      Color: "Pacific Blue",
      Storage: "256 GB",
      Grade: "A",
      SerialNumber: "i004",
   },
   {
      IMEI: "123456789012354",
      Model: "iPhone 13",
      Color: "Pink",
      Storage: "128 GB",
      Grade: "A",
      SerialNumber: "i005",
   },
   {
      IMEI: "123456789012355",
      Model: "iPhone 13 Pro",
      Color: "Sierra Blue",
      Storage: "512 GB",
      Grade: "A",
      SerialNumber: "i006",
   },
];

// Sync the database and populate the data
sequelize
   .sync({ force: true })
   .then(async () => {
      await Mobile.bulkCreate(mobilesData);
      console.log("Mobiles data has been populated.");
      sequelize.close();
   })
   .catch((error) => {
      console.error("Error populating data:", error);
   });
