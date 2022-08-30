import {Router} from 'express';
import {UserModel} from "../models/users.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/recentRaces", async (req, res) => {

    try {
        const user = await UserModel.findOne({"username": req.body.username});
        let racesToSend = [];
        //console.log(user.races)
        console.log(user.races.length)

        let endIndex;

        if(user.races.length > 10) {
            endIndex = user.races.length - 10
        }
        else {
            endIndex = 0
        }

        for(let i = user.races.length - 1; i >= endIndex; i--) {
            if (user.races[i] != null) {
                racesToSend.push(user.races[i]);
            }
        }

        res.status(200).send(racesToSend);

    } catch (error) {
        console.error(error);
        res.status(500).send();
    }

});

router.post("/postRace", async (req, res) => {

    try {
        const user = await UserModel.findOne({"username": req.body.username});
        // console.log(user);
        // console.log(req.body)
        // console.log(req.body.quoteId)
        let race = {
            wpm: req.body.wpm,
            percentageAccuracy: req.body.percentageAccuracy,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            errorCount: req.body.errorCount,
            quoteId: req.body.quoteId
        };

        let newStatistics = {
            averageWpm: user.races.length == 0? race.wpm : (user.statistics.averageWpm + ((race.wpm - user.statistics.averageWpm) / (user.races.length + 1))).toFixed(2),
            averageAccuracy: user.races.length == 0? race.percentageAccuracy : (user.statistics.averageAccuracy + ((race.percentageAccuracy - user.statistics.averageAccuracy) / (user.races.length + 1))).toFixed(2),
            recentAverageWpm: user.races.length < 10? (user.statistics.averageWpm + ((race.wpm - user.statistics.averageWpm) / (user.races.length + 1))).toFixed(2) : getRecentAverages(user.races, race).avgWpm,
            recentAverageAccuracy: user.races.length < 10? (user.statistics.averageAccuracy + ((race.percentageAccuracy - user.statistics.averageAccuracy) / (user.races.length + 1))).toFixed(2) : getRecentAverages(user.races, race).avgAcc,
            // recentAverageWpm: 0,
            // recentAverageAccuracy: 0,
            fastestRace: user.statistics.fastestRace?.wpm < race.wpm || !user.statistics.fastestRace? race : user.statistics.fastestRace,
            timeTyping: user.statistics.timeTyping += (race.endTime - race.startTime),
            racesCompleted: user.statistics.racesCompleted += 1

        }

        user.races.push(race);

        user.statistics = newStatistics;

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

        //console.log(user);
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
    

    //console.log(req.body)

    const user = new UserModel({
        username: req.body.username,
        password: hashedPassword,
        statistics: {
            averageWpm: 0,
            recentAverageWpm: 0,
            fastestRace: null,
            averageQuoteLength: 0,
            recentAverageAccuracy: 0,
            averageAccuracy: 0,
            racesCompleted: 0,
            timeTyping: 0
        }
    });
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send();
    }


});

router.post("/userStats", async (req, res) => {
    try {
        
        let user = await UserModel.find({"username":req.body.username});

        if (user[0] == null) {
            return res.status(404).send();
        }

        res.status(200).send(user.statistics);

    } catch (error) {
        res.status(500).send();
    }
});

function getRecentAverages (races, newRace) {
    let avgWpm = 0;
    let avgAcc = 0;
    for (let i = 1; i < 10; i++) {
        avgWpm += parseFloat(races[races.length - i].wpm);
        avgAcc += parseFloat(races[races.length - i].percentageAccuracy);
    }
    avgWpm += parseFloat(newRace.wpm);
    avgAcc += parseFloat(newRace.percentageAccuracy);

    avgWpm = ((avgWpm + 0.5) / 10).toFixed(2);
    avgAcc = ((avgAcc + 0.5) / 10).toFixed(2);

    return({avgWpm, avgAcc})
}

export default router;