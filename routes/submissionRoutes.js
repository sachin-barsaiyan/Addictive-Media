const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer().none();

const Submission = require("../models/submission");

// Route for submitting the form
router.post("/submit", upload, (req, res) => {
  const { name, dob, country, resume } = req.body;
  console.log(name, dob, country, resume, "data");

  const submission = new Submission({
    name,
    dob,
    country,
    resume,
  });

  submission
    .save()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = router;
