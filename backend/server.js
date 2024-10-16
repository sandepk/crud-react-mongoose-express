const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080


// Schema
const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: Number,
    indian: Boolean,
    game: String
}, { timestamps: true})

const userModel = mongoose.model("user", schemaData)

// read 
// http://localhost:8080/
app.get("/", async (req,res) => {
    const data  = await userModel.find({})
    console.log("data", data)
    res.json({success: true, message: "Get api called successfully", data})
})


// create data and save data in mongodb
// http://localhost:8080/create
/*
{
    "name":"shyam",
    "email": "sandeepgupta@jkshf.djfk",
    "mobile": 9898988989
}
*/
app.post("/create",async (req,res) => {
    const data = new userModel(req.body)
    const count = await userModel.find({name: "Anuj"})
    await data.save()

    console.log(data, count)
    res.send({success: true, message: 'data saved successfully', data })
})

// update data in mongodb
// http://localhost:8080/update
/* 
{
    "id": "670cbcb6f1d6b5539cfc6b3f",
    "name": "Tejbahadur2",
    "game": "Football"
}
*/
app.put('/update', async (req, res) => {
        const {id, name,...rest} = req.body
        const data = await userModel.updateOne({_id: id}, {name, indian: true, ...rest})
        res.send({success: true, message: "Data updated successfully", data})
    }
)

// http://localhost:8080/delete/670cbbf94bf72c8308d59867

app.delete('/delete/:id', async (req, res) => {
    const id  = req.params.id
    const data = await userModel.deleteOne({_id: id});
    res.send({
        success: true, message: "Data deleted successfully",
        data
    })
})

mongoose.connect("mongodb+srv://sandepk:Rpapa77629@cluster0.wfguf.mongodb.net", {
    dbName: "crudOpr"}).then(() =>{
    console.log("Connected to DB")
    app.listen(PORT, () => {
        console.log("server is running successfully")
    })
}).catch(err=>console.log(error))

