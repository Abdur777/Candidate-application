import { fetchJobListingsRequest, fetchJobListingsSuccess, fetchJobListingsFailure } from '../reducers/jobListingsReducer';

export const fetchJobListings = () => {
  return async (dispatch) => {
    dispatch(fetchJobListingsRequest());
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 10,
          offset: 0,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(fetchJobListingsSuccess(data));
    } catch (error) {
      dispatch(fetchJobListingsFailure(error.message));
    }
  };
};
