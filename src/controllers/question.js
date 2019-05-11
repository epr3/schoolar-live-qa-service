const { Question, Rating } = require('../models');

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
        questions = await Promise.all(
          questions.map(async item => {
            const rating = await Rating.forge()
              .where({ questionId: item.id })
              .count();
            return { ...item.toJSON(), rating };
          })
        );
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
      const rating = await Rating.forge()
        .where({ questionId: question.id })
        .count();
      res.status(200).send({ ...question.toJSON(), rating });
    } catch (e) {
      next(e);
    }
  },
  async postQuestion(req, res, next) {
    try {
      const question = await Question.forge({
        ...req.body
      }).save();
      await Rating.forge({
        questionId: question.id,
        userId: req.body.userId
      }).save();
      res.status(200).send({ ...question.toJSON(), rating: 1 });
    } catch (e) {
      console.log(e);
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
