import React, { PropTypes } from 'react'
import compose from 'recompose/compose'
import withContext from 'recompose/withContext'

/*
  ## EXAMPLE

  ```js
  <Provider store={store}>
    <CurrentCount/>
  </Provider>
  ```
*/
export default withContext(
  { store: PropTypes.object },
  (props) => ({ store: props.store }),
  ({children}) => children
)
