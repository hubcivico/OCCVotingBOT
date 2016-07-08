/**
 * Input.js
 *
 * @description :: Updates collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    update_id: {
      type: 'integer',
      primaryKey: true,
      unique: true
    },
    message: {
      model: 'messages',
      defaultsTo: ''
    }
  }
};

