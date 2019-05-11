const { Question } = require('../models');
const { Rating } = require('../models/rating');

module.exports = {
  async getQuestions(req, res, next) {
    try {
      const query = {
        sessionId: req.query.sessionId
      };
      let questions = [];
      if (query.sessionId) {
        questions = await Question.forge()
          .where({
            sessionId: query.sessionId
          })
          .fetchAll();
      }
      res.status(200).send(questions);
    } catch (e) {
      next(e);
    }
  },
  async getQuestion(req, res, next) {
    try {
      const question = await Question.forge({ id: req.params.id }).fetch({
        require: true
      });
      res.status(200).send(...question.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async postQuestion(req, res, next) {
    try {
      const question = await Question.forge({
        sessionId: req.body.sessionId,
        description: req.body.description
      }).save();
      await Rating.forge({
        questionId: question.id,
        userId: req.user.id
      }).save();
      res.status(200).send(question.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async removeQuestion(req, res, next) {
    try {
      const question = await Question.forge({ id: req.params.id }).fetch({
        require: true
      });
      await question.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateQuestion(req, res, next) {
    try {
      const question = await Question.forge({ id: req.params.id }).fetch({
        require: true
      });
      const response = await question.save({ ...req.body });
      res.status(200).send(...response.toJSON());
    } catch (e) {
      next(e);
    }
  }
};
