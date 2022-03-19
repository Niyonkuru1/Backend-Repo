const jwt = require('jsonwebtoken');
import dotenv from "dotenv";
import  path  from "path";

dotenv.config({path: path.resolve('./config.env')});

const requireAuth = (req, res, next)=>{

    //grabbing token from the cookies section of the each and every request made
    // const cookieToken = req.cookies.jwt;

    //Grab the token from the header parts of the postman
    console.log(process.env.SECRET_KEY_DB);

    // FORMAT of them coming back => Authorization: Bearer <access_token>
    var bearerHeader;
if (process.env.NODE_ENV == "production"){
    bearerHeader = req.headers['authorization'];
}
else if (process.env.NODE_ENV == "test"){
    bearerHeader = req.body.token;
}   
    if (typeof (bearerHeader) !== 'undefined'){
         //split the bearer from string to the array
    const bearerArr = bearerHeader.split(" ");

    //get the token from the array
    const bearerToken = bearerArr[1];
        if(bearerToken){
            jwt.verify(bearerToken,process.env.SECRET_KEY_DB, (err, decodedToken) =>{
                if(err){
                    // (err.message)
            // res.redirect('/login');
            res.status(401).json({Error_message:'The action require to login'});
                }
                else {
                    // console.log(decodedToken);
                    next();
                }
            })
        }
        else {
            // res.redirect('/login');
        }
    }
    else{
        // res.status(404).json({message: 'login to access the routes!'});
        res.status(401).json({Error_message:'The action require to login'});

        // console.log("from middleware");
    }

    // checkUserCred(cookieToken);
    // checkUserCred(bearerToken);
    

    
}

function checkUserCred(token){
    //verify if the user exist and is verified
  
}
export default requireAuth;


