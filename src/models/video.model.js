import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // cloudnary URL
      reqiuired: true,
    },
    thumbnail: {
      type: String,
      reqiuired: true,
    },
    title: {
      type: String,
      reqiuired: true,
    },
    description: {
      type: String,
      reqiuired: true,
    },
    duration: {
      type: Number, // get from cloudinary
      reqiuired: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);
export const Video = mongoose.model("User", videoSchema);
