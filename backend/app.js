import express from "express";
import mongoose from 'mongoose';
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
const app = express();
app.use(express.json()); 
app.use("/api/user",router) //https://localhost:5000/api/user
app.use("/api/blog",blogRouter)

mongoose.connect('mongodb+srv://sharmasuyash0505:bP0VtzD7et8YFgiC@cluster0.fnv9k.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Db connected'))
.catch((err) => {
    console.log(err);
});

app.listen(5000, () => {
    console.log(`Server started on 5000`)
})


