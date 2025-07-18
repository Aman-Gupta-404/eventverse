const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const { addEvent } = require("../controller/events");

// add event
router.post("/add", upload.single("image"), addEvent);

// update event

// create api to get the events

// get events

// delete event --> you all will do

module.exports = router;
