import axios from "axios";

export default () => {
  return axios.create({
    baseURL: "https://avl-frontend-exam.herokuapp.com/api/",
  });
};
