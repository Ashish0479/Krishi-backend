const User=require('../schema/userSchema');
async function getProfile(userId){
    try{
        const user=await User.findById(userId).select('-password -__v -createdAt -updatedAt');
        return user;
    }catch(err){
        throw new Error('Error fetching profile: '+err.message);
    }
}

async function updateProfile(userId,profileData){
    try{
        const updatedUser=await User.findByIdAndUpdate(userId,profileData,{new:true}).select('-password -__v -createdAt -updatedAt');
        return updatedUser;
    }catch(err){
        throw new Error('Error updating profile: '+err.message);
    }
}

module.exports={getProfile,updateProfile};