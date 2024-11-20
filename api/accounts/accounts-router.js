const router = require('express').Router()
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require("./accounts-middleware");
const Account = require("./accounts-model");

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC
  console.log("GET: '/'")
  res.status(200).json({message:"GET: /"})
})

router.get('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  console.log("GET: '/id'")
  res.status(200).json({message:`GET: /${req.params.id}`})
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
  console.log("POST: '/'")
  res.status(200).json({message:"POST: /"})
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  console.log("PUT: '/:id'")
  res.status(200).json({message:`PUT: /${req.params.id}`})
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
  console.log("DELETE: '/:id'")
  res.status(200).json({message:`DELETE: /${req.params.id}`})
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
