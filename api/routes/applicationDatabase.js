const { urlencoded } = require("express");
var Express = require("express");
var router = Express.Router({ caseSensitive: true });
var ObjectId = require("mongodb").ObjectID;
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
    // createAppDatabase(db);
    const collection = db.collection("Application");

    // queryAppStatus(
    //    collection,
    //    {
    //       status: "To Do"
    //    },
    //    res
    // );

    // hardcodeAdd(collection);
    queryAllApps(collection, res);
    console.log("All Applications Received");

    client.close();
  });
});

router.post("/", function (req, res) {
  console.log("post route");
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
    res.send("New Application Posted");

    client.close();
  });
});

router.delete("/", function (req, res) {
  console.log("delete route");
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
          //  appId: {
          //    jsonType: "int",
          //    description: "must be an integer and is required"
          //  },
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

function addToAppLog(collection, req) {
  collection.insertOne({
    userId: req.body.userId,
    favorited: req.body.favorited,
    deadline: req.body.deadline,
    companyName: req.body.companyName,
    position: req.body.position,
    jobId: req.body.jobId,
    jobPostingLink: req.body.jobPostingLink,
    applicationPortalLink: req.body.applicationPortalLink,
    applicationStatus: req.body.applicationStatus,
    result: req.body.result,
    notes: req.body.notes
  });
}

function hardcodeAdd(collection) {
  collection.insertMany([
    {
      userId: 1,
      favorited: 0,
      deadline: "05/04/2021",
      companyName: "Apple",
      position: "Software Development Intern",
      jobId: 183489239238,
      jobPostingLink: "careers.apple.com",
      applicationPortalLink: "careers.apple.com/interns",
      applicationStatus: "To Do",
      result: "N/A",
      notes: ""
    },
    {
      userId: 1,
      favorited: 0,
      deadline: "05/06/2021",
      companyName: "Amazon",
      position: "Amazon Future Leaders Intern",
      jobId: 322394832098,
      jobPostingLink: "amazon.com",
      applicationPortalLink: "smile.amazon.com",
      applicationStatus: "Completed",
      result: "Pending",
      notes: ""
    },
    {
      userId: 1,
      favorited: 0,
      deadline: "04/02/2021",
      companyName: "Ridgeline",
      position: "Product Management Intern",
      jobId: 183489239238,
      jobPostingLink: "careers.apple.com",
      applicationPortalLink: "careers.apple.com/interns",
      applicationStatus: "In Progress",
      result: "N/A",
      notes: ""
    },
    {
      userId: 1,
      favorited: 0,
      deadline: "05/04/2021",
      companyName: "Apple",
      position: "Software Development Intern",
      jobId: 183489239238,
      jobPostingLink: "careers.apple.com",
      applicationPortalLink: "careers.apple.com/interns",
      applicationStatus: "To Do",
      result: "N/A",
      notes: ""
    },
    {
      userId: 1,
      favorited: 0,
      deadline: "05/04/2021",
      companyName: "Apple",
      position: "Software Development Intern",
      jobId: 183489239238,
      jobPostingLink: "careers.apple.com",
      applicationPortalLink: "careers.apple.com/interns",
      applicationStatus: "In Progress",
      result: "N/A",
      notes: ""
    },
    {
      userId: 2,
      favorited: 0,
      deadline: "05/04/2021",
      companyName: "Apple",
      position: "Software Development Intern",
      jobId: 183489239238,
      jobPostingLink: "careers.apple.com",
      applicationPortalLink: "careers.apple.com/interns",
      applicationStatus: "Completed",
      result: "N/A",
      notes: ""
    }
  ]);
  console.log("Success?");
}

function deleteFromLog(collection, req) {
  const query = { _id: ObjectId(req.body._id).valueOf() };
  console.log(query);
  collection.deleteOne(query);
}

function queryAppId(collection, req) {
  const query = { userId: req.userId, _id: _id };
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
