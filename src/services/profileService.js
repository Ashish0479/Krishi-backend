const {getProfile,updateProfile}=require('../repository/profileRepository');

async function fetchUserProfile(userId){
    try{
        const profile=await getProfile(userId);
        return profile;
    }catch(err){
        throw new Error('Error in service while fetching profile: '+err.message);
    }
}

async function modifyUserProfile(userId,profileData){
    try{
        const updatedProfile=await updateProfile(userId,profileData);
        return updatedProfile;
    }catch(err){
        throw new Error('Error in service while updating profile: '+err.message);
    }
}

module.exports={fetchUserProfile,modifyUserProfile};