const{User} =require('../../entities');

module.exports = dependencies =>{
    const{userRepository} = dependencies;
    if (!userRepository){
        throw new Error('userRepository should exists in dependencies');

    } 
    
    const execute = ({name,lastName,gender,meta})=>{
        const newUser = new User({name,lastName,gender,meta});
        return userRepository.add(newUser);

    } 
    return{ execute } ;
} 