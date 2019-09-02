const fetch = require('node-fetch');
const express = require('express');
const router = express.Router();
const sql      = require("sqlite3").verbose();
const bcrypt   = require("bcrypt");
const jwt      = require("jsonwebtoken");
const db = new sql.Database("./users.db", (err) => {
  if (err) {
    throw err;
  }
  console.log("opening db connection");
  // create table if needed
  let s = `CREATE TABLE IF NOT EXISTS users (
               user_id INTEGER PRIMARY KEY AUTOINCREMENT,
               user_email text NOT NULL UNIQUE,
               user_pw text NOT NULL
            );`;
  db.run(s, [], (err) => {
    if (err) {
      throw err;
    }
  })
});

/** user login */

router.post("/login", (req, res) => {
  let user_em = req.body.email;
  let user_pw = req.body.pw || '';
  let q = `SELECT user_id, user_email, user_pw FROM users WHERE user_email = "${user_em}";`;
  // get user from db
  db.get(q, (err, row) => {
    // db error
    if (err) {
      console.log(err.message);
      return res.json({
        msg: "login failed, try again",
        jwt: ""
      })
    }
    // user not in db
    if (!row) {
      return res.json({
        msg: `login failed. no user '${user_em}' in db. try again`,
        jwt: ""
      })
    }
    // bccrypt.compare
    bcrypt.compare(user_pw, row.user_pw, (err, same) => {
      if (err) {
        console.log(err.message);
        return res.json({
          msg: "login failed, try again",
          jwt: ""
        })
      }
      // wrong pw
      if (!same) {
        return res.json({
          msg: "login failed - incorrect password. check for typos and try again",
          jwt: ""
        })
      }
      const jwtVal =  jwt.sign({ sub: `${row.user_id}` }, "secret");
      res.json({
        msg: `logged in as '${row.user_email}'`,
        jwt: jwtVal
      })
    })
  })
});

/** user signup */
router.post("/signup", (req, res) => {
  let user_em = req.body.email || '';
  let user_pw = req.body.pw;
  bcrypt.hash(user_pw, 14, (err, hash_pw) => {
    let q = `INSERT INTO users (user_email, user_pw) VALUES ("${user_em}", "${hash_pw}");`;
    db.run(q, (err) => {
      if (err) {
        console.log(err.message);
        return res.json({
          msg: "signup failed, try again",
          jwt: ""
        })
      }
      const jwtVal = jwt.sign({ sub: `${this.lastID}` }, "secret");
      res.json({
        msg: "signup successful",
        jwt: jwtVal
      })
    })
  })
});

router.get('/testLogin',(req,res)=>{
  let user_em = req.query.email || 'abc123@admin.com';
  let user_pw = req.query.pw || 'abc123';

    fetch("http://localhost:3002/signup", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: user_em,
        pw: user_pw
      })
    }).then((res) => res.json())
      .then((json) => {
        console.log(json);
      });

  fetch("http://localhost:3002/login", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      email: user_em,
      pw: user_pw
    })
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      return res.json({
        msg: "query login in users",
        data:json
      })
    })
})


router.get("/loginInUsers", (req, res) => {

  let q = `SELECT user_id, user_email, user_pw FROM users;`;
  // get user from db
  db.all(q, (err, row) => {
    // db error
    if (err) {
      console.log(err.message);
      return res.json({
        msg: "queyr login users failed, try again",
        err:err,
      })
    }
    console.log(row);
    // user not in db
    return res.json({
      msg: "query login in users",
      cnt:row.length || 0,
      data:row
    })
  })
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express Api Server' });
});
router.get('/ping', function(req, res, next) {
  res.jsonp({"status":"OK"});
});

module.exports = router;
