var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    summary: {
        type: String,
        validate: [
            function(input) {
                return input.length >= 10;
            },
            "Enter a longer summary."
        ]
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Note"
    }]
});

// Model created using above schema, using mongoose's model method
var Article = mongoose.model("Article", articleSchema);

// Export Article model
module.exports = Article;
