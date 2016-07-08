/**
 * Votes.js
 *
 * @description :: Votes collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    vote:{
      type: 'string',
      required: true
    }
  }
};

