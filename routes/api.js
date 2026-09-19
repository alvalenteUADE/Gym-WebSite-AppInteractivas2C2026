const express = require('express');
const router = express.Router();

const institutionRouter = require('./api/institution.route');
const userRouter = require('./api/user.route');
const consultaRouter = require('./api/consulta.route');
const categoryRouter = require('./api/category.route');
const publicacionRouter = require('./api/publicacion.route');

/* Rutas API específicas del sistema */
router.use('/institution', institutionRouter);
router.use('/user', userRouter);
router.use('/consulta', consultaRouter);
router.use('/category', categoryRouter);
router.use('/publicacion', publicacionRouter);

module.exports = router;