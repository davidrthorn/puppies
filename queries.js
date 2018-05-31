const pgp = require('pg-promise')({})
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'puppies',
  user: 'davidrowthorn',
  password: 'postpass'
}
const db = pgp(cn)

module.exports = {
  getAllPuppies: getAllPuppies,
  getSinglePuppy: getSinglePuppy,
  createPuppy: createPuppy,
  updatePuppy: updatePuppy,
  removePuppy: removePuppy
}

function getAllPuppies(req, res, next) {
  db.any('SELECT * FROM pups')
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL puppies'
        })
    })
    .catch(err => next(err))
}

function getSinglePuppy(req, res, next) {
  const pupID = parseInt(req.params.id)
  db.one('SELECT * FROM pups WHERE id = $1', pupID)
    .then(data => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE puppy'
        })
    })
    .catch(err => next(err))
}

function createPuppy(req, res, next) {
  req.body.age = parseInt(req.body.age)
  db.none('INSERT INTO pups(name, breed, age, sex)' +
    'values(${name}, ${breed}, ${age}, ${sex})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one puppy'
        })
    })
    .catch(err => next(err))
}

function updatePuppy(req, res, next) {
  const body = req.body
  db.none('UPDATE pups SET name=$1, breed=$2, age=$3, sex=$4 WHERE id=$5',
    [body.name, body.breed, parseInt(body.age), body.sex, req.params.id])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: `Updated puppy: ${body.name}`
        })
    })
    .catch(err => next(err))
}

function removePuppy(req, res, next) {
  const pupID = parseInt(req.params.id)
  db.result('DELETE FROM pups WHERE id = $1', pupID)
    .then(result => {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} puppy`
        })
        .catch(err => next(err))
    })
}

