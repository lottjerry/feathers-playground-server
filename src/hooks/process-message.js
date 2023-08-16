// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = (date, time) => {
  return async (context) => {
    // data from message
    const { data } = context;

    // Throw an error if database did not recieve a message
    if (!data.messageBody) {
      throw new Error("A message can not be empty");
    }

    // The logged in user
    const { user } = context.params;
    // The actual message text
    // Make sure that messages are no longer than 100 characters
    const text = data.messageBody.substring(0, 100);

    // Update the original data (so that people can't submit additional stuff)
    data.messageBody = text;
    data.userId = user.id;
    data[date] = new Date().toLocaleDateString("en-us", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    data[time] = new Date().toLocaleTimeString("en-US");
    return context;
  };
};
