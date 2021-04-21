const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Customer = require('./models/customer');
const Admin = require('./models/admin');
const Transaction = require('./models/transaction_history');
const { type } = require('os');

mongoose.connect('mongodb://localhost:27017/CustomerApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connection openn!!!!!")
    })
    .catch((err) => {
        console.log("Oh no!! Connection failed");
        console.log(err);
    })


app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));  //For all the static files like css/js
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })) //For getting form data
app.use(methodOverride('_method'));


app.get('/', async (req, res) => {
    res.render('index')
})

app.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.render('allcustomers', { customers })
})

app.get('/customers/:id', async (req, res) => {
    const id = req.params.id
    const sender = await Customer.findById(id);
    // console.log(c);
    const customers = await Customer.find();
    res.render('show', { sender, customers })
})

// app.get('/transfer/:id', async (req, res) => {
//     const id = req.params.id;
//     const amount = req.query.amount;

//     if (parseInt(amount) < sender.totalAmount) {
//         const person = await Customer.findById(id);
//         const receiver_newAmount = person.totalAmount + parseInt(amount);
//         await Customer.findByIdAndUpdate(id, { totalAmount: receiver_newAmount });
//         await Admin.updateOne({ _id: sender._id }, { totalAmount: sender.totalAmount - parseInt(amount) });
//         res.send(`<h1> ${amount} Rs. sent to ${person.name}</h1>`);
//         // Transaction.insertOne({ to: person.name, amount: parseInt(amount) }, function (err, res) {
//         //     if (err) throw err;
//         //     console.log("Inserted succesfully")
//         // })
//         const t = new Transaction({ to: person.name, amount: parseInt(amount) });
//         await t.save();
//     }
//     res.send(`<h1>Sorry ${sender.name}. Not enough balance in your account</h1>`)
// })


app.post('/transfer/:id', async (req, res) => {
    const id = req.params.id
    const to = req.body.to
    const amount = req.body.amount
    const sender = await Customer.findById(id)
    // console.log(req.body)


    if ((0 < parseInt(amount)) && (parseInt(amount) < sender.totalAmount)) {
        const receiver = await Customer.findOne({ name: to })
        const receiver_newAmount = receiver.totalAmount + parseInt(amount);
        await Customer.updateOne({ name: to }, { $set: { totalAmount: receiver_newAmount } }, { runValidators: true })
        await Customer.updateOne({ name: sender.name }, { $set: { totalAmount: sender.totalAmount - parseInt(amount) } }, { runValidators: true })
        const t = new Transaction({ from: sender.name, to: receiver.name, amount: parseInt(amount) });
        await t.save();
        res.redirect('/transaction')
    }
    else if (parseInt(amount) <= 0) {
        res.send("<h1>Amount entered is Negative or Zero</h1>")
    }
    res.send(`<h1>Sorry ${sender.name}. Not enough balance in your account</h1>`)
})

app.get('/transaction', async (req, res) => {
    const history = await Transaction.find();
    res.render('transaction_history', { history })
})

app.listen(3000, () => {
    console.log("Port is listening on 3000");
})