const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// define Person schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true // Ensures uniqueness of usernames
      },
    password: {
        type: String,
        required: true
      }

      
    
});

// Define pre-save middleware function
personSchema.pre('save', async function(next) {
    const person = this;
    try {
        // Check if password has been modified or is new
        if (!person.isModified('password')) {
            return next();
        }

        // Generate salt
        const salt = await bcrypt.genSalt(10);

        // Hash the password along with the salt
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Replace plaintext password with hashed password
        person.password = hashedPassword;

        // Call next() to proceed with saving the document
        next();
    } catch (error) {
        // Handle any errors that occur during pre-save operations
        next(error);
    }
});

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use bcrypt.compare to compare candidatePassword with hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        // Handle any errors
        throw new Error(error);
    }
};



// now work is not done I have to complete model.js
// create Person model
const Person = mongoose.model('Person', personSchema);  // Person model name
module.exports = Person;