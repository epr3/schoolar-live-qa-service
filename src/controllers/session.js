const { DateTime } = require('luxon');
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
          .fetchAll();
        sessionsObj = sessions.toJSON();
      }
      res.status(200).send(sessionsObj);
    } catch (e) {
      next(e);
    }
  },
  async getSession(req, res, next) {
    try {
      const session = await Session.forge({ id: req.params.id }).fetch({
        require: true
      });
      const jsonSession = session.toJSON();
      res.status(200).send(jsonSession);
    } catch (e) {
      next(e);
    }
  },
  async postSession(req, res, next) {
    try {
      const session = await Session.forge({
        ...req.body,
        status: 'open',
        createdAt: DateTime.local().toISO()
      }).save();
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
