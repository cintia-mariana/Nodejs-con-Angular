
const{ Router}= require('express');
const { signUp,login } = require('../controllers/user');
const { check } = require ('express-validator');

const {emailExiste,emailNoExists} = require ('../helpers/db-validator');


const {validarCampos} = require('../middlewares/validate-fields');
const { validatePassword } = require('../middlewares/validate-password');



const router = Router();


router.post('/signup',[
	check("password", "The password is mandatory").not().isEmpty(),
  check ('password','El password debe ser mas de 6 letras').isLength({ min: 6}),
  check ('email','El correo no es valido').isEmail(),
  check('email').custom(emailExiste),
  //check ('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  // check('rol').custom(  esRoleValido ),

  // check("email", "The email is not valid").isEmail(),
	// check("email").custom(emailExiste),
//validatePassword,
 validarCampos
] , signUp);

//login
router.post("/login", [

  check("email", "The email is not valid").isEmail(),

  check("email").custom(emailNoExists),

  check("password", "The password is mandatory").not().isEmpty(),

validatePassword,
validarCampos

], login);





module.exports = router;