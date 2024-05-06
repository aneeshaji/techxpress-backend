import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false,
    },

    author: {
      type: String,
      required: true,
    },

    author_image: {
      type: String,
      required: false,
    },

    reading_time: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true
    },

    published: {
      type: Boolean,
      required: true,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
