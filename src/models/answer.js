const bookshelf = require('../config/bookshelf');
const Fields = require('bookshelf-schema/lib/fields');
const Relations = require('bookshelf-schema/lib/relations');

module.exports = bookshelf.model('Answer', {
  tableName: 'answers',
  uuid: true,
  schema: [Fields.StringField('description'), Relations.BelongsTo('Question')]
});
