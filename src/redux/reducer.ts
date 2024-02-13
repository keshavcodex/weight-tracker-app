const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return { ...state, ...action.payload };
    case 'UPDATE_USER':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};