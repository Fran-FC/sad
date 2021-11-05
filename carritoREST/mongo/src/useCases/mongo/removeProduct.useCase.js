module.exports = dependencies =>{
    const{mongoRepository} = dependencies;
    if (!mongoRepository){
        throw new Error('mongoRepository should exists in dependencies');

    } 
    
    const execute = ({owner, product, quantity})=>{
        var carrito = {owner:owner, product:product, quantity:quantity};
        return mongoRepository.delete(carrito);
    } 
    return{ execute } ;
} 