const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
    "mongodb+srv://sbagri:CSC307W2021@jobmedatabases.v2w76.mongodb.net/test";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('ApplicationDatabase');
    const collection = database.collection('Application');
    // Add Entry
    database.collection("Application").insertOne(
        {
            "Company": "Google",
            "Position": "Software Developer",
            "JobID": 8327348292
        },
    )
    const query = { total_bill: 10.34 };
    const tips = await collection.findOne(query);
    console.log(tips);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);