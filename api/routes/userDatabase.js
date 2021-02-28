const { urlencoded } = require("express");
var Express = require("express");
var router = Express.Router({ caseSensitive: true });
var ObjectId = require("mongodb").ObjectID;
const res = require("express/lib/response");

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
        const db = client.db("UserDatabase");
        const collection = db.collection("User");
        console.log("REQ: ", req.query);
        queryEmail(collection, res);

        console.log("All Users Received");

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
        const db = client.db("UserDatabase");
        // createUserDatabase(db);
        const collection = db.collection("User");
        // hardcodeAdd(collection);
        addToUserDatabase(collection, req);
        res.send("New User Posted");

        client.close();
    });
});

router.put("/", function(req, res) {
    console.log("put route");
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
        const db = client.db("UserDatabase");
        const collection = db.collection("User");

        updateUser(collection, req);
        res.send("User Updated");

        client.close();
    });
});

// router.delete("/", function (req, res) {
//     console.log("delete route");
//     const { MongoClient } = require("mongodb");
//     const uri =
//         "mongodb+srv://sbagri:CSC307W2021@cluster0.v2w76.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//     console.log("initialize the database");
//     MongoClient.connect(uri, (err, client) => {
//         if (err) {
//             throw err;
//             return;
//         }
//         console.log("connected");
//         const db = client.db("UserDatabase");
//         const collection = db.collection("User");

//         deleteFromLog(collection, req);
//         res.send("User Deleted");

//         client.close();
//     });
// });

function createUserDatabase(database) {
    database.createCollection("User", {
        validator: {
            $jsonSchema: {
                jsonType: "object",
                required: [
                    "firstName",
                    "lastName",
                    "email",
                    "password"
                ],
                properties: {
                    firstName: {
                        jsonType: "string",
                        description: "must be a string and is required"
                    },
                    lastName: {
                        jsonType: "string",
                        description: "must be a string and is required"
                    },
                    email: {
                        jsonType: "string",
                        description: "must be a string and is required"
                    },
                    password: {
                        jsonType: "string",
                        description: "must be a string and is required"
                    },
                    link1: {
                        jsonType: "string",
                        description: "must be a string if the field exists"
                    },
                    link2: {
                        jsonType: "string",
                        description: "must be a string if the field exists"
                    },
                    link3: {
                        jsonType: "string",
                        description: "must be a string if the field exists"
                    },
                    workExperience: {
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

function addToUserDatabase(collection, req) {
    collection.insertOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        link1: "",
        link2: "",
        link3: "",
        workExperience: "",
        notes: ""
    });
}

function hardcodeAdd(collection) {
    console.log("Hardcode Add");
    collection.insertMany([
        {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            password: "pass1234",
            link1: "",
            link2: "",
            link3: "",
            workExperience: "",
            notes: ""
        },
        {
            firstName: "James",
            lastName: "Doe",
            email: "jamesdoe@gmail.com",
            password: "pass1234",
            link1: "",
            link2: "",
            link3: "",
            workExperience: "",
            notes: ""
        },
        {
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@gmail.com",
            password: "pass1234",
            link1: "",
            link2: "",
            link3: "",
            workExperience: "",
            notes: ""
        },
        {
            firstName: "Jeremy",
            lastName: "Doe",
            email: "jeremydoe@gmail.com",
            password: "pass1234",
            link1: "",
            link2: "",
            link3: "",
            workExperience: "",
            notes: ""
        }
    ]);
    console.log("Success?");
}

function queryUserId(collection, req) {
    const query = { _id: ObjectId(req.body._id).valueOf() };
    const user = collection
    .find(query)
    .toArray()
    .then((docs) => {
      console.log("DOCS:");
      console.log("all documents", docs);
      res.send(docs);
    });
}

function queryEmail(collection, res) {
    const query = { email: "newemail@yahoo.com" };
    const user = collection
    .find(query)
    .toArray()
    .then((docs) => {
      console.log("DOCS:");
      console.log(docs);
      res.send(docs);
      console.log("sent");
    });
}

function updateUser(collection, req) {
    const query = { email: "newemail@yahoo.com" };

    if (req.body.firstName!="") collection.updateOne(query, { $set: { "firstName" : req.body.firstName } });
    if (req.body.lastName!="") collection.updateOne(query, { $set: { "lastName" : req.body.lastName } });
    if (req.body.link1!="") collection.updateOne(query, { $set: { "link1" : req.body.link1 } });
    if (req.body.link2!="") collection.updateOne(query, { $set: { "link2" : req.body.link2 } });
    if (req.body.link3!="") collection.updateOne(query, { $set: { "link3" : req.body.link3 } });
    if (req.body.workExperience!="") collection.updateOne(query, { $set: { "workExperience" : req.body.workExperience } });
    if (req.body.notes!="") collection.updateOne(query, { $set: { "notes" : req.body.notes } });
    if (req.body.email!="") collection.updateOne(query, { $set: { "email" : req.body.email } });

}

// function deleteFromDatabase(collection, req) {
//     const query = { _id: ObjectId(req.body._id).valueOf() };
//     console.log(query);
//     collection.deleteOne(query);
// }

module.exports = router;
