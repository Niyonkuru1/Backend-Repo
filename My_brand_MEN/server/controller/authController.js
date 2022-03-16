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
        // console.log(Object.values(error.errors));
        Object.values(error.errors).forEach((er)=>{
            // console.log(er.properties);
            errors[er.properties.path] = er.properties.message;
        });
   // console.log( `email_error  is ${errors.email} and the password_error is ${errors.email}`)
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
    // const user = new Userdb({
    //     email: email,
    //     password:password
    // })

    // //save blog to database
    // user
    // .save(user)
    // .then ((data) =>{
    //     res.send(data)
    // })
    // .catch((error)=>{
    //     res.status(500).send({
    //         message:error.message || "Some error occured while creating a create operation"
    //     });
    // });
    }

 export const login_post_contro = async (req,res)=>{
        const { email, password } = req.body;
    console.log(email, password);
        try {
            const user = await Userdb.login(email,password);
            console.log(user._id);
            const token = createToken(user._id);
        
            // res.cookie('jwt', token, {
                // httpOnly:true, maxAge: maxAge * 1000
            // })
            res.status(200).json({user:user._id,token:token})
        }
        catch(err){
            res.status(400).json({errorio: err.message});
        }
      
    }


    export const logout_get_contro = (req,res) =>{
        res.cookie('jwt', '', {maxAge:1 });
        res.status(200).json({message:"successfully logged out!",  token: null})
        res.redirect('/');
    }



