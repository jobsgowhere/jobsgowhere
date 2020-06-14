import Axios from "axios";

const JobsGoWhereClient = Axios.create({
  baseURL: process.env.REACT_APP_API,
});

export default JobsGoWhereClient;
