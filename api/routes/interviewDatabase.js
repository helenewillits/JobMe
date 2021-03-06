const { urlencoded } = require("express");
var Express = require("express");
var router = Express.Router({ caseSensitive: true });
var ObjectId = require("mongodb").ObjectID;
const res = require("express/lib/response");
var user = "";

router.get("/", function (req, res) {
  console.log("get route");
  const { MongoClient } = require("mongodb");
  const uri =
    "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  console.log("initialize the database");
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      throw err;
      return;
    }
    console.log("connected");
    const db = client.db("InterviewDatabase");
    // createInterviewDatabase(db);
    const collection = db.collection("Interview");
    // hardcodeAdd(collection);
    queryAllInterviews(collection, res);
    console.log("All Interviews Received");

    client.close();
  });
});

router.post("/", function (req, res) {
  console.log("post route");
  const { MongoClient } = require("mongodb");
  const uri =
    "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  console.log("initialize the database");
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      throw err;
      return;
    }
    console.log("connected");
    const db = client.db("InterviewDatabase");
    const collection = db.collection("Interview");

    addToInterviewLog(collection, req);
    res.send("New Interview Posted");

    client.close();
  });
});

router.post("/post/getEmail", function (req, res) {
  console.log("getEmail post route");

  console.log(req.body.userEmail);
  user = req.body.userEmail;

  res.send("Email Received");
});

router.delete("/", function (req, res) {
  console.log("delete route");
  const { MongoClient } = require("mongodb");
  const uri =
    "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  console.log("initialize the database");
  MongoClient.connect(uri, (err, client) => {
    if (err) {
      throw err;
      return;
    }
    console.log("connected");
    const db = client.db("InterviewDatabase");
    const collection = db.collection("Interview");

    deleteFromLog(collection, req);
    res.send("Interview Deleted");

    client.close();
  });
});

function createInterviewDatabase(database) {
  database.createCollection("Interview", {
    validator: {
      $jsonSchema: {
        jsonType: "object",
        required: [
          "userEmail",
          "companyName",
          "interviewDate",
          "interviewTime"
        ],
        properties: {
          userEmail: {
            // WHEN USER DATABASE CREATED, THIS SHOULD BE "USER_USERID"
            jsonType: "string",
            description: "must be a string and is required"
          },
          companyName: {
            jsonType: "string",
            description: "must be a string and is required"
          },
          interviewerNames: {
            jsonType: "string",
            description: "must be a string if the field exists"
          },
          recruiterNames: {
            jsonType: "string",
            description: "must be a string if the field exists"
          },
          interviewDate: {
            jsonType: "string",
            description: "must be a string and is required"
          },
          interviewTime: {
            jsonType: "string",
            description: "must be a string and is required"
          },
          interviewLink: {
            // MAKE HYPERLINK
            jsonType: "string",
            description: "must be a string if the field exists"
          },
          position: {
            jsonType: "string",
            description: "must be a string if the field exists"
          },
          jobPostingLink: {
            // MAKE HYPERLINK
            jsonType: "string",
            description: "must be a string if the field exists"
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

function addToInterviewLog(collection, req) {
  collection.insertOne({
    userEmail: req.body.userEmail,
    companyName: req.body.companyName,
    interviewerNames: req.body.interviewerNames,
    recruiterNames: req.body.recruiterNames,
    interviewDate: req.body.interviewDate,
    interviewTime: req.body.interviewTime,
    interviewLink: req.body.interviewLink,
    position: req.body.position,
    jobPostingLink: req.body.jobPostingLink,
    notes: req.body.notes
  });
}

function hardcodeAdd(collection) {
  collection.insertMany([
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "Amazon",
      interviewerNames: "",
      recruiterNames: "Rachel",
      interviewDate: "04/23/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "Engineer",
      jobPostingLink: "amazon.com",
      notes: ""
    },
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "Ridgeline",
      interviewerNames: "Amy Wong",
      recruiterNames: "",
      interviewDate: "03/31/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    },
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "Apple",
      interviewerNames: "",
      recruiterNames: "",
      interviewDate: "04/23/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    },
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "Google",
      interviewerNames: "",
      recruiterNames: "",
      interviewDate: "04/23/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    },
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "Raytheon",
      interviewerNames: "",
      recruiterNames: "",
      interviewDate: "04/23/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    },
    {
      userEmail: "jeremydoe@gmail.com",
      companyName: "CIA Secret Service",
      interviewerNames: "",
      recruiterNames: "",
      interviewDate: "04/23/2021",
      interviewTime: "4:00:00PM",
      interviewLink: "",
      position: "",
      jobPostingLink: "",
      notes: ""
    }
  ]);
  console.log("Success");
}

function deleteFromLog(collection, req) {
  const query = { _id: ObjectId(req.body._id).valueOf() };
  console.log(query);
  collection.deleteOne(query);
}

function queryAllInterviews(collection, res) {
  const query = { userEmail: user };
  const interviews = collection
    .find(query)
    .toArray()
    .then((docs) => {
      console.log("DOCS:");
      console.log("all documents", docs);
      res.send(docs);
    });
}

module.exports = router;
