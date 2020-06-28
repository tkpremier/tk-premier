import  { parseFilterQuery } from './filterQueries';

test('transforms url query filter/artists%3DAudemars%20Piguet to an object containing { artists: [Audemars Piguet] }', () => {
  expect(parseFilterQuery('artists%3DAudemars%20Piguet')).toEqual({ 'artists': ['Audemars Piguet'] });
});