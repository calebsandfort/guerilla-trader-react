import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' ? "http://ec2-34-214-87-86.us-west-2.compute.amazonaws.com/api/" : "http://localhost:3001/api/";
const GUERILLA_TRADER_MVC_BASE_URL = process.env.NODE_ENV === 'production' ? "http://trader.calebinthecloud.com/api/services/app/"
  : "http://dev-csandfort.gwi.com/GuerillaTrader.Web/api/services/app/";

class ServiceBase {
  static api() {
    const adapter = axios.create({
      baseURL: API_BASE_URL
    });

    return adapter;
  }

  static guerillaTraderMvcApi() {
    const adapter = axios.create({
      baseURL: GUERILLA_TRADER_MVC_BASE_URL
    });

    return adapter;
  }
}

export default ServiceBase;

