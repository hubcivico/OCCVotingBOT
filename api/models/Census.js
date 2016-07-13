/**
 * Census.js
 *
 * @description :: Census collection
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  migrate: 'drop',

  attributes: {
    dni: {
      type: 'string',
      required: true,
      unique: true // Yes unique one
    },
    birth_date:{
      type: 'string',
      required: true
    },
    sex:{
      type: 'string'
    },
    address:{
      type: 'string'
    },
    name:{
      type:'string'
    },
    surname1:{
      type:'string'
    },
    surname2:{
      type:'string'
    }
  }
};

