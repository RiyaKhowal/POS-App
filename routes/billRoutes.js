
const express =  require("express");
const router  = express.Router();
const {addbillController,getBillsController} = require("./../controllers/billController");

router.post("/add-bills",addbillController);
router.get("/get-bills",getBillsController);

 module.exports = router;


 