const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

// add event
router.post("/add", upload.single("image"), addEvent);

// update event

// get events

// delete event --> you all will do
