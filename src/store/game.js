const LOAD_GAME = 'LOAD_GAME'


export const getGame = () => dispatch => {
  const game = {
    inputs: {},
    outputs: {},
    board: {}
  }
  dispatch({
    type: 'LOAD_GAME',
    game,
  })
}

const initialState = {

}


export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return { ...state, ...action.game }
    default:
      return state
  }
}
