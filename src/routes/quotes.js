import {Router} from 'express';
import {QuoteModel} from "../models/quotes.js";

const router = Router();

router.get("/", async (req, res) => {

    try {
        const quote = await QuoteModel.find();
        return res.send(quote);

    } catch (error) {
        res.status(500);
        console.error(error);
    }

});

router.get("/random", async (req, res) => {

    try {
        
        const quote = await QuoteModel.aggregate([{$sample: {size: 1}}]);
        return res.send(quote);

    } catch (error) {
        res.status(500);
        console.error(error);
    }

});

router.get("/short", async (req, res) => {
    try {
        
        const quote = await QuoteModel.aggregate([{$match: {length:{$gt: 0, $lt: 100}}}, {$sample: {size: 1}}]);
        return res.send(quote);

    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

router.get("/long", async (req, res) => {
    try {
        
        const quote = await QuoteModel.aggregate([{$match: {length:{$gt: 800, $lt: 2923}}}, {$sample: {size: 1}}]);
        return res.send(quote);

    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

router.get("/medium", async (req, res) => {
    try {
        
        const quote = await QuoteModel.aggregate([{$match: {length:{$gt: 100, $lt: 800}}}, {$sample: {size: 1}}]);
        return res.send(quote);

    } catch (error) {
        res.status(500);
        console.error(error);
    }
});

// router.post("/", async (req, res) => {

//     const quote = new QuoteModel({
//         quoteText: req.body.quoteText,
//         quoteAuthor: req.body.quoteAuthor
//     })
//     try {
//         const newQuote = await quote.save();
//         res.status(201).json(newQuote)
//     } catch (error) {
//         res.status(400).json({message: error.message})
//     }

// });

export default router;