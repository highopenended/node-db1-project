const Account = require("./accounts-model")

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)


  // try {
  //   const user = await User.getById(req.params.id);
  //   if (!user) {
  //     res.status(404).json({
  //       message: "user not found",
  //     });
  //   } else {
  //     req.user = user;
  //     next();
  //   }
  // } catch (err) {
  //   res.status(500).json({
  //     message: "problem finding user",
  //   });
  // }
}

exports.checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

exports.checkAccountId = (req, res, next) => {
  // DO YOUR MAGIC
}
