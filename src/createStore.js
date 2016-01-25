import Rx from 'rx'
import combineLatest from './combineLatest'

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
export default (model, initialState) => {
  const actions$ = new Rx.Subject()
  const dispatch = actions$.onNext.bind(actions$)
  const state$   = combineLatest(model(initialState, actions$, dispatch)).repeat(1)

  return {
    state$,
    dispatch
  }
}
