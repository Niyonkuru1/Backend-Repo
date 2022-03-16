import Userdb from '../model/authModel';
import jwt from 'jsonwebtoken';


const handleErrors = (error)=>{
    console.log(error.message, error.code);
    let errors = {email :"", password : ""};

    //duplicate error checking
    if (error.code == 11000){
        errors['email'] = "The user already exists";
        return errors;
    }
    
    //validation errors
    if (error.message.includes('user validation failed')){
        Object.values(error.errors).forEach((er)=>{
            errors[er.properties.path] = er.properties.message;
        });
   
    }
    return errors;
}

//function for CREATING A TOKEN FOR AUTHENTICATION
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id)=>{
    return jwt.sign({id}, 'the game secret', {
        expiresIn: maxAge
    })
}

export const signup_post_contro = async (req,res)=>{
    const { email, password } = req.body;

    try {
       const user = await Userdb.create({email, password}); 
       const token = createToken(user._id);
       res.cookie('jwt', token, {
           httpOnly:true, maxAge: maxAge * 1000
       })
       res.status(201).json({user: user._id});
    }
    catch(err){
        const error = handleErrors(err);
        res.status(400).json({error});
       }
    }

 export const login_post_contro = async (req,res)=>{
        const { email, password } = req.body;
    console.log(email, password);
        try {
            const user = await Userdb.login(email,password);
            console.log(user._id);
            const token = createToken(user._id);
            res.cookie('jwt', token, {
                httpOnly:true, maxAge: maxAge * 1000
            })
            res.status(200).json({user:user._id,})
        }
        catch(err){
            res.status(400).json({errorio: err.message});
        }
      
    }


    export const logout_get_contro = (req,res) =>{
        res.cookie('jwt', '', {maxAge:1 });
        res.redirect('/');
    }



