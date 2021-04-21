const mongoose = require('mongoose');

const Product = require('./models/customer')

mongoose.connect('mongodb://localhost:27017/CustomerApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection openn!!!!!")
    })
    .catch((err) => {
        console.log("Oh no!! Connection failed");
        console.log(err);
    })


const Customer = [
    {
        name : "Priya Singh",
        email : "priyasingh@gmail.com",
        totalAmount : 30000
    },
    {
        name : "Adi Arora",
        email : "adiarora@gmail.com",
        totalAmount : 200000
    },
    {
        name : "Satyam Nagar",
        email : "satyam-nagar@gmail.com",
        totalAmount : 9000
    },
    {
        name : "Ruchi Padwal",
        email : "ruchipadwal13@gmail.com",
        totalAmount : 1500000
    },
    {
        name : "Fatima Shaikh",
        email : "fatima123@gmail.com",
        totalAmount : 1110000
    },
    {
        name : "Anurag Dutta",
        email : "anuragDutta@gmail.com",
        totalAmount : 970000
    },
    {
        name : "Carol Fernandes",
        email : "carolf@gmail.com",
        totalAmount : 130000
    },
    {
        name : "Musa Khan",
        email : "musa-khan@gmail.com",
        totalAmount : 3000000
    },
    {
        name : "Mariam",
        email : "mariam@gmail.com",
        totalAmount : 801000
    },
    {
        name : "Krishna Dandekar",
        email : "dandekarkrishna@gmail.com",
        totalAmount : 1020300
    }
]

Product.insertMany(Customer)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })

// const a = new Admin(
//     {
//         name: "Krystal D'souza",
//         email: "kdsouza123@gmail.com",
//         totalAmount: 777830000
//     }
// )

// a.save().then(msg => {
//     console.log(msg)
// })
//     .catch(e => {
//         console.log(e)
//     })
