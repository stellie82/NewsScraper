var mongoose = require("mongoose");

// Schema constructor
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    title: {
        type: String
    },
    body: {
        type: String
    }
});

// Model created using above schema, using mongoose's model method
var Note = mongoose.model("Note", noteSchema);

// Export Note model
module.exports = Note;
