const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({
    image_id:{type: Schema.Types.ObjectId},
    email:String,
    name:String,
    gravatar:{type:String},
    comment: String,
    timestamp: {type: Date, default: Date.now}
});

module.exports = model('Comment',CommentSchema);