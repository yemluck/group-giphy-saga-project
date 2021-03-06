const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const qt = 'SELECT * FROM "favorites";'
  pool.query(qt)
    .then(dbres => {
      console.log('GOT FAV', dbres);
      res.send(dbres.rows)
    }).catch(err => {
      console.error('NO GET FAV', err);
    })
});

// add a new favorite
router.post('/', (req, res) => {
  const newFavorite = req.body.url;
  console.log('newFavorite url', newFavorite);

  const queryText = `INSERT INTO favorites("url")
                    VALUES ($1);
  `
  const queryValues = [
    newFavorite
  ];
  
  pool.query(queryText, queryValues)
    .then(() => {res.sendStatus(201);})
    .catch((err) => {
      console.log('Error completing SELECT favorite query', err);
      res.sendStatus(500);
    })
});

// update given favorite with a category id
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  console.log('made it to put', req.body);

  const sqlText = `
    UPDATE "favorites"
    SET "category_id" = $1
    WHERE "id" = $2
  `;

  const sqlParams = [
    req.body.category_id,
    req.body.id
  ];

  pool.query(sqlText, sqlParams)
    .then(dbRes => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log('put failed', err);
    })

});

// delete a favorite
router.delete('/:id', (req, res) => {
  console.log('id is', req.params.id);

  const queryText = `DELETE FROM favorites
                      WHERE id = $1
  `
  const queryParams = [req.params.id];

  pool.query(queryText, queryParams)
              .then(() => {res.sendStatus(200)
              console.log('successful delete');
              })
              .catch((err) => {
                console.log('Error completing DELETE fav query', err);
                res.sendStatus(500);
              })
});

module.exports = router;
