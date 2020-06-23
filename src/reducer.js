const initialState = {
  clubs: []
};

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CLUBS":
      return { clubs: action.payload };
    default:
      return state;
  }
}

export default Reducer;
