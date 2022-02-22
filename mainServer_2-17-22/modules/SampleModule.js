const Sample = require('../models/SampleModel');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

class SampleClass {

    constructor(data) {
        this.name = (data.name) ? data.name : "";
        this.age = (data.age) ? data.age : null;
    }

    save() {
        return new Promise((resolve, reject) => {
            var newSample = new Sample({
                name: this.name,
                age: this.age,
            });

            newSample.save()
                .then((data) => {
                    resolve(data);
                })
        }); // end promise
    }
}

module.exports = SampleClass;
