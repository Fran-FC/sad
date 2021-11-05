const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            carrito:{  
                addProductUseCase
            } 
        } 
    }  = dependencies;
    const addProduct = async (req,res,next) =>{
        try{
            const body =  JSON.parse(req.body);

            console.log(JSON.parse(req.body));
            console.log(req.body.name);


            const{
                owner,
                products
            } = body;

            const addProduct = addProductUseCase(dependencies);
            const response = await addProduct.execute({
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
    return addProduct;

} 