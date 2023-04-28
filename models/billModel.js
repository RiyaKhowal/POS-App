const mongoose =  require("mongoose");
 const billSchema = mongoose.Schema(
    {
     customerName : {
        type: String,
        required : true,
     },
     customerPhoneNo : {
        type: Number,
        required : true,
     },
     Subtotal: {
      type: Number,
      required : true,
   },
     tax: {
        type: Number,
        required : true,
     },
     totalAmount: {
        type: Number,
        required : true,
     },
      paymentMode: {
        type: String,
        required : true,
     },
     cartItems :{
        type:Array,
        required:true,
     },
    },{timeStamp:true}
 );

 const billModel =  mongoose.model("billModel" , billSchema);
 module.exports = billModel;


