
const{
    Response
}  = require('../../frameworks/common');
module.exports = dependencies =>{
    const{
        useCases:{
            user:{  
                listUsersUseCase
            } 
        } 
    }  = dependencies;
    const listUsers = async (req,res,next) =>{
        try{
            const listUsers = listUsersUseCase(dependencies);
            const response = await listUsers.execute();
            
            res.json(new Response({
                status:true,
                content:response
            }));
            
            next();

        } catch (err){
            next(err);
        } 

    } 
    return listUsers;

} 