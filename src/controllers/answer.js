const { Answer } = require('../models');

module.exports = {
  async getAnswers(req, res, next) {
    try {
      const query = {
        questionId: req.query.questionId
      };
      let answers = [];
      if (query.questionId) {
        answers = await Answer.forge()
          .where({
            questionId: query.questionId
          })
          .fetchAll();
      } else {
        answers = await Answer.forge().fetchAll();
      }
      res.status(200).send(answers.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async getAnswer(req, res, next) {
    try {
      const answer = await Answer.forge({ id: req.params.id }).fetch({
        require: true
      });
      res.status(200).send(answer.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async postAnswer(req, res, next) {
    try {
      const answer = await Answer.forge({ ...req.body }).save();
      res.status(200).send(answer.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async removeAnswer(req, res, next) {
    try {
      const answer = await Answer.forge({ id: req.params.id }).fetch({
        require: true
      });
      await answer.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateAnswer(req, res, next) {
    try {
      const answer = await Answer.forge({ id: req.params.id }).fetch({
        require: true
      });
      const response = await answer.save({ ...req.body });
      res.status(200).send(response.toJSON());
    } catch (e) {
      next(e);
    }
  }
};
