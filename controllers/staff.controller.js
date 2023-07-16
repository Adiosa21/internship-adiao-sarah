// import models
const db = require("../models");

// import Sequelize Staff model
const Staff = db.staff;

// sequalise clause
const Op = db.Sequelize.Op;

// Creates and Saves a new Staff
exports.create = (req, res) => {
    // validate the request
    if(!req.body.first_name){
        res.status(400).send({
            message: "Fill in the First Name"
        });
        return;
    }

    // create staff json object
    const add_staff = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        phone_number: req.body.phone_number
    }

    // pass student object to Sequelize Create function
    // Sequelize Create helps add object to DB
    Staff.create(add_staff)
        .then(data => {

            
            // return data on success
            // res.send(data);

            // modified response
            res.send(
                {
                "status": "Successful",
                "status_code": "100",
                "data": data

            });
        })
        .catch(err => {
            // return error on failure
            res.status(400).send({
                message: err.message || "Error occured while adding Staff."
            });
        });

};

// deletes staff
exports.delete_staff =(request,response)=>{
    /* const id = request.query.id;
     (async ()=>{
         try {
             await db.Sequelize.sync();
 
             var condition2= id ? { id: {[Op.like]:`%${id}%`}} : null;
 
             const user = await Student.findOne({where: {condition2}});
             if(user){
                 await.destroy();
 
             }
         }
     });*/
 
     const id = request.query.id;
     var condition2= id ? { id: {[Op.like]:`%${id}%`}} : null;
 
 
     Staff.destroy({where:condition2})
         .then (data =>{
             response.send ({
                 message: " staff deleted successively"
             }); 
         })
         .catch(err =>{
             response.status(400).send({
                 message : err.message || "error ocurred while deleting  staff"
             });
         });
 }
 // updates staff  based on a given id for particular record
exports.update_staff = (request,response)=>{
    const id =request.query.id;
    var condition1 = id ?{ id:{[Op.like]:`${id}`}} :null;
    
    Staff.update({},{where: {condition1}})
        .then (data =>{
            response.send({
                message: "staff successively updated",
                data: data
            });
        })
        .catch (err=>{
            response.status(400).send({
                message: err.message || "error occured while updating staff"
            });
        });



};

exports.retrieve_staff =(req, res) =>{
    const first_name =req.query.first_name;
    var condition =first_name ? {first_name: {[Op.like]: `%${first_name}%`}}: null;

    //staff,findAll
    Staff.findAll({where:condition})
    .then(data =>{
        res.send(data);
   
    })
    .catch(err =>{
        //response
        res.status(400).send({
            message: err.message || "Error occured while retrieving staff"
        });
    });
};