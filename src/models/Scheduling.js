const mongoose = require("mongoose");
const { Schema } = mongoose;

const schedulingSchema = new Schema(
  {
    title: String,
    start: Date,
    end: Date,
    service: {
      typeService: String,
      nameService: String,
    },
    userEmail: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Scheduling = mongoose.model("Scheduling", schedulingSchema);

module.exports = Scheduling;
