const express = require('express');
const router = express.Router();
const InstitutionController = require('../controllers/institution.controller');

// Cuando alguien haga un POST a /create, se ejecute el controlador
router.post('/create', InstitutionController.crearInstitucion);

// Cuando alguien haga un PUT con un ID, se ejecuta modificarInstitucion
router.put('/:id', InstitutionController.modificarInstitucion);

module.exports = router;