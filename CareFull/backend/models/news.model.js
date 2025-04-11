// models/News.js
import mongoose from "mongoose"

const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  publishedAt: Date
});

const news= mongoose.model('news', NewsSchema);

export default news