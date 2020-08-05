import Axios from "axios";

const JobsGoWhereApiClient = Axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default JobsGoWhereApiClient;
