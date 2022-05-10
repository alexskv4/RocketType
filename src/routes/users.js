import {Router} from 'express';
import {UserModel} from "../models/users.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/login", async (req, res) => {

    try {
        
        const user = await UserModel.find({"username":req.body.username});

        // console.log(req.get("username"))
        // console.log(req.get("password"))
        // console.log(user[0].password)

        if (user[0] && await bcrypt.compare(req.body.password, user[0].password)) {
            return res.status(200).send(user);
        }
        else {
            console.log("failed")
            return res.status(400);
            
        }

    } catch (error) {
        res.status(500);
        console.error(error);
    }

});

router.post("/register", async (req, res) => {
    
    
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