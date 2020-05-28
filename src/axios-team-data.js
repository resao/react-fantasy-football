import axios from "axios";

export default axios.create({
  baseURL: "https://react-fantasy-football.firebaseio.com/",
});
