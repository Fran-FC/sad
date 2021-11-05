
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
            const toString = toStringUseCase(dependencies);
            const response = await toString.execute();
            
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