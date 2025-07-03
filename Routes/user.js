import express from 'express'
import { register,login } from '../Controllers/user.js';

const router = express.Router();


// user rgister
// @api desc: user register
// @api endpoint:/api/user/register
// @api method: post

router.post('/register',register)


// user login
// @api desc: user login    
// @api endpoint:/api/user/login
// @api method: post

router.post('/login',login)

export default router;