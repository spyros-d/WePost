const mongoose = require('mongoose');
const schema = mongoose.Schema;

const schemaOptions = {
    timestamps: {
        createdAt: 'created-at',
        updatedAt: 'updated_at'
    },
};

const visitSchema = new schema({
    counter: {
        type: Number,
        required: true
    }
}, schemaOptions);

const visits = mongoose.model('visits', visitSchema, 'visits');

module.exports = visits;