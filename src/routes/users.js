import {Router} from 'express';
import {UserModel} from "../models/users.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/postRace", async (req, res) => {

    try {
        const user = await UserModel.findOne({"username": req.body.username});
        console.log(user);
        console.log(req.body)
        console.log(req.body.quoteId)
        let race = {
            wpm: req.body.wpm,
            percentageAccuracy: req.body.percentageAccuracy,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            errorCount: req.body.errorCount,
            quoteId: req.body.quoteId
        };

        user.races.push(race);
        user.save();
        res.status(200).send();

    } catch (error) {
       console.error(error); 
       res.status(500).send();
    } 

});

router.post("/login", async (req, res) => {

    try {
        
        const user = await UserModel.find({"username":req.body.username});

        console.log(user);
        // console.log(req.get("username"))
        // console.log(req.get("password"))
        // console.log(user[0].password)
        if (user[0] == null) {
            return res.status(404).send();
        }

        if (await bcrypt.compare(req.body.password, user[0].password)) {
            return res.status(200).send(user);
        }
        else {
            console.log("failed")
            return res.status(400).send();
            
        }

    } catch (error) {
        res.status(500);
        console.error(error);
    }

});

router.post("/register", async (req, res) => {
    
    let userCheck = await await UserModel.find({"username":req.body.username});

    if (userCheck[0]) {
        res.status(409).send();
        return
    }

    let salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    

    console.log(req.body)

    const user = new UserModel({
        username: req.body.username,
        password: hashedPassword
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send();
    }


});

export default router;