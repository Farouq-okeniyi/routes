const express = require('express')

const moviecontroller = require('./../controller/movieshandler')

const Router = express.Router();

Router.param('id', moviecontroller.chekcid)

Router.route('/')

            .get(moviecontroller.GetAllMovies)

            .post(moviecontroller.ValidateFunction, moviecontroller.CreateMovies);


Router.route('/:id')


            .get( moviecontroller.chekcid,moviecontroller.GetMovies)

            .patch(moviecontroller.ValidateFunction,moviecontroller.PatchMovies)

            .delete(moviecontroller.chekcid,moviecontroller.DeleteMovies);



module.exports = Router;