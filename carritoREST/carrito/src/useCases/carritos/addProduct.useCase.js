const {Carrito} = require("../../entities");

module.exports = dependencies => {
    const {carritoRepository} = dependencies;

    if(!carritoRepository) {
        throw new Error("carritoRepository should exist in dependencies");
    }
    
    const execute = ({owner, product, quantity}) => {
        var carrito = carritoRepository.get(owner);
        if (!carrito) {
            carrito = new Carrito(owner);
        }
        return carrito.addProduct(product, quantity);
    }
    
    return {execute};
}