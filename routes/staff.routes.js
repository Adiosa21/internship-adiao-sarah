module.exports = app => {

    // import staff controller
    const staff_logic = require("../controllers/staff.controller.js");

    // import express router
    var router = require("express").Router();

    // create staff api route
    router.post("/add", staff_logic.create);

     //retrieve all staff api route
   //http://localhost:8085/staff/redi
   router.get("/redi",staff_logic.retrieve_staff);

   // update staff data
   //http://localhost:8085/staff/update
   router.put ("/update", staff_logic.update_staff);
  
  
  // deletes  staff records
  //http://localhost:8085/staff/delete
   router.delete("/delete", staff_logic.delete_staff);

    // define default route of staff
    app.use('/staff', router);

}
// http://localhost:8082/staff/add