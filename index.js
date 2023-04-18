const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { query } = require("express");
const port = process.env.PORT || 5000;
require("dotenv").config();

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ui8slz3.mongodb.net/?retryWrites=true&w=majority`;

console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});





async function run() {
    try {
        const addTours = client.db("nextTrip").collection("tours");
		
        

        app.get('/tours', async(request, response) => {
            const query = {}
            tours = await toursCollection.find(query).toArray()
            response.send(tours);
            response.send(tours)
        })
    }

    finally{

    }
}

run().catch((err) => console.log(err));

app.get("/", (req, res) => {
	res.send("next trip  is running");
});

app.listen(port, () => {
	console.log(`nextTrip server is running on ${port}`);
});