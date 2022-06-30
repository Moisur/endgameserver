const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors')


/* ============= start middleware =============== */
app.use(cors())
app.use(express.json())

//Endgame
//ZMZQy3ylbblL0lPp

const uri = "mongodb+srv://Endgame:ZMZQy3ylbblL0lPp@cluster0.nyoi7m3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const collection = client.db("TodoList").collection("addItems");
        app.post('/addItems', async (req, res) => {
            const data = req.body;
            console.log(data)
            const result = await collection.insertOne(data);
            res.send(result)
        })

        app.get('/items', async (req, res) => {
            // http://localhost:5000/items 
            const data = {};
            const result = await collection.find(data).toArray();
            res.send(result)
        })






    } finally {
        //   await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})