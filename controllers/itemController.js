   

    const Items = require('../models/itemModel');
   
   const getItemsController = async (req,res) =>{
       try{
    const items = await Items.find();
    res.send(items);

       }catch(error){
          console.log(error);
       }
   };
   
   const addItemController =  async (req,res) =>{
      try{
        const newItem = new Items(req.body);
        await newItem.save();
        res.send("new Item created");
      }catch(error){
         res.status(400).send(error);
      }
   }

   const editItemController = async(req,res)=>{
            try{
               const {itemId}  = req.body; //we are getting id from frontend and using that here _id:itemId is in our db _id is id so refernce is taken from itemId coimg from frontend
           await Items.findOneAndUpdate({_id:itemId},req.body);

            // with req.body updating the value
           res.status(201).send("item edited");
            }catch(error){
               res.status(400).send(error);
            }
   };
   /*
   const editItemController = async (req,res) =>{
        try{
      await Items.findOneAndUpdate({_id:req.body.itemId},req.body);
      res.status(201).send("Item updated");
        }
        catch(error){
         res.status(400).send(error);
      }
   }
   */
   const deleteItemController = async(req,res) =>{
       try{
        const {itemId} = req.body;
        await Items.findOneAndDelete({_id:itemId});
        res.json("item Deleted");
       }catch(error){
         res.status(400).send(error);
      }
       
   }
    module.exports = {getItemsController,addItemController,deleteItemController,editItemController};