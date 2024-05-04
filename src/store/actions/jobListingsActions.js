import { fetchJobListingsRequest, fetchJobListingsSuccess, fetchJobListingsFailure } from '../reducers/jobListingsReducer';

export const fetchJobListings = (page) => {
  return async (dispatch) => {
    dispatch(fetchJobListingsRequest());
    try {
      const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          limit: 8,
          offset: page * 8, // Calculate offset based on the page number
        }),
      });
      const data = await response.json();
      // console.log(data);
      dispatch(fetchJobListingsSuccess(data.jdList));
    } catch (error) {
      dispatch(fetchJobListingsFailure(error.message));
    }
  };
};
