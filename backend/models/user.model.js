import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fitfullUserId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  mobileNumber: { type: String, required: true },
  googleId: String,
  authProvider: { type: String, default: 'google' },
  proofs: [{
    type: String // E.g. file path or URL for proof document
  }],  username: String,
  createdAt: { type: Date, default: Date.now },
  // Added fields for OTP verification
  otp: { type: String },
  otpExpiry: { type: Date },
  isVerified: { type: Boolean, default: false },
  role: { 
    type: String, 
    enum: ['user', 'pharmacist', 'admin'],
    default: 'user'
  }
});

    userSchema.methods.generateAccessToken = function () {
        return jwt.sign(
          {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
            role: this.role,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
          },
        );
      };
      userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
          {
            _id: this._id,
          },
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
          },
        );
      };


const User= mongoose.model("User", userSchema)
export default User;
