/**
 * Stages.js
 *
 * @description :: User Stages collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_id: {
      type: 'integer',
      unique: true
    },
    stage: {
      type: 'string',
      defaultsTo: ''
    },
    banned: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    valid: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    has_voted: {
      type: 'boolean',
      required: true,
      defaultsTo: false
    },
    locale: {
      type: 'string',
      defaultsTo: 'es'
    }
  }
};

