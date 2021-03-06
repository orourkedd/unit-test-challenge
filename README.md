# Unit Test Challenge

There has been a lot of discussion around mocks in testing.  I wanted to throw a challenge out to see if anyone can write better unit tests, using mocks or not, than the ones defined using `effects-as-data`, here:

[The Specs](https://github.com/orourkedd/unit-test-challenge/blob/master/src/zen.spec.js)

[The Function](https://github.com/orourkedd/unit-test-challenge/blob/master/src/zen.js)

"Better" is a subjective metric so this challenge is for the personal growth of those doing and/or watching the exercise.  Ideally, you can write something of which other developers say, "Wow, those tests are (concise|readable|clean|awesome|etc)."

Running the demo:

```
npm install
```

For the function (the function demo takes 8 seconds to show the various states):

```
npm start
```

For the tests:

```
npm test
```

# The Challenge

Below are the requirements for the function and its unit tests.

## Requirements for the function

The function and tests must meet the following requirements:

1. It will do a GET request to https://api.github.com/zen and return the result as a string.

2. Anytime it is called within 5 seconds of a previous call, it will return the previous value from an in-memory cache.  The function should not do a GET request more than once inside of a 5 second window.  For example, if the function is called and returns the result, "Blocking is better than non-blocking", it should return that same result every time it is called for the next 5 seconds (ignore latency to github).

3. After 5 seconds, the function should cache miss when called and do a new GET request to https://api.github.com/zen, set the result in the in-memory cache, and return it to the user.

4. It should handle a GET failure by throwing or returning some kind of information about the failure.

5. Don't use existing 3rd party debouncing utilities.

6. You can mock anything that produces a side-effect, but all logic must be in this function.  For example, you can inject a key-value store mock, but the logic to determine when to cache miss must be in this function for the exercise.  The mock cannot be assumed to invalidate the cache behind its interface.

## Requirements for the tests

1. Tests should account for ordering of operations (i.e. tests should ensure that cache set does not happen before GET request).

2. Tests should ensure that operations happen the correct number of times.  For example, simply testing that the GET request and cache set occur is not sufficient; it must test that these operations happen only once.

3. Tests should ensure that mocks are invoked with the correct arguments, the correct number of times.

4. Tests should cover all scenarios ([see tests](https://github.com/orourkedd/unit-test-challenge/blob/master/src/zen.spec.js)):
   * When cache is empty.
   * When cache is not empty and cache is less than 5 seconds old.
   * When cache is not empty and cache is >= 5 seconds old.
   * When http GET fails.

5. 100% coverage.

6. Must be unit tests.

Have fun!
