import combineLatestObj from 'rx-combine-latest-obj'
import isPlainObject from 'lodash.isplainobject'

export default (obj) => 
    isPlainObject(obj)
        ? combineLatestObj(obj)
        : obj
