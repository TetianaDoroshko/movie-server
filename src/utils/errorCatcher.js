//універсальний декоратор для відлову помилок в контроллерах

const errorCatcher = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = errorCatcher;
