const Account = require("./accounts-model");

exports.checkAccountId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await Account.getById(id);
        if (!account || account.length === 0) {
            res.status(404).json({
                message: "Couldn't find account id",
            });
        } else {
            req.id = id;
            req.account = account;
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding accounts",
        });
    }
};

exports.checkAccountPayload = (req, res, next) => {
    const name = req.body.name.trim();
    const budget = req.body.budget.trim();

    console.log("name and Budget assigned")
    if (!name || !budget) {
        res.status(400).json({
            message: "Data must include 'name' and 'budget'",
        });
    } else {
        req.payload = { name, budget };
        next();
    }
};

exports.checkAccountNameUnique = async (req, res, next) => {
    const { name } = req.payload;
    try{
      const accounts = await Account.getAll()
      const names = accounts.map(account => {return account.name})
      const matchedAccount = names.find(nm => nm === name)
      
      if(matchedAccount){
        res.status(400).json({
          message: "Name already exists in database",
        });
      }else{
        next();
      }
    } catch(err){
      res.status(500).json({
          message: "problem checking accounts",
      });
    }

    // next();
};
