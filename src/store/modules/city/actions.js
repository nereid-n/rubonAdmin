import Vue from "vue";

export default {
  'CITY_LIST': async (context, params) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}city/get-city-list`)
      .then(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
      .catch(err => console.error(`catch, ${err}`));
  },
  'CITY_NAME': async (context, params) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}city/view`, {params: params})
      .then(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
      .catch(err => console.error(`catch, ${err}`));
  },
};
