// @flow

import { createAction } from 'redux-actions'

export const SAY_HELLO = 'SAY_HELLO'

// sayHello return object contain type and payload
export const sayHello = createAction(SAY_HELLO)
