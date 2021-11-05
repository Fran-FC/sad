const{User} =require('../../entities');

module.exports = dependencies =>{
    const{userRepository} = dependencies;
    if (!userRepository){
        throw new Error('userRepository should exists in dependencies');

    } 
    
    const execute = ()=>{
        return userRepository.list();

    } 
    return{ execute } ;
} 