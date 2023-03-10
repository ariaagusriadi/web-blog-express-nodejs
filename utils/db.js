const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/NewsBlog")
  .then(() => console.log("Connected!"));

//   mongoose.connect("mongodb://127.0.0.1:27017/codewrite", {
//      useNewUrlParser: true,
//      useUnifiedTopology: true,
//      useCreateIndex: true,
//    });
   

