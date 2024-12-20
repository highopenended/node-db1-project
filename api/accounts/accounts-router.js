const router = require("express").Router();
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get("/", async (req, res) => {
    try {
        const accounts = await Account.getAll();
        if (!accounts) {
            res.status(404).json({
                message: "Couldn't find accounts",
            });
        } else {
            res.status(200).json(accounts);
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding accounts",
        });
    }
});

router.get("/:id", checkAccountId, async (req, res, next) => {
    try {
        res.status(200).json(req.account);
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem finding accounts",
        });
    }
});

router.post("/", checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try {
        await Account.create(req.payload);
        res.status(201).json(req.payload);
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem adding account",
        });
    }
});

router.put("/:id", checkAccountPayload, checkAccountId, checkAccountNameUnique, async (req, res, next) => {
    try {
        await Account.updateById(req.id, req.payload);
        res.status(200).json(req.payload);
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem updating account",
        });
    }
});

router.delete("/:id", checkAccountId, async (req, res, next) => {
    try {
        await Account.deleteById(req.id);
        res.status(200).json(req.account);
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem deleting account",
        });
    }
});

router.use((err, req, res, next) => {
    res.status(500).json({
        message: "An unexpected error occurred.",
        error: err.message, // Optionally include the error message for debugging
    });
});

module.exports = router;
