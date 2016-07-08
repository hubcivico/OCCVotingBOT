/**
 * Status.js
 *
 * @description :: Voter status collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    nid: {
      type: 'string',
      required: true,
      unique: true
    },
    telegram_id:{
      type: 'integer',
      defaultsTo: ''
    },
    has_voted:{
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    user_type:{
      type: 'string',
      defaultsTo: ''
    },
    encrypted_vote: {
      type: 'string',
      defaultsTo: ''
    }
  }
};

