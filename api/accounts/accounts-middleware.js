const Account = require("./accounts-model");

// function isCurrency(value) {
//   const currencyRegex = /^-?\d+(\.\d{0,2})?$/; // Matches optional negative sign, digits, optional decimal with up to 2 digits
//   return currencyRegex.test(value);
// }

exports.checkAccountId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await Account.getById(id);
        if (!account[0] || account.length === 0) {
            res.status(404).json({
                message: "account not found",
            });
        } else {
            req.id = id;
            req.account = account[0];
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: "problem finding accounts",
        });
    }
};

exports.checkAccountPayload = (req, res, next) => {


    let { name, budget } = req.body;


    name = name.trim();
    budget = budget.trim();


    if (!name || !budget) {
        res.status(400).json({
            message: "name and budget are required'",
        });
        // next();
    }

    const currencyRegex = /^-?\d+(\.\d{0,2})?$/; // Matches optional negative sign, digits, optional decimal with up to 2 digits
    const checkNameLengthOk = !(name.length < 3 || name.length > 100);
    const checkBudgetIsCurrency = currencyRegex.test(budget);
    const BudgetNum=Number(budget)

    if(!checkNameLengthOk){
      res.status(400).json({
          message: "name of account must be between 3 and 100",
      });
    }else if(!BudgetNum){
      res.status(400).json({
          message: "budget of account must be a number",
      });
    }else if (!checkBudgetIsCurrency) {
      res.status(400).json({
          message: "must be a number'",
      });
    }else if (BudgetNum<0 || BudgetNum>1000000) {
        res.status(400).json({
            message: "too large or too small",
        });
    } else {
        req.payload = { name, budget };
        next();
    }
    
    
};

exports.checkAccountNameUnique = async (req, res, next) => {
    try {
        const { name } = req.payload;
        const accounts = await Account.getAll();
        const names = accounts.map((account) => {
            return account.name;
        });
        const matchedAccount = names.find((nm) => nm === name);
        if (matchedAccount) {
            res.status(400).json({
                message: "Name already exists in database",
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(500).json({
            message: "problem checking accounts",
        });
    }
};
