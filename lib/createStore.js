'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _combineLatest = require('./combineLatest');

var _combineLatest2 = _interopRequireDefault(_combineLatest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  ## EXAMPLE

  ```js
  const eq     = (x) => (y) => x === y
  const always = (x) => ( ) => x

  const counter = (initialCount, actions$) => {
    invariant(Number.isInteger(initialCount), "counter requires a numeric initialCount parameter")
  
    const increment$ = actions$.filter(eq('increment'))
    const decrement$ = actions$.filter(eq('decrement'))
    
    return Rx.Observable.merge(
      increment$.map(always(1)),
      decrement$.map(always(-1))
    )
      .scan((total, x) => total + x, initialCount)
      .startWith(initialCount)
  }

  const store = createStore(({count}, actions$) => {
    return {
      count: counter(count, actions$)
    }
  }, { count: 0 })

  store.state$.subscribe(::console.log)

  store.dispatch('increment')
  store.dispatch('decrement')
  ```
*/

exports.default = function (model, initialState) {
  var actions$ = new _rx2.default.Subject();
  var dispatch = actions$.onNext.bind(actions$);
  var state$ = (0, _combineLatest2.default)(model(initialState, actions$, dispatch)).repeat(1);

  return {
    state$: state$,
    dispatch: dispatch
  };
};