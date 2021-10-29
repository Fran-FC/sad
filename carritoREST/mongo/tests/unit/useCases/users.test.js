
const{
    user:{
        addUserUseCase
    } 
}  = require('../../../src/useCases');

const{
    User, 
    constants:{ 
        UserConstants :{
            Genders
        } 
    } 
} = require('../../../src/entities');

const Chance= require('chance');
const chance = new Chance();
const{
    v4 : uuidv4
}  = require('uuid');


describe('User use cases', () =>{


    const mockUserRepo ={
        add: jest.fn(async user => ({
            ...user,
            id:uuidv4()
        } ))
    } 
    const dependencies = {
        userRepository : mockUserRepo
    } 
    describe('add user use case',()=>{
        

        test('User should be added', async () =>{
            // create a user
            const testUser = new User({
                name : chance.name(), 
                lastName : chance.last(),
                gender : Genders.FEMALE, meta:{
                    hair :{color : 'black'} 
                } }  );
            // add a user using de use case

            const addedUser = await addUserUseCase(dependencies).execute(testUser)

            // the user receive corresponds with the user created
            expect(addedUser).toBeDefined();
            expect(addedUser.id).toBeDefined();
            expect(addedUser.name).toBe(testUser.name);
            expect(addedUser.meta).toEqual(testUser.meta);

            // check that dependencies are called

        })
        
    } ) 


})