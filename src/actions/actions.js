import { GET_CLUBS } from "../actionTypes";

export const fetchDataClubActions = () => async dispatch => {
  const responsClubs = await fetch(
    "https://instasport.co/dashboard/api/v1/clubs/"
  );
  const clubs = await responsClubs.json();

  dispatch({
    type: GET_CLUBS,
    payload: clubs
  });
};
