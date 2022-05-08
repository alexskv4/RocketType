import {Router} from 'express';
import {UserModel} from "../models/users.js";

const router = Router();

router.get("/", async (req, res) => {

    try {
        
        const user = await UserModel.find({"username":req.header("username")});

        // console.log(req.get("username"))
        // console.log(req.get("password"))
        // console.log(user[0].password)

        if (user[0] && user[0].password == req.header("password")) {
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

export default router;