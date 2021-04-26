const libraryReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LIBRARY':
      return action.payload;
    default:
      return state;
  }
};

export default libraryReducer;