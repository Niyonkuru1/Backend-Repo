const jwt = require('jsonwebtoken');
const requireAuth = (req, res, next)=>{
    //grabbing the cookies from the request
    const token = req.cookies.jwt;

    //verify if the user exist and is verified
    if(token){
        jwt.verify(token, 'the game secret', (err, decodedToken) =>{
            if(err){
                console.log(err.message);
        res.redirect('/login');
            }
            else {
                console.log(decodedToken);
                next();
            }
        })
    }
    else {
        res.redirect('/login');
    }
}

export default requireAuth;