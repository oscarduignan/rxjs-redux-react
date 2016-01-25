"use strict"
const Rx = require('rx')
const test = require('tape')
const invariant = require('invariant')
const curry = require('ramda/src/curry')
const { createStore } = require('./lib')

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

test('counter responds to increment and decrement', (assert) => {
  let initialCount = 0
  const store = createStore(counter(initialCount))

  assert.plan(5)
  store.state$.subscribe((state) => {
    assert.equal(state, initialCount)

    if(initialCount < 3) {
      initialCount++
    } else {
      initialCount--
    }
  })

  store.dispatch('increment')
  store.dispatch('increment')
  store.dispatch('increment')
  store.dispatch('decrement')
})

const React = require('react')
const { PropTypes, createElement } = React
const { div } = React.DOM
const TestUtils = require('react-addons-test-utils')
const jsdom = require('jsdom')
const compose = require('recompose/compose')
const createSpy = require('recompose/createSpy')
const { Provider } = require('./lib')
const { observePropsFromStore } = require('./lib')

global.document = jsdom.jsdom('<html><body></body></html>')
global.window   = document.defaultView

test('component gets props from store and rerenders when changed', (assert) => {
  let initialCount = 0

  const store = createStore(actions$ => ({
    count: counter(initialCount, actions$)
  }))

  const spy = createSpy()

  const CurrentCount = compose(
    observePropsFromStore(({state$}) => state$),
    spy
  )(({count}) => div('Current count is ' + count))

  TestUtils.renderIntoDocument(
    createElement(Provider, {store}, createElement(CurrentCount))
  )

  assert.plan(3)
  assert.deepEqual(spy.getProps(), {count: initialCount})
  store.dispatch('increment')
  assert.deepEqual(spy.getProps(), {count: initialCount+1})
  store.dispatch('increment')
  store.dispatch('increment')
  store.dispatch('decrement')
  assert.deepEqual(spy.getProps(), {count: initialCount+1+1+1-1})
})
