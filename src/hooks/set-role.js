// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async (context) => {
    const { username, password } = context.data;
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if ((username === adminUsername) && (password === adminPassword)) {
      context.data.role = "admin";
    } else {
      context.data.role = "user";
    }
    return context;
  };
};
