const { Rating } = require('../models/rating');

module.exports = {
  async getRatings(req, res, next) {
    try {
      const query = {
        questionId: req.query.questionId
      };
      let ratings = [];
      if (query.questionId) {
        ratings = await Rating.forge()
          .where({
            questionId: query.questionId
          })
          .fetchAll();
      }
      res.status(200).send(ratings.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async getRating(req, res, next) {
    try {
      const rating = await Rating.forge({ id: req.params.id }).fetch({
        require: true
      });
      res.status(200).send(rating.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async postRating(req, res, next) {
    try {
      const rating = await Rating.forge({ ...req.body }).save();
      res.status(200).send(rating.toJSON());
    } catch (e) {
      next(e);
    }
  },
  async removeRating(req, res, next) {
    try {
      const rating = await Rating.forge({ id: req.params.id }).fetch({
        require: true
      });
      await rating.destroy();
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  },
  async updateRating(req, res, next) {
    try {
      const rating = await Rating.forge({ id: req.params.id }).fetch({
        require: true
      });
      const response = await rating.save({ ...req.body });
      res.status(200).send(response.toJSON());
    } catch (e) {
      next(e);
    }
  }
};
