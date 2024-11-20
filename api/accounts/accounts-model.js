const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where({id})
}

const create = account => {
  return db('accounts')
  .insert(account)
  .then(ids => {
    return getById(ids[0]);
  });
}

const updateById = (id, account) => {
  return db('accounts')
    .where({ id })
    .update(account)
    .then(rows => {
        return getById(id);
    });
}

const deleteById = id => {
  return db('accounts')
    .where('id', id)
    .del();
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
// .then(rows => {
//   return getById(id);
// });