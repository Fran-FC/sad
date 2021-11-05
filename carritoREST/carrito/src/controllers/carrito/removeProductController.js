const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            carrito:{  
                removeProductUseCase
            } 
        } 
    }  = dependencies;
    const removeProduct = async (req,res,next) =>{
        try{
            const body =  JSON.parse(req.body);

            console.log(JSON.parse(req.body));
            console.log(req.body.name);


            const{
                owner,
                products
            } = body;

            const removeProduct = removeProductUseCase(dependencies);
            const response = await removeProduct.execute({
                owner,
                products
            });
            console.log(response);
            
            
            res.json(new Response({
                status:true,
                content:response
            } ));
            
            next();


        } catch (err){
            next(err);
        } 

    } 
    return removeProduct;

} 