import { GET_WEATHER } from "./Constants";
import axios from "axios";
import { BASE_URL } from "../components/ApiConstants";
import { toast } from "react-toastify";
export const GetWeatherDetails = (location = "Gurgaon") => async dispatch => {
  dispatch({ type: GET_WEATHER.PENDING });
  axios
    .get(BASE_URL, {
      params: {
        q: location,
        units: "Metric",
        lang: "en"
      }
    })
    .then(response =>
      dispatch({ type: GET_WEATHER.SUCCESS, payload: response.data })
    )
    .catch(err => {
      console.log(err.response, err);
      toast.error(err.response.data.message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false
      });
      dispatch({ type: GET_WEATHER.REJECTED, payload: err.response });
    });
};
