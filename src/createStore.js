import Rx from 'rx'
import combineLatestObj from 'rx-combine-latest-obj'
import isPlainObject from 'lodash.isplainobject'

/*
  ## EXAMPLE

  ```js
  const eq     = (x) => (y) => x === y
  const always = (x) => ( ) => x

  const counter = curry((initialCount, actions$) => {
    invariant(Number.isInteger(initialCount), "counter requires a numeric initialCount parameter")
  
    const increment$ = actions$.filter(eq('increment'))
    const decrement$ = actions$.filter(eq('decrement'))
    
    return Rx.Observable.merge(
      increment$.map(always(1)),
      decrement$.map(always(-1))
    )
      .scan((total, x) => total + x, initialCount)
      .startWith(initialCount)
  })

  const store = createStore(counter(0))

  store.state$.subscribe(::console.log)

  store.dispatch('increment')
  store.dispatch('decrement')
  ```
*/
export default (model) => {
  const actions$ = new Rx.Subject()
  const dispatch = actions$.onNext.bind(actions$)
  const model$   = model(actions$, dispatch)
  const state$   = (
    isPlainObject(model$)
      ? combineLatestObj(model$)
      : model$
  ).repeat(1)

  return {
    state$,
    dispatch
  }
}
