const { handlers } = require('effects-as-data/node');
const { zen } = require('./zen');
const { run } = require('effects-as-data');

const runIt = () => run(handlers, zen).then(console.log);

runIt();

setTimeout(() => {
  console.log('\nAfter 2 seconds:');
  runIt();
}, 2000);

setTimeout(() => {
  console.log('\nAfter 4 seconds:');
  runIt();
}, 4000);

setTimeout(() => {
  console.log('\nAfter 8 seconds (should be new wisdom):');
  runIt();
}, 8000);
