const router = require("express").Router();
const {
    checkAccountId,
    checkAccountNameUnique,
    checkAccountPayload,
} = require("./accounts-middleware");
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
        console.log("Made it Here");
        res.status(200).json(req.account);
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem finding accounts",
        });
    }
});


router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
        try {
            const newAccount = await Account.create(req.payload);
            res.status(200).json(newAccount);
            next();
        } catch (err) {
            res.status(500).json({
                message: "problem adding account",
            });
        }
    }
);

router.put("/:id", async (req, res, next) => {
    // DO YOUR MAGIC
    console.log("PUT: '/:id'");
    res.status(200).json({ message: `PUT: /${req.params.id}` });
});

router.delete("/:id", async (req, res, next) => {
    // DO YOUR MAGIC
    console.log("DELETE: '/:id'");
    res.status(200).json({ message: `DELETE: /${req.params.id}` });
});

router.use((err, req, res, next) => {
    // eslint-disable-line
    // DO YOUR MAGIC
});

module.exports = router;
