import { PropTypes } from 'react'
import omit from 'ramda/src/omit'
import curry from 'ramda/src/curry'
import compose from 'recompose/compose'
import getContext from 'recompose/getContext'
import observeProps from 'rx-recompose/observeProps'

/*
  ## EXAMPLE

  ```js
  const CurrentCount = observePropsFromStore(
    ({state$}) => 
      {count: state$},
    ({count}) =>
      <p>Current count is {count}</p>
  ```
)
*/
export default curry((reducer, BaseComponent) => {
  return compose(
    getContext({
      store: PropTypes.object.isRequired
    }),
    observeProps((props$) =>
      props$.flatMap(({store}) =>
        reducer(store, props$.map(omit('store')))))
  )(BaseComponent)
})
