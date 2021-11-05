const useCases = require('../useCases');

const repositories = require('../frameworks/repositories/inOtherService');

module.exports = {
    useCases,
    ...repositories 
} 