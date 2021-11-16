const db = require("../db");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

const User = {
  verify: function (username, password, callback) {
    console.log(username, password);
    const query = "SELECT * FROM user WHERE username = ? LIMIT 1";

    db.query(query, [username], (error, results) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (results.length === 0) {
        callback(null, null);
        return;
      }
      const user = results[0];
      console.log(results[0]);
      bcrypt.compare(password, user.password, (error, compareResult) => {
        if (error) {
          callback(error, null);
          return;
        }
        if (!compareResult) {
          callback(null, null);
          return;
        }
        callback(null, user);
      });
    });
  },
  // Find all in coursemodule table
  findAll: function (callback) {


    const findAllUser = "SELECT * FROM user;";
    db.query(findAllUser, (error, results) => {
      if (error) {
        callback(error, null);
        return;
      };
      callback(null, results);
    });


  },

  // Insert nrw row in coursemodule table
  insert: function (module, callback) {
    console.log(module);
    const insertNewUser =
      `
      INSERT INTO user (username, email, profile_pic_url, user_type, password)
      VALUES (?, ?, ?, 'Customer', ?);
      `;
    //INSERT 1INTO coursemodule (name, course, code)
    // add "1"or any number at here to creaye an error so to 
    // to test the error.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(module.password, salt, function(err, hash) {
   
        db.query(
          insertNewUser,
          [module.username, module.email, module.profile_pic_url,  hash],
          (error, results) => {
           
            if (error) {
              callback(error, null);
              return;
            };
            //console.log(results);
            //the above statement was used to find out the 
            // i need to used results.affecctrows
            callback(null, results.affectedRows)
          });
      })
    })
  },

  findByID: function (userID, callback) {

  
        const findUserByIDQuery = "SELECT * FROM user WHERE id = ?;";
        db.query(findUserByIDQuery, [userID], (error, results) => {
         
          if (error) {
            callback(error, null);
            return;
          };
          // pass null as value if there is no user.
          if (results.length === 0) {
            callback(null, null);
            return;
          };
          callback(null, results[0]);
        });
      }
   

};

module.exports = User;