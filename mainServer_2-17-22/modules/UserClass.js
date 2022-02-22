const User = require('../models/User');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class UserClass {

  constructor (data) {
    this.username = data.username;
    this.name = data.name;
    this.status = data.status;
    this.role = data.role;
    this.designation = data.designation;
    this.office = data.office;
    this.userId = data.userId;
    this._id = data._id || "";
  }

  save () {
    return new Promise ((resolve, reject) => {
      var newUser = new User({
        username: this.username,
        name: this.name,
        status: this.status,
        role: this.role,
        designation: this.designation,
        office: this.office,
        userId: this.userId,    
      });

      newUser.save()
        .then((data) => {
          resolve(data);
        })
    }); // end promise
  }

  update (){
    return new Promise ((resolve, reject) => {
      User.findById(this._id, (err, user) => {
        user.username = this.username,
        user.name = this.name,
        user.status = this.status,
        user.role = this.role,
        user.designation = this.designation,
        user.office = this.office,
        user.userId = this.userId,    
        user.save();
      })
        .then(() => resolve({ status: true }))
        .catch(err => {
            reject({ status: false });
        });

    }); // end promise
  }
  ///================ static methods ======================


    static count (filter = {}) {

      return new Promise (resolve => {
        User
          .find(filter)
          .count()
          .then(count => {
            resolve(count)
          })
      })

    }

    static getUsers (page = 1, count = 10, filter = {}, sort = {'userID': 1}, select = []) {
      return new Promise ((resolve, reject) => {

        User
          .find(filter)
          .populate({path: "office"})
          .populate({path: "role"})
          .sort(sort)
          .select(select)
          .skip((page*count) - count)
          .limit(count)
          .then(data => {
            resolve(data)
          }).
          catch(err => {
            console.log("---------------------------------");
            console.log(err);
            reject({
              status: false,
              error: err
            })
          })

      }) 

    }

    static getUserDetail (cond) {
      return new Promise (resolve => {
        User
          .find(cond)
          .then(data => {
            resolve(data)
          })
      })
    }

  }

module.exports = UserClass;
