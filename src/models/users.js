import mongoose from "mongoose";

let userSchema = new mongoose.Schema({


    _id: {
        oid: {
            type: String
        }
    },
    username: {
        type: String
    },
    password: {
        type: String
    }


});

let UserModel = mongoose.model("User", userSchema);

export {
    UserModel
}