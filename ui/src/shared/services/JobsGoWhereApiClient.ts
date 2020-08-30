import Axios from "axios";

const JobsGoWhereApiClient = Axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default JobsGoWhereApiClient;
