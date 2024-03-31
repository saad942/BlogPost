const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String }, 
    createdAt: { type: Date, default: Date.now }
});

// Apply the mongoose-sequence plugin to automatically generate an auto-incrementing user_id field
userSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

const User = mongoose.model('User', userSchema);

module.exports = User;
