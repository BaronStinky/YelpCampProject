const mongoose = require("mongoose");
const Campground = require("../models/campground")
const { places, descriptors } = require('./seedHelpers');
const cities = require("./cities")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelpCamp', {
  });
}

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => 
array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //Your user id
            author: "6661a644fdcaf7cb88b4f6f8",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: 'Point', 
              coordinates: [ 
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            image: [
                {
                  url: 'https://res.cloudinary.com/destn58yz/image/upload/v1717835545/YelpCamp/bwkxwuh4v3zueu3coolp.gif',
                  filename: 'YelpCamp/bwkxwuh4v3zueu3coolp',
                },
                {
                  url: 'https://res.cloudinary.com/destn58yz/image/upload/v1717835545/YelpCamp/j76shyefjdtllsvijzpa.gif',
                  filename: 'YelpCamp/j76shyefjdtllsvijzpa',
                },
                {
                  url: 'https://res.cloudinary.com/destn58yz/image/upload/v1717835546/YelpCamp/rwfbdaroj9m2mkkmx1lv.gif',
                  filename: 'YelpCamp/rwfbdaroj9m2mkkmx1lv',
                },
                {
                  url: 'https://res.cloudinary.com/destn58yz/image/upload/v1717835546/YelpCamp/bcvs3aj3ma8glawmck4j.gif',
                  filename: 'YelpCamp/bcvs3aj3ma8glawmck4j',
                }
              ],
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
})