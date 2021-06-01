const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
      },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      breweries: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Brewery'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true
      }
    }
  );
  
  // set up pre-save middleware to create password
  userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
  
    next();
  });
  
  // compare the incoming password with the hashed password
  userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };
  
  //saved brewery count
  userSchema.virtual('breweryCount').get(function() {
    return this.breweries.length;
  });

  const User = model('User', userSchema);
  
  module.exports = User;