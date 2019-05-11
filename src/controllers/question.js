const { Question, Rating } = require('../models');

module.exports = {
  async getQuestions(req, res, next) {
    try {
      const query = {
        sessionId: req.query.sessionId
      };
      let questionsObj = [];
      if (query.sessionId) {
        questions = await Question.forge()
          .where({
            sessionId: query.sessionId
          })
          .fetchAll({ withRelated: ['answer', 'ratings'] });
        questionsObj = questions.toJSON().map(item => {
          const rating = item.ratings.length;
          delete item.ratings;
          return {
            ...item,
            rating,
            isVoted: item.userId === req.user.id
          };
        });
      }
      res.status(200).send(questionsObj);
    } catch (e) {
      next(e);
    }
  },
  async getQuestion(req, res, next) {
    try {
      const question = await Question.forge({ id: req.params.id }).fetch({
        require: true,
        withRelated: ['answer', 'ratings']
      });
      const questionObj = question.toJSON();
      const rating = questionObj.ratings.length;
      delete questionObj.ratings;
      res.status(200).send({
        ...questionObj,
        rating,
        isVoted: questionObj.userId === req.user.id
      });
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
      const questionObj = question.toJSON();
      res.status(200).send({
        ...questionObj,
        rating: 1,
        isVoted: questionObj.userId === req.user.id,
        answer: null
      });
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
        require: true,
        withRelated: ['answer', 'ratings']
      });
      const response = await question.save({ ...req.body });
      const responseObj = response.toJSON();
      const rating = responseObj.ratings.length;
      delete responseObj.ratings;
      res.status(200).send({
        ...responseObj,
        rating,
        isVoted: req.user.id === responseObj.userId
      });
    } catch (e) {
      next(e);
    }
  }
};
