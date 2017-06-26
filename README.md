# Unit Test Challenge

There has been a lot of discussion around mocks in testing.  I wanted to throw a challenge out to see if anyone can write better unit tests, using mocks or not, than the one defined here:

[The Function](https://github.com/orourkedd/unit-test-challenge/blob/master/src/zen.js)

[The Specs](https://github.com/orourkedd/unit-test-challenge/blob/master/src/zen.spec.js)

"Better" is subjective so this challenge is for the personal growth of those doing and/or watching the exercise.

You can run the function in this repo by doing:

```
npm install
```

Then, for the demo:

```
npm start
```

or, for the tests:

```
npm test
```

## Requirements for the function

The function you must write and test must meet the following requirements:

1. It will do a GET request to https://api.github.com/zen and return the result as a string.

2. Anytime it is called within 5 seconds of a previous call, it will return the previous value from an in-memory cache.  The function should not do a GET request more than once inside of a 5 second window.  For example, if the function is called and returns the result, "Blocking is better than non-blocking", it should return that same result every time it is called for the next 5 seconds (ignore latency to github).

3. After 5 seconds, the function should cache miss when called and do a new GET request to https://api.github.com/zen, set the result in the in-memory cache, and return it to the user.

4. It should handle a GET failure by throwing or returning some kind of information about the failure.

5. Don't use existing 3rd party debouncing utilities.

## Requirements for the tests

1. Should test ordering of operations (i.e. tests should ensure that cache set does not happen before GET request).

2. Should test that operations happen the correct number of times.  For example, simply testing that the GET request and cache set occur is not sufficient; it must test that these operations happen only once.

3. Should cover these scenarios:
 * should cache miss if cache is empty, GET zen from github, set cache, and return result.
 * should return zen from the cache if the cache is less than 5 seconds old.
 * should cache miss if cache is older than 5 seconds, GET zen from github, set cache, and return result.
 * should handle http GET failure.

Have fun!
