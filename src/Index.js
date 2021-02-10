import React from 'react';
import ReactDOM from 'react-dom';

import ApplicationLog from './components/Application.js';

ReactDOM.render(<ApplicationLog/>, document.getElementById('root'));
const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
    "mongodb+srv://sbagri:CSC307W2021@jobmedatabases.v2w76.mongodb.net/test";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('ApplicationDatabase');

    database.createCollection("Application", {
       validator: {
          $jsonSchema: {
             jsonType: "object",
             required: ["userId", "appId", "favorited", "companyName", "position", "result"],
             properties: {
                userId: {
                    // WHEN USER DATABASE CREATED, THIS SHOULD BE "USER_USERID"
                    jsonType: "int",
                    description: "must be an integer and is required"
                },
                appId: {
                    jsonType: "int",
                    description: "must be an integer and is required"
                },
                favorited: {
                    jsonType: "bool",
                    description: "True if user adds application to favorites, False otherwise"
                },
                deadline: {
                    jsonType: "string",
                    description: "must be a string if the field exists"
                },
                companyName: {
                    jsonType: "string",
                    description: "must be a string and is required"
                },
                position: {
                    jsonType: "string",
                    description: "must be a string and is required"
                },
                jobId: {
                    jsonType: "string",
                    description: "must be a string if the field exists"
               },
                jobPostingLink: {
                    // MAKE HYPERLINK
                    jsonType: "string",
                    description: "must be a string if the field exists"
                },
                applicationPortalLink: {
                    // MAKE HYPERLINK
                    jsonType: "string",
                    description: "must be a string if the field exists"
                },
                applicationStatus: {
                    enum: [ "To Do", "In Progress", "Completed" ],
                    description: "can only be one of enum values and is required"
                },
                result: {
                    enum: [ "N/A", "Accepted", "Declined", "Interviewing", "Waiting", "Discontinued" ],
                    description: "can only be one of enum values and is required"
                },
                notes: {
                    jsonType: "string",
                    description: "must be a string if the field exists"
                },
             }
          }
       }
    })

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
