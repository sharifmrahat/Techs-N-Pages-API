var uniqueValidator = require('mongoose-unique-validator');

const duplicateHandler = (schemaName, message) => {
   return schemaName.plugin(uniqueValidator, { message: message ?? 'The {PATH} {VALUE} is already exist!' });
}

module.exports = duplicateHandler