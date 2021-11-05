module.exports = dependencies =>{
    const{mongoRepository} = dependencies;
    if (!mongoRepository){
        throw new Error('mongoRepository should exists in dependencies');

    } 
    
    const execute = ({owner})=>{
        return mongoRepository.get(owner);
    } 
    return{ execute } ;
} 