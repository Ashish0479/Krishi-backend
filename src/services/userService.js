const {createUser,findUser,getUserById}= require('../repository/userRepository')

async function registerUser(userDetails){

    const user = await findUser({
            email: userDetails.email
         
        });
        


if(user){
    throw{reason:"user with given email already exist",statusCode:400}
};

const newUser = await createUser({
    email: userDetails.email,
    password: userDetails.password,
    name: userDetails.name,
    contactNumber: userDetails.mobileNumber,

    state:userDetails.state,
    district:userDetails.district,
    village:userDetails.village,
    pincode:userDetails.pincode,

    preferredLanguage:userDetails.preferredLanguage,
    
    coordinates:userDetails.coordinates,
    landSize:userDetails.landSize,
    landType:userDetails.landType,
    crops:userDetails.crops,
    farmingExperience:userDetails.farmingExperience,
    waterSource:userDetails.waterSource,
    soilType:userDetails.soilType


});


if(!newUser){
    throw{reason:"mobile number already exist",statusCode:500}
}

return newUser;
}

async function getUserProfileService(userId){
  const user = await getUserById(userId);
  return user;
};



module.exports={
    registerUser,getUserProfileService
}