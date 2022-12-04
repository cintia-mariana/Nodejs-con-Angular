
const User = require('../models/user')

const emailExiste= async (email = '')=> {
  //verificar si el correo existe
  const existeEmail = await User.findOne({ email });
  if (existeEmail) {
    throw new Error (`Ese correo: ${ email } ya esta registrado`);
  }
}

const emailNoExists = async (email = "") => {
  const existEmail = await User.findOne({ email });

  if (!existEmail) {
  throw new Error(`The email ${email} is not registered`); }
  return true;
}



module.exports= {
  emailExiste,
  emailNoExists
}