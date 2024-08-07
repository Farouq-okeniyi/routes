// const fs = require('fs')
// const movies = JSON.parse(fs.readFileSync('./data/movies.json'))
const Moviee = require('./../model/moviemodel');

async function GetAllMovies(req, res) {
    try{
        console.log(req.query)

        const excludefields = ['sort', 'page', 'limit', 'fields']

        const queryObj = {...req.query}


        excludefields.forEach((el)=>{
            delete queryObj[el]
        })

        console.log(queryObj);
        console.log(req.query);
        const movies = await Moviee.find()
                            .where('Duration')
                            .equals(req.query.duration)
                            .where('Rating')
                            .equals(req.query.rating);


        res.status(201).json({
            status:"Succesful",
            
            length: Moviee.length,
            
            movies: movies
        })
    }catch(err){
        res.status(400).json({
            Status:"Unsuccesful",
            
            Message: err.message
            
        })
    }
    
}

async function CreateMovies(req, res) {
    try{
        const movie = await Moviee.create(req.body)
        res.status(201).json({
            Status: 'Succesful',
            
            data: {movie}
            
        })
    }catch(err){
        res.status(400).json({
            
            Status: 'Unsuccesful',
            
            Message: err.message
        })
    }
}

async function DeleteMovies(req, res) {
    try {
        await Moviee.findByIdAndDelete(req.params.id)
        
        res.status(201).json({
            
            status:"Succesful",
            
            Data: null
        })
        
    } catch (error) {
        res.status(400).json({

            Status: 'Unsuccesful',
            
            Message: err.message
        })
        
    }
    
}

async function GetMovies(req, res) {
    try{
        const movie = await Moviee.findById(req.params.id);
        res.status(201).json({
            status:"Succesful",
            
            movies: movie
        })
        
    }catch(err){
        
        res.status(400).json({
            
            Status: 'Unsuccesful',
            
            Message: err.message
        })
    }
    
}
async function PatchMovies(req, res) {
    try {
        const UpdatedMovie = await Moviee.findByIdAndUpdate(req.params.id, req.body, {new :true,runValidator:true });
        
        res.status(201).json({
            Status:"Succesful",
        
            Data: UpdatedMovie
        })
    } catch (err) {
        res.status(400).json({
            
            Status: 'Unsuccesful',
            
            Message: err.message
        })
        
    }
    
    
}


module.exports = {
    GetAllMovies,
    
    GetMovies,
    
    PatchMovies,
    
    DeleteMovies,
    
    CreateMovies,
    
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