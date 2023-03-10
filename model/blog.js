const mongoose = require("mongoose");

const Blog = mongoose.model('blog', {
     title: {
          type: String,
          require:true,
     },
     content: {
          type: String,
          require:true,
     }
})

module.exports = Blog;