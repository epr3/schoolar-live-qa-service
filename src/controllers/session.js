const { Session } = require('../models');

module.exports = {
  async getSessions(req, res, next) {
    try {
      const query = {
        eventId: req.query.eventId
      };
      let sessionsObj = [];
      if (query.eventId) {
        sessions = await Session.forge()
          .where({
            eventId: query.eventId
          })
          .fetchAll({
            withRelated: ['questions', 'questions.ratings', 'questions.answer']
          });
        sessionsObj = sessions.toJSON().map(item => {
          return {
            ...item,
            questions: item.questions.map(question => {
              const rating = question.ratings.length;
              delete question.ratings;
              return {
                ...question,
                isVoted: req.user.id === item.userId,
                rating
              };
            })
          };
        });
      }
      res.status(200).send(sessionsObj);
    } catch (e) {
      next(e);
    }
  },
  async getSession(req, res, next) {
    try {
      const session = await Session.forge({ id: req.params.id }).fetch({
        require: true,
        withRelated: ['questions', 'questions.ratings', 'questions.answer']
      });
      const jsonSession = session.toJSON();
      const sessionObj = {
        ...jsonSession,
        questions: jsonSession.questions.map(item => {
          const rating = item.ratings.length;
          delete item.ratings;
          return {
            ...item,
            isVoted: req.user.id === item.userId,
            rating
          };
        })
      };
      res.status(200).send(sessionObj);
    } catch (e) {
      next(e);
    }
  },
  async postSession(req, res, next) {
    try {
      const session = await Session.forge({ ...req.body }).save();
      res.status(200).send(session.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async removeSession(req, res, next) {
    try {
      const session = await Session.forge({ id: req.params.id }).fetch({
        require: true
      });
      await session.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateSession(req, res, next) {
    try {
      const session = await Session.forge({ id: req.params.id }).fetch({
        require: true
      });
      const response = await session.save({ ...req.body });
      res.status(200).send(response.toJSON());
    } catch (e) {
      next(e);
    }
  }
};
