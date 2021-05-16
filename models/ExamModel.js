const mongoose = require("mongoose");

let ExamSchema = mongoose.Schema(
  {
    titles: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    timedoexam: {
      type: String,
     required: true,
    },
    rawquestions: {
      type: Array,
      items: {
        type: Object,
        required: [],
      
          Question: {
            type: String,
          },
          Answer: {
            type: Array,
          },
          Trueanswer: {
            type: Array,
          },
          image: {
            type: Array,
          },
        
      },
    },
    optionmixed: {
      type: Array,
      items: {
        type: String,
      },
    },
    exammixed: {
      type: Array,
      items: {
        type: Object,
        required: [],
        properties: {
          question: {
            type: String,
          },
          answer: {
            type: Array,
          },
          trueanswer: {
            type: Array,
          },
          image: {
            type: Array,
          },
        },
      },
    },
    slug: { type: String},
    qrimage:{type:String}
  },
  {
    timestamps: true,
  }
);

module.exports = ExamSchema = mongoose.model("Exam", ExamSchema);
