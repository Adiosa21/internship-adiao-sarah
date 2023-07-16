module.exports = app => {

    // import student controller
    const students_logic = require("../controllers/student.controller.js");

    // import express router
    var router = require("express").Router();

    // create student api route
    router.post("/add", students_logic.create);

    //retrieve all students api route
   //http://localhost:8085/students/red
    router.get("/red",students_logic.retrieve_students);

 // update student records
 //http://localhost:8085/students/update
 router.put ("/update", students_logic.update_student);


// deletes student records
//http://localhost:8085/students/delete
 router.delete("/delete", students_logic.delete_student);

   
    // define default route
    app.use('/students', router);

}
// http://localhost:8082/students/add
