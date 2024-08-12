const mongoose = require('mongoose')
const fs = require('fs')
const validator = require('validator')
//schema

const moviesscema = new mongoose.Schema({
    Name: {
        type: String,

        required: [true, 'Name is required'],

        unique:true,
        validate: [validator.isAlpha, 'Name should be only letters']
    },
    Description: {
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
    TotalRating:{
        type:Number

    },
    ReleaseYear:{
        type: Number,

        required:[true,'Release year is required']

    },
    ReleaseDate:{
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
    CoverImage:{
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

},{
    toJSON:{virtuals:true}, //display the virtual properties
    toObject:{virtuals:true}
})
//virtual properties

moviesscema.virtual('DurationInHours').get(function(){
    return this.Duration/60;
})

//executig berfor and after docuent is created

moviesscema.pre('save',function(next){
    this.createdBy ='Panda'
    next() 
})
moviesscema.post('save', function(doc,next){
    const content = `content was movie ${doc.Name} was created by ${doc.createdBy}`
    fs.writeFileSync('./data/text.txt', content, {flag:'a'}, (err)=>{
        console.log(err.message)
    })

    next();
     
})

moviesscema.pre(['find', 'findOne'],function(next){
    // this.find({ReleaseDate:{$lte: Date.now()}})
    this.StartTime = Date.now();
    console.log('hello')
    next()
})

moviesscema.post(['find', 'fineOne'], function(doc, next){
    // this.find({ReleaseDate:{$lte: Date.now()}})

    this.EndTime = Date.now();
    const content = `query took ${this.EndTime - this.StartTime} milliseconds`
    fs.writeFileSync('./data/text.txt', content, {flag:'a'}, (err)=>{
        console.log(err.message)
    })

    next()

})
// moviesscema.pre('find' ,function(next){
//     this.find({ReleaseDate:{$lte: Date.now()}})
//     // next()
// })

 moviesscema.pre('aggregate', function(next){
    console.log(this.pipeline().unshift({$match:{ReleaseDate:{$lte: Date()}}}))
    next()
 })
//creating a model
const Moviee = mongoose.model(('moviees'), moviesscema);

 

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