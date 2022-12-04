const { response,request } = require ('express');

const jsonwebtoken = require ('jsonwebtoken');
const User = require('../models/user');




const validarJWT = async( req= request, res =response, next)=> {
  const { auth }=  req.query;
  console.log('esto vino en el query string:', auth);
      
  if (!auth ){
  return res.status(401).json({
      msg: 'No hay token en la peticion'
    });
  }

  try {

    const { uid } =jsonwebtoken.verify( auth, process.env.SECRETORPRIVATEKEY );
    console.log('este es el token des-serializado:', uid);

    // leer el usuario que corresponde al uid 
    const usuario= await User.findById( uid );

      /* if( !usuario ) {
        return res.status(401).json({

          msg: 'Token no valido - usuario no existe en DB'
        })
      }
    //Verificar si el uid tiene estado true
    
    if ( !usuario.estado ){
        return res.status(401).json ({

          msg: 'Token no valido - usuario con estado: false'
        })
    }
    
    
    req.usuario = usuario;
    next(); */

    req.usuario = usuario;
    next();
  } catch (error) {
       
    console.log ( error);
    res.status(401).json({
      msg:'Token no valido'
    })
  }
 
    
}



module.exports = {
  validarJWT
}