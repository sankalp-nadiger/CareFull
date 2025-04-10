import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fitfullUserId: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  googleId: String,
  authProvider: { type: String, default: 'google' },
  role: { type: String, enum: ['fitfull', 'pharmacy', 'volunteer'], default: 'fitfull' },
  proofs: [{
    type: String // E.g. file path or URL for proof document
  }],
  credentials: {
    institution: String,
    graduationYear: Number,
    currentStatus: { type: String, enum: ['Graduated', 'Pursuing'] }
  },
  tokens: {
    googleFitToken: String,
    googleFitTokenExpiry: Date,
    refreshToken: String
  },
  username: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

      userSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password);
      };
      
      userSchema.methods.generateAccessToken = function () {
        return jwt.sign(
          {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
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


export const User= mongoose.model("User", userSchema)
