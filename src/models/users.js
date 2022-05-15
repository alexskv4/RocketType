import mongoose from "mongoose";

let raceSchema = new mongoose.Schema({

    wpm: {
        type: Number
    },
    percentageAccuracy: {
        type: Number
    },
    startTime: {
        type: Number
    },
    endTime: {
        type: Number
    },
    errorCount: {
        type: Number
    },
    quoteId:{
        type: String
    }

});

let userSchema = new mongoose.Schema({

    username: {
        type: String
    },
    password: {
        type: String
    },
    races: [raceSchema]


});

let UserModel = mongoose.model("User", userSchema);

export {
    UserModel
}