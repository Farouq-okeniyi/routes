const express = require('express')

const moviecontroller = require('./../controller/movieshandler')

const Router = express.Router();

// Router.param('id', moviecontroller.chekcid)

Router.route('/')

            .get(moviecontroller.GetAllMovies)

            .post( moviecontroller.CreateMovies);


Router.route('/:id')


            .get(moviecontroller.GetMovies)

            .patch(moviecontroller.PatchMovies)

            .delete(moviecontroller.DeleteMovies);



module.exports = Router;