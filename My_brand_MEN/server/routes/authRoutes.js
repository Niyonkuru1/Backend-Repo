import express from 'express';
const authRoute = express.Router();
import {signup_get,signup_post,login_get,login_post} from '../services/authRender';
import {signup_post_contro,login_post_contro,logout_get_contro} from '../controller/authController';

authRoute.get('/signup',signup_get);
authRoute.post('/signup', signup_post);
authRoute.get('/login', login_get);
authRoute.post('/login', login_post);



// auth API
authRoute.post('/auth/signup',signup_post_contro );
authRoute.post('/auth/login',login_post_contro );
authRoute.get('/auth/logout',logout_get_contro );

module.exports = authRoute;



