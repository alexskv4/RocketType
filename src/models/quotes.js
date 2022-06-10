import mongoose from "mongoose";

let quoteSchema = new mongoose.Schema({
    _id: {
        oid: {
            type: String
        }
    }, 
    text: {
        type: String,
        required: true
    }, 
    source: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    id: {
        type: Number,
        required: true
    }
});

let QuoteModel = mongoose.model("Quote", quoteSchema);

export {
    QuoteModel
}