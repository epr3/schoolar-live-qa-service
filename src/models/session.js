const bookshelf = require('../config/bookshelf');
const Fields = require('bookshelf-schema/lib/fields');
const Relations = require('bookshelf-schema/lib/relations');

module.exports = bookshelf.model('Session', {
  tableName: 'sessions',
  uuid: true,
  schema: [
    Fields.StringField('eventId'),
    Fields.StringField('code'),
    Relations.HasMany('Question', { onDestroy: 'cascade' })
  ]
});
