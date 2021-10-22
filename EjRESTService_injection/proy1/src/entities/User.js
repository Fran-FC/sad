module.exports.User =  class User{
    constructor({id,name, lastName, gender, meta}){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.gender = gender;
        this.meta = meta;
    } 
} 
const Genders = {
    NOT_SPECIFIED :0, FEMALE:1, MALE:2
} 
module.exports.UserConstants ={ 
    Genders 
} 