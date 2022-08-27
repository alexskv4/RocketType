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
    races: [raceSchema],
    statistics: {
        averageWpm: {
            type: Number
        },
        recentAverageWpm: {
            type: Number
        },
        highestWpm: {
            type: Number
        },
        averageQuoteLength: {
            type: Number
        },
        recentAverageAccuracy: {
            type: Number
        },
        averageAccuracy: {
            type: Number
        },
        racesCompleted: {
            type: Number
        },
        timeTyping: {
            type: Number
        }
    }
});

let UserModel = mongoose.model("User", userSchema);

export {
    UserModel
}