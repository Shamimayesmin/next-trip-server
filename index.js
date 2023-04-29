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
        const toursCollection = client.db("nextTrip").collection("tours");
        const categoryCollection = client.db("nextTrip").collection("category")
        const worldTourWayCollection = client.db("nextTrip").collection("worldTourWay")
        
        // to get all categories
        app.get('/category', async(req, res) => {
            const query = {}
            const category = await categoryCollection.find(query).toArray()
            res.send(category);
            // console.log(category);
           
        });

        // the way of world tour data loaded;
        app.get('/worldtour', async(req, res) => {
            const query = {}
            const worldTour = await worldTourWayCollection.find(query).toArray()
            res.send(worldTour);
            
           
        });

        // get all the tours
        app.get('/tours', async(req, res) => {
            const query = {}
            const tours = await toursCollection.find(query).toArray()
            res.send(tours);
            // console.log(tours);
           
        });

        // get a specific tour by id in the details page.
        app.get("/tour/:id", async(req,res)=>{
          const id = req.params.id;
          const result = await toursCollection.findOne({_id : new ObjectId(id)});
          res.send(result);
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