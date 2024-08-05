const mongoose = require('mongoose')

//schema

const moviesscema = new mongoose.Schema({
    Name: {
        type: String,

        required: [true, 'Name is required'],

        unique:true
    },
    Discription: {
        type:String,

        required: [true, 'Description is required']

    },
    Duration: {
        type: Number,

        required: [true, 'Movie duration is required']

    },
    Rating: {
        type:Number,

    default: 1

    },
    Totalrating:{
        type:Number

    },
    Releaseyear:{
        type: Number,

        required:[true,'Release year is required']

    },
    Releasedate:{
        type: Date,

        required:[true,'Release year is required']

    },
    Createdon:{
        type:Date,

        default: Date.now()

    },
    Genres:{
        type:[String],

        required:[true, 'Release year is required']

    },
    Directors:{
        type:[String],

        required:[true,'Direcctors are required']

    },
    Coverimage:{
        type: String,

        required:[true,'COver image is needed']

    },
    Actors:{
        type:[String],

        required:[true, 'Actor names are required']

    },
    Price:{
        type:Number,

        required:[true, 'Price uis required']

    }

})

//creating a model
const Moviee = mongoose.model(('moviee'), moviesscema);

module.exports = Moviee;



// {
//     "Name": "Inception",
//     "Description": "A mind-bending thriller about dream invasion.",
//     "Duration": 148,
//     "Rating": 8.8,
//     "TotalRating": 890000,
//     "ReleaseYear": 2010,
//     "ReleaseDate": "2010-07-16T00:00:00.000Z",
//     "Genres": ["Action", "Sci-Fi", "Thriller"],
//     "Directors": ["Christopher Nolan"],
//     "CoverImage": "https://example.com/inception.jpg",
//     "Actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
//     "Price": 15.99
// }