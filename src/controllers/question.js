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
          const ratingObj = item.ratings.find(
            rating => rating.userId === req.user.id
          );
          const isVoted = item.userId === req.user.id || !!ratingObj;
          delete item.ratings;
          return {
            ...item,
            rating,
            isVoted,
            ratingObj
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
      const ratingObj = questionObj.ratings.find(
        rating => rating.userId === req.user.id
      );
      const isVoted = questionObj.userId === req.user.id || !!ratingObj;
      delete questionObj.ratings;
      res.status(200).send({
        ...questionObj,
        rating,
        isVoted,
        ratingObj
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
      const ratingObj = await Rating.forge({
        questionId: question.id,
        userId: req.body.userId
      }).save();
      const questionObj = question.toJSON();
      res.status(200).send({
        ...questionObj,
        rating: 1,
        isVoted: questionObj.userId === req.user.id,
        answer: null,
        ratingObj
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
      const ratingObj = responseObj.ratings.find(
        rating => rating.userId === req.user.id
      );
      const rating = responseObj.ratings.length;
      const isVoted = req.user.id === responseObj.userId || !!ratingObj;
      delete responseObj.ratings;
      res.status(200).send({
        ...responseObj,
        rating,
        isVoted,
        ratingObj
      });
    } catch (e) {
      next(e);
    }
  }
};
