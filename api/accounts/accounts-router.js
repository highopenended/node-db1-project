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
        const newAccount = await Account.create(req.payload);
        res.status(200).json(newAccount);
        // res.status(200).json("Return Test");
        next();
    } catch (err) {
        res.status(500).json({
            message: "problem adding account",
        });
    }
});

router.put("/:id", checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
    try {
        const account={id:req.id,name:req.payload.name, budget:req.payload.budget}
        const UpdatedAccount = await Account.updateById(req.id, account);
        console.log(account)
        res.status(201).json(UpdatedAccount);
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
