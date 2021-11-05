const addProductController = require("./addProductController");
const removeProductController = require("./removeProductController");
const toStringController = require("./toStringController");

module.exports = dependencies =>{
    return {
        addProductController: addProductController(dependencies),
        removeProductController: removeProductController(dependencies),
        toStringController: toStringController(dependencies)
    } 
} 