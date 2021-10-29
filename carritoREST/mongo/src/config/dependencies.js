const useCases = require('../useCases');

const repositories = require('../frameworks/repositories/InMemory');

module.exports = {
    useCases,
    ...repositories 
} 