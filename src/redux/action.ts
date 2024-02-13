export const fetchUserRequest = () => ({type: 'FETCH_USER_REQUEST'});

export const fetchUserSuccess = userData => ({
  type: 'FETCH_USER_SUCCESS',
  payload: userData,
});
export const fetchUserFailure = error => ({
  type: 'FETCH_USER_FAILURE',
  payload: error,
});
export const updateUser = updateData => ({
  type: 'UPDATE_USER',
  payload: updateData,
});
