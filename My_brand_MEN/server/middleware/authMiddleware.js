const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next)=>{

    //grabbing token from the cookies section of the each and every request made
    // const cookieToken = req.cookies.jwt;

    //Grab the token from the header parts of the postman
    // FORMAT of them coming back => Authorization: Bearer <access_token>
    var bearerHeader;
if (process.env.NODE_ENV == "production"){
    bearerHeader = req.headers['authorization'];
}
else if (process.env.NODE_ENV == "test"){
    bearerHeader = req.body.token;
    // console.log(bearerHeader);
}   
    if (typeof (bearerHeader) !== 'undefined'){
          var bearerToken;
        if (bearerHeader.includes("Bearer")){
         //split the bearer from string to the array
        const bearerArr = bearerHeader.split(" ");
        bearerToken = bearerArr[1];
        }
        else{
            
        }

    //get the token from the array
        if(bearerToken){
            jwt.verify(bearerToken, 'the game secret', (err, decodedToken) =>{
                if(err){
                    // (err.message)
            // res.redirect('/login');
            res.json({error:'not authentified !!!!'})
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
        res.status(401).send({message: 'login to access the routes!'});
        // console.log("from middleware");
    }

    // checkUserCred(cookieToken);
    // checkUserCred(bearerToken);
    

    
}

function checkUserCred(token){
    //verify if the user exist and is verified
  
}
export default requireAuth;


