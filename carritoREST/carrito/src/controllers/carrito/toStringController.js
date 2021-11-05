
const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            carrito:{  
                toStringUseCase
            } 
        } 
    }  = dependencies;
    const toString = async (req,res,next) =>{
        try{
            const toStringCarrito = toStringUseCase(dependencies);
            const response = await toStringCarrito.execute();
            
            res.json(new Response({
                status:true,
                content:response
            }));
            
            next();

        } catch (err){
            next(err);
        } 

    } 
    return toString;

} 