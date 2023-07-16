// import models
const db = require("../models");

// import Sequelize Student model
const Student = db.students;
 
  
// sequalise clause
const Op = db.Sequelize.Op;


// Creates and Saves a new Student
exports.create = (req, res) => {
    // validate the request
    if(!req.body.first_name){
        res.status(400).send({
            message: "Fill in the First Name"
        });
        return;
    };

    // create student object
    const add_student = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        class: req.body.class,
        physical_address: req.body.physical_address,
        status: req.body.status ? req.body.status : false
    }

    // pass student object to Sequelize Create function
    // Sequelize Create helps add object to DB
    Student.create(add_student)
        .then(data => {
            // return data on success
            res.send(data);
        })
        .catch(err => {
            // return error on failure
            res.status(400).send({
                message: err.message || "Error occured while adding Student."
            });
        });

};

// deletes students
exports.delete_student =(request,response)=>{
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
 
 
     Student.destroy({where:condition2})
         .then (data =>{
             response.send ({
                 message: "deleted successively"
             }); 
         })
         .catch(err =>{
             response.status(400).send({
                 message : err.message || "error ocurred while deleting data"
             });
         });
 }
 // updates students given record based on a given id
exports.update_student = (request,response)=>{
    const id =request.query.id;
    var condition1 = id ?{ id:{[Op.like]:`${id}`}} :null;
    
    Student.update({},{where: {condition1}})
        .then (data =>{
            response.send({
                message: "record sucesively updated",
                data: data
            });
        })
        .catch (err=>{
            response.status(400).send({
                message: err.message || "error occured while updating students"
            });
        });



};

exports.retrieve_students =(req, res) =>{
    const first_name =req.query.first_name;
    var condition =first_name ? {first_name: {[Op.like]: `%${first_name}%`}}: null;

    //student,findAll
    Student.findAll({where:condition})
    .then(data =>{
        res.send(data);
   
    })
    .catch(err =>{
        //response
        res.status(400).send({
            message: err.message || "Error pccured while retrieving students"
        });
    });
};