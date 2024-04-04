// TODO: This is a sample seed file for demonstration. Remove before adding real ones.

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Teams')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('Teams').insert([
        {
          title: 'abc',
        },
        {
          title: 'def',
        },
      ]);
    });
};
