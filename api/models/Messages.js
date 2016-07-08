/**
 * Messages.js
 *
 * @description :: Messages collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    message_id: {
      type: 'integer',
      primaryKey: true,
      unique: true
    },
    from: {
      model: 'users',
      defaultsTo: null
    },
    date: {
      type: 'integer',
      defaultsTo: 0
    },
    chat: {
      model: 'chats',
      defaultsTo: null
    },
    photo: {
      type: 'array',
      defaultsTo: null
    },
    caption: {
      type: 'string',
      defaultsTo: ''
    },
    update: {
      model: 'update',
      defaultsTo: null
    }

  }
};

