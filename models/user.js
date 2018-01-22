const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: { type: String, required: true },
   userId: { type: String, required: true },
   password: { type: String, required: true },
   email: { type: String, required: true },
   dateCreated: { type: Date, default: Date.now },
   dateModified: { type: Date, default: Date.now }
});

// Sets the createdAt parameter equal to the current time
UserSchema.pre('save', next => {
    let now = new Date();

    if(!this.dateCreated) {
        this.dateCreated = now;
        this.dateModified = now;
    }

    next();
});

module.exports = mongoose.model('User', UserSchema);