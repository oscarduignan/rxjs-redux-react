import Rx, { Observable } from 'rx';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, observePropsFromStore, Provider } from 'rxjs-redux-react';
import curry from 'ramda/src/curry'

const eq     = (x) => (y) => x === y
const always = (x) => ( ) => x

const counter = (initialCount, actions$) => {
    const increment$ = actions$.filter(eq('increment'))
    const decrement$ = actions$.filter(eq('decrement'))

    return Observable.merge(
        increment$.map(always(1)),
        decrement$.map(always(-1))
    )
        .scan((total, x) => total + x, initialCount)
        // don't allow the count to go below 0
        .map(count => count < 0 ? 0 : count)
        .distinctUntilChanged()
        .startWith(initialCount)
}

const store = createStore(counter, 0)

const logRender = (elements) => { console.log("render"); return elements }

const CurrentCount = observePropsFromStore(
    ({state$, dispatch}) => ({
        count: state$,
        increment: Observable.just(() => dispatch('increment')),
        decrement: Observable.just(() => dispatch('decrement')),
    }),
    ({count, increment, decrement}) => logRender(
        <div>
            <p>Current count is {count}</p>
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
        </div>
    ))

store.state$.subscribe(::console.log)

ReactDOM.render(
    <Provider store={store}>
        <CurrentCount/>
    </Provider>,
    document.getElementById('app')
)
