const {
  actions,
  success,
  failure,
  isFailure
} = require('effects-as-data/node');
const FIVE_SECONDS = 1000 * 5;

function* zen() {
  const cacheActions = [actions.now(), actions.getState(['zen', 'time'])];
  const [$now, $state] = yield cacheActions;
  const cacheIsFresh = $now.payload - $state.payload.time < FIVE_SECONDS;
  if ($state.payload.zen && cacheIsFresh) return $state.payload.zen;
  const $zen = yield actions.httpGet('https://api.github.com/zen');
  if (isFailure($zen)) return $zen;
  yield actions.setState({ zen: $zen.payload, time: $now.payload });
  return $zen.payload;
}

module.exports = {
  zen
};
