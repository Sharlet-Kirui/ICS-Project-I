const Profile = require('../models/profileModel');

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware that sets req.user
    const profile = await Profile.findById(userId).select('-password');
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ profile });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { companyName, email } = req.body;
    
    // Check if email is already taken by another user
    const existingUser = await Profile.findOne({ 
      email, 
      _id: { $ne: userId } 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    
    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { companyName, email },
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ 
      message: 'Profile updated successfully',
      profile: updatedProfile 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete user profile
exports.deleteProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const deletedProfile = await Profile.findByIdAndDelete(userId);
    
    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all profiles (admin only)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().select('-password');
    res.status(200).json({ profiles });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};