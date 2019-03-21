import Vue from "vue";

export default {
  'USER': async (context, params) => {
    params.id = 58;
    if(params.data === undefined) {
      params.data = {};
    }
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}users/${params.id}`, {params: params.data})
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
  'USER_UPDATE': async (context, params) => {
    return await Vue.http.post('http://rubon.loc/api/users/update', params)
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
