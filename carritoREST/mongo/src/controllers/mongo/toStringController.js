
const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            mongo:{  
                toStringUseCase
            } 
        } 
    }  = dependencies;
    const toString = async (req,res,next) =>{
        try{
            const {owner} = req.params;

            const toString = toStringUseCase(dependencies);
            const response = await toString.execute({owner});
            
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