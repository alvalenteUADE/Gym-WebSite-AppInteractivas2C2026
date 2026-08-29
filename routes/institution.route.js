const express = require('express');
const router = express.Router();
const InstitutionController = require('../controllers/institution.controller');
// Cuando alguien haga un POST a /create, se ejecute el controlador
router.post('/create', InstitutionController.crearInstitucion);

module.exports = router;




