var mongoose = require('mongoose');



//connect to mongodb
mongoose.connect("mongodb://localhost:27017/vizaglibrary")

mongoose.Promise = global.Promise;

exports.mongoose=mongoose;

//create schemas
var bookSchema = mongoose.Schema({
    _id:Number,
    title: {
        type: String,
        required: true
    },
    author: String,
    publishedOn: Date,
    categories: [String],
});

//create model
exports.Book = mongoose.model('Book',bookSchema, 'books')

//Users fields name, email, phone

//User Schema

//User Model

//Notification API

// var notificationSchema=mongoose.Schema({
//     bookId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Book'
//     },
//     notificationDate: Date,
//     status: {
//         type:String,
//         default:"Pending"
//     }
// })

// exports.Notification = mongoose.Model("Notification",notificationSchema,'notifications')