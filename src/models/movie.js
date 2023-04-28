const { model, Schema, ObjectId } = require("mongoose");

const movieSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Movie title is required"],
    },
    director: {
      type: Array,
      required: [true, "Director is required"],
    },
    releaseDate: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
      required: [true, "The date of release is required"],
    },
    owner: {
      type: ObjectId,
      ref: "user",
      required: [true, "The owner of movie is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

movieSchema.post("save", (error, data, next) => {
  const { name, code } = error;
  error.status = name === "MongoServerError" && code === 11000 ? 409 : 400;
  next(error);
});

const Movie = model("movie", movieSchema);

module.exports = Movie;
