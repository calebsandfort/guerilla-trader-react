import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "http://ec2-34-214-87-86.us-west-2.compute.amazonaws.com/api/" : "http://localhost:3001/api/";

class ServiceBase {
  static api() {
    const adapter = axios.create({
      baseURL: API_BASE_URL
    });

    return adapter;
  }
}

export default ServiceBase;

