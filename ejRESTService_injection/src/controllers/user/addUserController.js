const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            user:{  
                addUserUseCase
            } 
        } 
    }  = dependencies;
    const addUser = async (req,res,next) =>{
        try{
            const body =  JSON.parse(req.body);

            console.log(JSON.parse(req.body));
            console.log(req.body.name);


            const{
                id,
                name,
                lastName,
                gender,
                meta
            } = body;

            const addUser = addUserUseCase(dependencies);
            const response = await addUser.execute({
                id,
                name,
                lastName, 
                gender,
                meta
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
    return addUser;

} 