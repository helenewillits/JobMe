const { urlencoded } = require("express");
var Express = require("express");
var router = Express.Router({ caseSensitive: true });
var ObjectId = require("mongodb").ObjectID;
const res = require("express/lib/response");

function createUserDatabase(database) {
    database.createCollection("User", {
        validator: {
            $jsonSchema: {
                jsonType: "object",
                required: [
                    "userId",
                    "firstName",
                    "lastName",
                    "email",
                    "password",
                ],
                properties: {
                    userId: {
                        // WHEN USER DATABASE CREATED, THIS SHOULD BE "USER_USERID"
                        jsonType: "int",
                        description: "must be an integer and is required"
                    },
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
        userId: req.body.userId,
        email: req.body.email,
        password: req.body.password,
        notes: req.body.notes
    });
}

function hardcodeAdd(collection) {
    collection.insertMany([
        {
            userId: 1,
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            password: "pass1234",
            notes: ""
        },
        {
            userId: 2,
            firstName: "James",
            lastName: "Doe",
            email: "jamesdoe@gmail.com",
            password: "pass1234",
            notes: ""
        },
        {
            userId: 3,
            firstName: "Jane",
            lastName: "Doe",
            email: "janedoe@gmail.com",
            password: "pass1234",
            notes: ""
        },
        {
            userId: 4,
            firstName: "Jeremy",
            lastName: "Doe",
            email: "jeremydoe@gmail.com",
            password: "pass1234",
            notes: ""
        },
    ]);
    console.log("Success?");
}

function deleteFromDatabase(collection, req) {
    const query = { _id: ObjectId(req.body._id).valueOf() };
    console.log(query);
    collection.deleteOne(query);
}
