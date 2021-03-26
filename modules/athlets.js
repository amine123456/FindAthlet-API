const mongoose = require('mongoose');
const Schema = mongoose.Schema;




//athlet geolocation schema

const GeoSchema = new Schema({

        type: {
            type: String,
            default: "Point"
        },
        coordinates: {
            type:[Number],
            index: "2dsphere"
        }



})

//athletes Schemaa
const AthletSchema = new Schema({


    email: {
            type:String,
            required: [true , 'Email is required']
    },

    phone: {
        type:String,
        required: [true , 'Phone Number is required']
    },

    name: {
        type: String,
        required: [true , 'Name is required']
    },

    prenom: {
        type: String,
        required: [true , 'prenom is required']
    },

    password: {
        type: String,
        required: [true , 'Password is required']
    },

    geometry: GeoSchema

});

const Athlet = mongoose.model('athlet' , AthletSchema);

module.exports = Athlet;