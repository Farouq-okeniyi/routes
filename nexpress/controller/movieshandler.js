// const fs = require('fs')
// const movies = JSON.parse(fs.readFileSync('./data/movies.json'))
const { query } = require('express');
const Moviee = require('./../model/moviemodel');
const apiFeatures = require('./../utility/apifeatures');
const CustomError = require('../utility/customError');
const asyncErrorHandler = require('./../utility/asyncErrorHandling')
const mongoose = require('mongoose')
async function GetAllMovies(req, res,next) {
   
        
        const features = new apiFeatures(Moviee.find(), req.query)
                                .filter()
                                .sort()
                                .paginate();

        const movies = await features.query; 

        res.status(201).json({
            status:"Succesful",
            
            length: movies.length,
            
            movies: movies,
        })
    }
    


const CreateMovies = async(req,res,next)=>{
        const movie = await Moviee.create(req.body)
        res.status(201).json({
            Status: 'Succesful',
            
            data: {movie}
            
        })
    }

// async function CreateMovies(req, res, next) {
  
// }

async function DeleteMovies(req, res,next) {
        const deleteMovie = await Moviee.findByIdAndDelete(req.params.id)

        if(!deleteMovie){
            const error = new CustomError('movie with that id not found')
            return next(error)
        }

        res.status(201).json({
            
            status:"Succesful",
            
            Data: null
        })
        
}

async function GetMovies(req, res,next) {
        const movie = await Moviee.findById(new mongoose.Types.ObjectId(req.params.id));
       
        if(!movie){
            const error = new CustomError('movie with that id not found')
            return next(error)
        }
        res.status(200).json({
            status:"Succesful",
            movies: movie
        })
        
   
}
async function PatchMovies(req, res,next) {

    try {
        
        const UpdatedMovie = await Moviee.findByIdAndUpdate(req.params.id, req.body, {new :true,runValidator:true });
        if(!UpdatedMovie){
            const error = new CustomError('movie with that id not found')
            return next(error)
        }
        res.status(201).json({
            Status:"Succesful",
        
            Data: UpdatedMovie
        })
    } catch (error) {
        res.status(404).json({
            Status:"UNSuccesful",
        
           Message: error.Message
        })
    }

 
    
    
}

async function getmoviestats(req,res,next){
    
        const stats = await Moviee.aggregate([
            {$match: {Rating :{$gte:4.5}}},

            {$group : {
                _id: '$ReleaseYear',
                ave_rating :{$avg : '$Rating'},
                ave_price :{$avg: '$Price'},
                min_price : {$min: '$Price'},
                max_price :{$max: '$Price'}
            }},
            {
                $sort:{min_price:-1}
            }

        ])
        res.status(200).json({
            
            Status: 'succesful',
            
            Message: {stats}
        })
  
}

async function getmoviebygenre(req,res,next) {
   
        const genre = req.params.genre;
        console.log(genre)
        const Movie = await Moviee.aggregate([
            {$unwind: '$Genres'},
            {$group: {
                _id: '$Genres',
                moviecount: {$sum: 1},
                movies:{$push: '$Name'}
            }},
            {$addFields: {genre : '$_id'}},
            {$project:{_id:0}},
            {$sort:{moviecount: -1}},
            {$match: {genre: genre}}
        ]);
        res.status(200).json({
            
            Status: 'succesful',
            
            movies: {Movie}
        })
    }

module.exports = {
    GetAllMovies:asyncErrorHandler(GetAllMovies),
    
    GetMovies:asyncErrorHandler(GetMovies),
    
    PatchMovies:asyncErrorHandler(PatchMovies),
    
    DeleteMovies:asyncErrorHandler(DeleteMovies),

    getmoviestats:asyncErrorHandler(getmoviestats),

    getmoviebygenre: asyncErrorHandler(getmoviebygenre),

    CreateMovies: asyncErrorHandler(CreateMovies)
    
    // chekcid,
    
    // ValidateFunction
    
    
}

// const movieexport = require('./../model/moviemodel')

// function ValidateFunction(req, res, next) {

//     if (!req.body.name || !req.body.duration) {

//         return res.status(404).json({

//             status: "incolplete data form",

//             message: "please provide the movie name or movie duration",

//         });
//     }

//     next()
// }
// const UpdatedMovie = Object.assign(MovieToUpdate, req.body);

// movies[MovieToUpdateIndex] = UpdatedMovie;

// fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
    
    //     if (err) {
        //         res.status(404).json({
            
        //             status: "Unsuccesful",
        
        //             time: req.Gettimer,
        
        //             message: "unable to path resource"
        
        //         })
        //     }
        
        //     res.status(200).json({
            
        //         status: "Succesful",
        
        //         time: req.Gettimer,
        
        //         data: {
            
        //             movies: MovieToUpdate.id
        //         }
        //     })
        
            // res.status(200).json({
                
            //     status: "succesful",
            
            //     time: req.Gettimer,
            
            //     data: {
                
            //        movie: req.body.movie
        
            //     }
            // })
            
            // console.log('gotten id');
            
            // const movieID = movies.indexOf(req.body.movie);
            
            // movies.splice(movieID, 1);
            
            // fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
            
                //     res.status(203).json({
            
                //         status: "Succesful",
            
                //         time: req.Gettimer,
                
                //         data: {
                    
                //             movie: null
                //         }
                //     })
                // })
                // function check_checkid(value) {
                //     let moviecheck = movies.find((el) => { return el.id === value * 1 });
                
                    // return moviecheck
                // }
                
                // function chekcid(req, res, next, value) {
                //     console.log(`Movie has id ${value}`);
                
                //    req.body.movie = check_checkid(value);
                
                //     if (!req.body.movie) {
                    
                //         return res.status(404).json({
                
                //             status: "unsuccesful",
                
                //             message: `movie with id ${req.params.id} cant be found`
                //         })
                //     }
                
                //     console.log(req.body.movie);
                
                //     next()
                // }
                // res.status(200).json({
                
                //     Status: "succesful",
                
                //     movie_count: movies.length,
                
                //     time: req.Gettimer,
                
                //     data: {
                
                //         movies
                
                //     }
                
                // })
                
                
                // const NewId = movies[movies.length - 1].id + 1;
                
                
                // const NewMovie = Object.assign({ id: NewId }, req.body);
                
                // movies.push(NewMovie);
                
                // fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
                
                //     if (err) {
                
                //         return res.status(500).send(err.message)
                
                //     }
                
                //     res.status(201).json({
                
                //         Status: "Succesful",
                
                //         time: req.Gettimer,
                
                //         data: {
                
                //             movies: NewMovie
                
                //         }
                //     })
                //     console.log(NewId);
                // })
                
        // })