const initialState = {
  user: null
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN_USER':
      console.log("Logging in user...");
      return Object.assign({}, state, {
        user: action.payload
      })
    case 'LOGOUT_USER':
      console.log("Logging out user...");
      return Object.assign({}, state, {
        user: null
      })
    default:
      return state
  }
}
