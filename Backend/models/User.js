const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {
  if (this.isNew && !this.userId) {
    this.userId = this._id.toString();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
