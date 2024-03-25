const mongose = require("mongoose");

const todoschema = mongose.Schema(
    {
      title: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 3,
        trim: true,
      },
      desc: String,
    },
    { timestamps: true }
  );
  
  const Todo = mongose.model("todo", todoschema);

 module.exports = Todo;