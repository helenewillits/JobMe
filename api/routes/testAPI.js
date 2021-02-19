var express = require("express");
var router = express.Router();

const applications = [
   {
      company: "Apple",
      position: "Sofware Developer Intern",
      jobpostinglink: "https://careers.apple.com/student",
      status: "Completed",
      result: "Accepted",
      deadline: "02.21.2021",
      time: "3:30PM"
   },
   {
      company: "Ridgeline",
      position: "Sofware Engineering Intern",
      jobpostinglink: "https://ridgeline.com/internships",
      status: "To Do",
      result: null,
      deadline: "02.31.2021",
      time: "4:00PM"
   }
];
router.get("/", function (req, res, next) {
   res.send(applications);
});

module.exports = router;
