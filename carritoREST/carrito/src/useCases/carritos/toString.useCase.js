const {Carrito} = require("../../entities");

module.exports = dependencies => {
    const {carritoRepository} = dependencies;

    if(!carritoRepository) {
        throw new Error("carritoRepository should exist in dependencies");
    }
    
    const execute = ({ owner}) => {
        var carrito = carritoRepository.get(owner);
        return carrito;
    }
    
    return {execute};
}