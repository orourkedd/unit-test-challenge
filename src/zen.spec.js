const { zen } = require('./zen');
const { actions, success, failure } = require('effects-as-data/node');
const { testIt } = require('effects-as-data/test');

const testZen = testIt(zen);

test(
  'zen() should cache miss if cache is empty, GET zen from github, set cache, and return result',
  testZen(() => {
    const now = 1492180435000;

    // prettier-ignore
    return [
      [null, [actions.now(), actions.getState(['zen', 'time'])]],
      [[now, { zen: null, time: null }], actions.httpGet('https://api.github.com/zen')],
      ['foo', actions.setState({ zen: 'foo', time: now })],
      [null, 'foo']
    ]
  })
);

test(
  'zen() should return zen from the cache if the cache is less than 5 seconds old',
  testZen(() => {
    const cacheTime = 1492180435000;
    const now = cacheTime + 2 * 1000;

    // prettier-ignore
    return [
      [null, [actions.now(), actions.getState(['zen', 'time'])]],
      [[now, { zen: 'foo', time: cacheTime }], 'foo']
    ]
  })
);

test(
  'zen() should cache miss if cache is older than 5 seconds, GET zen from github, set cache, and return result',
  testZen(() => {
    const cacheTime = 1492180435000;
    const now = cacheTime + 10 * 1000;

    // prettier-ignore
    return [
      [null, [actions.now(), actions.getState(['zen', 'time'])]],
      [[now, { zen: 'foo', time: cacheTime }], actions.httpGet('https://api.github.com/zen')],
      ['foo', actions.setState({ zen: 'foo', time: now })],
      [null, 'foo']
    ]
  })
);

test(
  'zen() should handle http GET failure',
  testZen(() => {
    const now = 1492180435000;

    // prettier-ignore
    return [
      [null, [actions.now(), actions.getState(['zen', 'time'])]],
      [[now, { zen: null, time: null }], actions.httpGet('https://api.github.com/zen')],
      [failure('oops'), failure('oops')]
    ]
  })
);
