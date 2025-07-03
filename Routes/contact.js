import express from 'express';
import { DeleteContactbyId, findcontactbyId, getAllcontacts, getContactByUserId, newContact, updateContactbyId, } from '../Controllers/contact.js';
import { isAuthenticated } from "../Middlewares/Auth.js";




const router = express.Router();

// User Contact 
// @api desc: user Contact
// @api endpoint:/api/contact/new
// @api method: post

router.post("/new",isAuthenticated,newContact)

// Get all contacts
// @api desc: Get all Contact
// @api endpoint:/api/contact/
// @api method: get

router.get('/',getAllcontacts)

// find contact by id
router.get('/:id',findcontactbyId)

// update contacts
router.put('/:id',isAuthenticated,updateContactbyId)
// delete contacts
router.delete('/:id',isAuthenticated,DeleteContactbyId)

// get contact by userid
router.get('/userid/:id',getContactByUserId)




export default router;