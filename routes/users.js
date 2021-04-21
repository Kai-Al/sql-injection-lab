const express = require('express');
const router = express.Router();

/* GET users listing. */
function usersRouter(connection, db) {
  router.get('/', async function (req, res, next) {
    // const connection = await connect();
    const userProvidedId = req.query.id;
    // query to database. Mysql and Oracle modules have different ways to query, this is why the if is needed.
    if (db === 'oracle') {
      try {
        const results = await connection.execute(query, []);
        res.send(results.rows);
      } catch (err) {
        console.log('Ouch!', err)
      }
    } else {
      var sql = `SELECT first_name, last_name from users WHERE   id = ` + connection.escape(userProvidedId) + `AND role = 'Vendedor' `;
      const request = connection.query(sql, (error, results, fields) => {
        if (error) throw error;
        res.send(results);
      })
      console.log(request.sql)
    }
  });
  return router;
}
module.exports = usersRouter;
