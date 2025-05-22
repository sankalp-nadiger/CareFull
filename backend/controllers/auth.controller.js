import User from '../models/user.model.js';
import axios from 'axios';
async function fetchAndStoreUsers() {
  try {
    const response = await axios.get('https://fitfull.onrender.com/api/users/full');
    const users = response.data;
    
    // Process each user
    for (const user of users) {
      // Map fitfull user data to our schema
      const userData = {
        fitfullUserId: user.id || user._id,
        fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email,
        avatar: user.avatar || user.profilePicture,
        mobileNumber: user.mobileNumber || user.phone,
        googleId: user.googleId,
        authProvider: user.authProvider || 'google',
        proofs: user.proofs || [],
        username: user.username || user.email.split('@')[0]
      };
      
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      
      if (existingUser) {
        // Update existing user
        await User.findOneAndUpdate({ email: userData.email }, userData);
        console.log(`Updated user: ${userData.email}`);
      } else {
        // Create new user
        const newUser = new User(userData);
        await newUser.save();
        console.log(`Added new user: ${userData.email}`);
      }
    }
    
    console.log('All users processed successfully');
  } catch (error) {
    console.error('Error fetching or storing users:', error);
  }
}

