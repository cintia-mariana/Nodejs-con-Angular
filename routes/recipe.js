const Router = require ('express');
const { save, fetch} = require ('../controllers/recipe');
const { validarCampos} = require ('../middlewares/validate-fields');
const { validarJWT} = require ('../middlewares/validate-jwt');


const routes = Router ();

routes.put('/save',[
  validarJWT,
  validarCampos
], save);

routes.get('/fetch',[
  validarJWT,
  validarCampos
], fetch)

module.exports = routes;