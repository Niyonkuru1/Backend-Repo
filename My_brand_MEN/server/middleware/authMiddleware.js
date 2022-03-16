const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next)=>{

    //grabbing token from the cookies section of the each and every request made
    // const cookieToken = req.cookies.jwt;

    //Grab the token from the header parts of the postman
    // FORMAT of them coming back => Authorization: Bearer <access_token>
    const bearerHeader = req.headers['authorization'];
   

   

    if (typeof (bearerHeader) !== 'undefined'){
         //split the bearer from string to the array
    const bearerArr = bearerHeader.split(" ");

    //get the token from the array
    const bearerToken = bearerArr[1];
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
        res.json({message: 'login to access the routes!'})
    }

    // checkUserCred(cookieToken);
    // checkUserCred(bearerToken);
    

    
}

function checkUserCred(token){
    //verify if the user exist and is verified
  
}
export default requireAuth;