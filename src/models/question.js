const bookshelf = require('../config/bookshelf');
const Fields = require('bookshelf-schema/lib/fields');
const Relations = require('bookshelf-schema/lib/relations');

module.exports = bookshelf.model('Question', {
  tableName: 'questions',
  uuid: true,
  schema: [
    Fields.StringField('description'),
    Relations.HasMany('Rating', { onDestroy: 'cascade' }),
    Relations.BelongsTo('Session'),
    Relations.HasOne('Answer', { onDestroy: 'cascade' }),
    Fields.StringField('userId')
  ]
});
