/**
 * Options.js
 *
 * @description :: Voting options collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  migrate: 'safe',
  attributes: {
    option_id: {
      type: 'integer',
      unique: true
    },
    text:{
      type: 'string'
    },
    description_es:{
      type:'string'
    },
    description_ca:{
      type: 'string'
    }
  }
};

