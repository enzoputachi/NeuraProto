import mongoose from "mongoose";
const { Schema } = mongoose;


const postSchema = new Schema({
    expertId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    content: String,
    tags: String
},
{
    timestamps: true
}
)

const Post = mongoose.model("Post", postSchema)
export default Post;