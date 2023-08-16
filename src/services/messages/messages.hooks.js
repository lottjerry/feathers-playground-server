const { authenticate } = require("@feathersjs/authentication").hooks;
const { setField } = require("feathers-authentication-hooks");

const limitToUser = setField({
  from: "params.user.id",
  as: "params.query.userId",
});

const processMessage = require('../../hooks/process-message');


module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [limitToUser],
    get: [limitToUser],
    create: [
      processMessage('dateCreated','timeCreated')
    ],
    update: [
      limitToUser,
      processMessage('dateUpdated','timeUpdated')
    ],
    patch: [limitToUser],
    remove: [limitToUser],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
