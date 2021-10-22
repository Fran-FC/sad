
const { TestWatcher } = require('jest');
const Chance= require('chance');
const chance = new Chance();

const{
    userRepository
} = require('../../../src/frameworks/repositories/InMemory');

const{
    User, 
    constants:{ 
        UserConstants :{
            Genders
        } 
    } 
} = require('../../../src/entities');

describe("user's repository", ()=>{ 
    test('A user should be added and returned',async ()=>{
        const testUser = new User({
            name : chance.name(), 
            lastName : chance.last(),
            gender : Genders.FEMALE, meta:{
                hair :{color : 'black'} 
            } }  );
        const addedUser = await userRepository.add(testUser);

        expect(addedUser).toBeDefined();
        expect(addedUser.id).toBeDefined();
        expect(addedUser.name).toBe(testUser.name);
        expect(addedUser.meta).toEqual(testUser.meta);

    }); 
    test('A user should be deleted',async ()=>{
        const testUsertoBeDeleted = new User({
            name : chance.name(), 
            lastName : chance.last(),
            gender : Genders.FEMALE, meta:{
                hair :{color : 'black'} 
            } }  );
        const testUsertoBeAdded = new User({
            name : chance.name(), 
            lastName : chance.last(),
            gender : Genders.MALE, meta:{
                hair :{color : 'black'} 
            } }  );
        // add two users
        const[AddedUsertoBeDeleted,AddedUser]=await Promise.all([ 
            userRepository.add(testUsertoBeDeleted),
            userRepository.add(testUsertoBeAdded)] 
            
        );
        expect(testUsertoBeDeleted).toBeDefined();
        expect(testUsertoBeAdded).toBeDefined();

        // delete one user
        const deletedUser = await userRepository.delete(testUsertoBeDeleted);
        expect(deletedUser).toEqual(testUsertoBeDeleted);

        // try to get the deleted user 
        const shouldBeUndefinedUser = await userRepository.delete(testUsertoBeDeleted);
        expect(shouldBeUndefinedUser).toBeNull();


    });
    test('A user should be updated',async ()=>{});

} )