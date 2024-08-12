const express = require('express')

const moviecontroller = require('./../controller/movieshandler');

const Router = express.Router();

// Router.param('id', moviecontroller.chekcid)

Router.route('/')

            .get(moviecontroller.GetAllMovies)

            .post( moviecontroller.CreateMovies);

Router.route('/movie-stats').get(moviecontroller.getmoviestats);

Router.route('/movie-by-genre/:genre').get(moviecontroller.getmoviebygenre);

Router.route('/:id')


            .get(moviecontroller.GetMovies)

            .patch(moviecontroller.PatchMovies)

            .delete(moviecontroller.DeleteMovies);



module.exports = Router;