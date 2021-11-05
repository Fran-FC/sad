
const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            carritos:{  
                toStringUseCase
            } 
        } 
    }  = dependencies;
    const toString = async (req,res,next) =>{
        try{
            const {owner} = req.params;

            const toStringCarrito = toStringUseCase(dependencies);
            const response = await toStringCarrito.execute({owner});
            
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