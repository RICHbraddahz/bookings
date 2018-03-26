'use strict';

const genRandomId = (userContext, events, done) => {
  const id = Math.floor(Math.random() * 10e6);
  userContext.vars.id = id;
  done();
};

exports.genRandomId = genRandomId;
