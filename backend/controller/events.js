const cloudinary = require("../helper/cloudinary");
const Event = require("../model/events");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "events" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};

async function addEvent(req, res) {
  try {
    const { title, description, date, time, capacity, createdBy } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "Event image is required!",
      });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const result = await Event.create({
      title,
      description,
      date,
      time,
      capacity,
      createdBy,
      image: imageUrl,
    });

    if (result) {
      return res.status(200).json({
        error: false,
        message: "Added event!",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Error in adding event!",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
  // get all the data from req body
}

module.exports = {
  addEvent,
};
