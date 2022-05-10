import {Router} from 'express';
import {UserModel} from "../models/users.js";

const router = Router();

router.post("/login", async (req, res) => {

    try {
        
        const user = await UserModel.find({"username":req.body.username});

        // console.log(req.get("username"))
        // console.log(req.get("password"))
        // console.log(user[0].password)

        if (user[0] && user[0].password == req.body.password) {
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
    
    console.log(req.body)

    const user = new UserModel({
        username: req.body.username,
        password: req.body.password
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send();
    }


});

export default router;