import mongoose from "mongoose";
// each post or picture will have this thinds below.
const postSchema = mongoose.Schema({
    title: String,
    creator: String,
    tags: [String],
    selectedfile: String
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage; // a model for our database.
