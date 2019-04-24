import Vue from "vue";

export default {
  'USER_ME': async () => {
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}users/me?expand=profile`)
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
  'USER': async (context, params) => {
    params.id = 1;
    if(params.data === undefined) {
      params.data = {};
    }
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}users/${context.state.user.id}`, {params: params.data})
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
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}users/pfupdate`, params)
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
  'AC_UPDATE': async (context, params) => {
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}users/acupdate`, params)
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
