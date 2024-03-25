const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const moment = require("moment");
const connectmongodb = require("./init/mongodb");
const Todo = require("./models/Todo");

const PORT = 3000;
const app = express();
// MongoDb connection Method
connectmongodb();


// --Schema Creation Using Mongose  ---

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({ extended: true }));
//-------------------------ROUTES----------------------------

app.get("/", async (req, res) => {
  try {
    const todos = await Todo.find({}).sort({ createdAt: 1 }); // sort by date in decending order
    res.locals.moment = moment; // To Change Time Stamp  Date View
    res.render("index", { title: "List Todo", todos });
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err);
  }
});

app.get("/add-todo", (req, res) => {
  try {
    res.render("NewTodo", { title: "Add Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/update", async (req, res) => {
  try {
    const { id } = req.query;
    const todo = await Todo.findById(id);
    res.render("updatetodo", { title: "Update Todo ", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: " Todo Not Found " });
    }

    todo.title = title;
    todo.desc = desc;
    
    await todo.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/delete", (req, res) => {
  try {
    const { id } = req.query;
    res.render("delete", { title: "Delete Todo" ,id});
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/add-todo", async (req, res) => {
  try {
    const { title, desc } = req.body;
    const newTodo = new Todo({ title, desc });
    await newTodo.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
});


app.get("/confirm-delete",async(req,res)=>{
  try {
    const { id , confirm } = req.query ;
    if(confirm === "yes"){
      await  Todo.findByIdAndDelete(id);

    }
    res.redirect("/");
    
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
