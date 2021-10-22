const{User} =require('../../entities');

module.exports = dependencies =>{
    const{userRepository} = dependencies;
    if (!userRepository){
        throw new Error('userRepository should exists in dependencies');

    } 
    
    const execute = ()=>{
        //return userRepository.(newUser);
        return 

    } 
    return{ execute } ;
} 