import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
  writer: String,
  title: String,
  contents: Boolean
})

export const Board = mongoose.model("Board", BoardSchema)