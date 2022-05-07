import mongoose from "mongoose";

let quoteSchema = new mongoose.Schema({
    _id: {
        oid: {
            type: String
        }
    }, 
    quoteText: {
        type: String,
        required: true
    }, 
    quoteAuthor: {
        type: String,
        required: true
    },
});

let QuoteModel = mongoose.model("Quote", quoteSchema);

export {
    QuoteModel
}