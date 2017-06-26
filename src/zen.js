const {
  actions,
  success,
  failure,
  isFailure
} = require('effects-as-data/node');

function* zen() {
  const fiveSeconds = 1000 * 5;
  const [$now, $state] = yield [
    actions.now(),
    actions.getState(['zen', 'time'])
  ];
  const cacheIsFresh = $now.payload - $state.payload.time < fiveSeconds;
  if ($state.payload.zen && cacheIsFresh) return $state.payload.zen;
  const $zen = yield actions.httpGet('https://api.github.com/zen');
  if (isFailure($zen)) return $zen;
  yield actions.setState({
    zen: $zen.payload,
    time: $now.payload
  });
  return $zen.payload;
}

module.exports = {
  zen
};
