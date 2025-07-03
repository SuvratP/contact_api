import { contact } from "../Models/Contact.js";


// Get all the contacts
export const getAllcontacts = async (req,res)=>{
    const UserContact = await contact.find();

    if(!UserContact) return res.json({message:" contact not found..!",success:false})
        res.json({message:"Here is your all contact",UserContact})
}


// creating new contacts
export const newContact = async (req,res)=>{

    const {name,email,phone, type} = req.body;

    if(name == "" || email =="" || phone == "" || type == "")
        res.json({message: "All fields are required..!",success:false})

    let saveContact = await contact.create({
        name,
        email,
        phone,
        type,
        user:req.user,
    })
   
    res.json({message:"Contact save successfully...!",saveContact,success:true})
 
}

// updating the contacts by id

export const updateContactbyId = async (req,res)=>{
    const id = req.params.id;
    // const {name,email,phone, type} = req.body;

    const updatecontact = await contact.findByIdAndUpdate(id,req.body
     ,{new:true}
)

if(!updatecontact) return res.json({message:"NO Contact exhist",success:false})
    res.json({message:"Contact updated successfully" ,updatecontact, success:true})

}

// deleting the contacts by id

export const DeleteContactbyId = async (req,res)=>{
    const id = req.params.id;
    

    const deletecontact = await contact.findByIdAndDelete(id)

if(!deletecontact) return res.json({message:"NO Contact exhist",success:false})
    res.json({message:"Contact deleted successfully" ,deletecontact, success:true})

}



    

// finding the contacts by id
export const findcontactbyId = async (req,res)=>{
    
    const id = req.params.id;
    const userContact = await contact.findById(id);

    if(!userContact) return res.json({message:"no contact found",success:false})

        res.json({message:"Here is your particular contact",userContact})
}


// Get contact by user ID
export const getContactByUserId = async (req, res) => {
    const id = req.params.id;
  
  
    const userContact = await contact.find({user:id});
    if (!userContact)
      return res.json({ message: "No Contact find", success: "false" });
  
    res.json({ message: "User Specific Contact Fetched", userContact, success: true });
  };
  





