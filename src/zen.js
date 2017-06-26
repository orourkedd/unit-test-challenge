const {
  actions,
  success,
  failure,
  isFailure
} = require('effects-as-data/node');

function* zen() {
  //  Check the in-memory cache for some zen.  Run these actions in parallel
  const fiveSeconds = 1000 * 5;
  const [$now, $state] = yield [
    actions.now(),
    actions.getState(['zen', 'time'])
  ];
  const cacheIsFresh = $now.payload - $state.payload.time < fiveSeconds;
  if ($state.payload.zen && cacheIsFresh) return $state.payload.zen;

  //  Get some zen from github
  const $zen = yield actions.httpGet('https://api.github.com/zen');
  //  If failure, abort
  if (isFailure($zen)) return $zen;

  //  Write to in-memory cache
  //  Do not abort on failure because ff this fails we still want to return "zen".
  yield actions.setState({
    zen: $zen.payload,
    time: $now.payload
  });

  return $zen.payload;
}

module.exports = {
  zen
};
