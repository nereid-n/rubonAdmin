import Vue from "vue";

export default {
  'CATEGORY': async (context, params) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}category`, {params: params})
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
  'CATEGORY_NAME': async (context, params) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}category/view`, {params: params})
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
  'ADD_FIELD': async (context, params) => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}category/ads-fields`, {params: params})
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
