const fs = require('fs')
const movies = JSON.parse(fs.readFileSync('./data/movies.json'))


function check_checkid(value) {
    let moviecheck = movies.find((el) => { return el.id === value * 1 });

    return moviecheck
}

function chekcid(req, res, next, value) {
    console.log(`Movie has id ${value}`);

   req.body.movie = check_checkid(value);

    if (!req.body.movie) {

        return res.status(404).json({

            status: "unsuccesful",

            message: `movie with id ${req.params.id} cant be found`
        })
    }

    console.log(req.body.movie);

    next()
}

function ValidateFunction(req, res, next) {

    if (!req.body.name || !req.body.duration) {

        return res.status(404).json({

            status: "incolplete data form",

            message: "please provide the movie name or movie duration",

        });
    }

    next()
}

function GetAllMovies(req, res) {

    res.status(200).json({

        Status: "succesful",

        movie_count: movies.length,

        time: req.Gettimer,

        data: {

            movies

        }

    })

}

function CreateMovies(req, res) {

    const NewId = movies[movies.length - 1].id + 1;


    const NewMovie = Object.assign({ id: NewId }, req.body);

    movies.push(NewMovie);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {

        if (err) {

            return res.status(500).send(err.message)

        }

        res.status(201).json({

            Status: "Succesful",

            time: req.Gettimer,

            data: {

                movies: NewMovie

            }
        })
        console.log(NewId);
    })

}

function DeleteMovies(req, res) {



    const movieID = movies.indexOf(req.body.movie);

    movies.splice(movieID, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {

        res.status(203).json({

            status: "Succesful",

            time: req.Gettimer,

            data: {

                movie: null
            }
        })
    })

}

function GetMovies(req, res) {


    res.status(200).json({

        status: "succesful",

        time: req.Gettimer,

        data: {

           movie: req.body.movie

        }
    })

    console.log('gotten id');


}
function PatchMovies(req, res) {

    const UpdatedMovie = Object.assign(MovieToUpdate, req.body);

    movies[MovieToUpdateIndex] = UpdatedMovie;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {

        if (err) {
            res.status(404).json({

                status: "Unsuccesful",

                time: req.Gettimer,

                message: "unable to path resource"

            })
        }

        res.status(200).json({

            status: "Succesful",

            time: req.Gettimer,

            data: {

                movies: MovieToUpdate.id
            }
        })
    })



}


module.exports = {
    GetAllMovies,

    GetMovies,

    PatchMovies,

    DeleteMovies,

    CreateMovies,

    chekcid,

    ValidateFunction


}