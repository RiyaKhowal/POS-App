  const express = require("express");
  const {getItemsController,addItemController,deleteItemController,editItemController} = require('./../controllers/itemController');
   const router = express.Router();
      router.get("/get-items",getItemsController);

      router.post("/add-item",addItemController);
 
      //router.put("/edit-item",editItemController);
      router.put("/edit-item",editItemController);

      //to delete item from mongodb
      router.post("/delete-item",deleteItemController);
   module.exports = router;
   