const useCases = require('../useCases');

const repositories = require('../frameworks/repositories/inDataBase');

module.exports = {
    useCases,
    ...repositories 
} 