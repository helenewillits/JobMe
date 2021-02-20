const { urlencoded } = require("express");
var Express = require("express");
var router = Express.Router({ caseSensitive: true });
const res = require("express/lib/response");

router.get("/", function (req, res) {
   console.log("get route");
   const { MongoClient } = require("mongodb");
   const uri =
      "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/ApplicationDatabase?retryWrites=true&w=majority";
   console.log("initialize the database");
   MongoClient.connect(uri, (err, client) => {
      if (err) {
         throw err;
         return;
      }
      console.log("connected");
      const db = client.db("ApplicationDatabase");
      const collection = db.collection("Application");

      // queryAppStatus(
      //    collection,
      //    {
      //       status: "To Do"
      //    },
      //    res
      // );

      queryAllApps(collection, res);

      client.close();
   });
});

router.post("/add", function (req, res) {
   console.log("add new application");
   const { MongoClient } = require("mongodb");
   const uri =
      "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/ApplicationDatabase?retryWrites=true&w=majority";
   console.log("initialize the database");
   MongoClient.connect(uri, (err, client) => {
      if (err) {
         throw err;
         return;
      }
      console.log("connected");
      const db = client.db("ApplicationDatabase");
      const collection = db.collection("Application");

      addToAppLog(collection, req);
      res.send("New Application Added");

      client.close();
   });
});

router.delete("/", function (req, res) {
   console.log("route delete");
   const { MongoClient } = require("mongodb");
   const uri =
      "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/ApplicationDatabase?retryWrites=true&w=majority";
   console.log("initialize the database");
   MongoClient.connect(uri, (err, client) => {
      if (err) {
         throw err;
         return;
      }
      console.log("connected");
      const db = client.db("ApplicationDatabase");
      const collection = db.collection("Application");
      console.log(req.data);
      console.log("After data");
      deleteFromLog(collection, req);
      res.send("Application Deleted");

      client.close();
   });
});

function createAppDatabase(database) {
   database.createCollection("Application", {
      validator: {
         $jsonSchema: {
            jsonType: "object",
            required: [
               "userId",
               "appId",
               "favorited",
               "companyName",
               "position",
               "result"
            ],
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
                  description:
                     "True if user adds application to favorites, False otherwise"
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
                  enum: ["To Do", "In Progress", "Completed"],
                  description: "can only be one of enum values and is required"
               },
               result: {
                  enum: [
                     "N/A",
                     "Accepted",
                     "Declined",
                     "Interviewing",
                     "Waiting",
                     "Discontinued"
                  ],
                  description: "can only be one of enum values and is required"
               },
               notes: {
                  jsonType: "string",
                  description: "must be a string if the field exists"
               }
            }
         }
      }
   });
}

function addToAppLog(collection, newApp) {
   collection.insertOne({
      userId: newApp.userId,
      appId: newApp.appId,
      favorited: newApp.favorited,
      deadline: newApp.deadline,
      companyName: newApp.companyName,
      position: newApp.position,
      jobId: newApp.jobId,
      jobPostingLink: newApp.jobPostingLink,
      applicationPortalLink: newApp.applicationPortalLink,
      applicationStatus: newApp.applicationStatus,
      result: newApp.result,
      notes: newApp.notes
   });
}

function deleteFromLog(collection, req) {
   const query = { userId: req.body.userId, appId: req.body.appId };
   collection.remove(query);
}

function queryAppId(collection, req) {
   const query = { userId: req.userId, appId: req.appId };
   const apps = collection.find(query).forEach(function (item) {
      console.log(item);
   });
   console.log(apps);
   return apps;
}

function queryAppStatus(collection, req, res) {
   const query = { userId: req.userId, applicationStatus: req.status };
   const apps = collection
      .find(query)
      .toArray()
      .then((docs) => {
         console.log("DOCS:");
         console.log("all documents", docs);
         res.send(docs);
      });
}

function queryAllApps(collection, res) {
   const apps = collection
      .find()
      .toArray()
      .then((docs) => {
         console.log("DOCS:");
         console.log("all documents", docs);
         res.send(docs);
      });
}

module.exports = router;
