const {fetchUserProfile,modifyUserProfile}=require('../services/profileService');

async function getProfileController(req,res){
    const userId=req.user.id;
    try{
        const profile=await fetchUserProfile(userId);
        if(!profile){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(profile);
    }catch(err){
        return res.status(500).json({message:'Error fetching profile: '+err.message});
    }
}

async function updateProfileController(req,res){
    const userId=req.user.id;
    const profileData=req.body;
    try{
        const updatedProfile=await modifyUserProfile(userId,profileData);
        if(!updatedProfile){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(updatedProfile);
    }catch(err){
        return res.status(500).json({message:'Error updating profile: '+err.message});
    }
}

module.exports={getProfileController,updateProfileController};  