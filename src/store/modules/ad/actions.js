import Vue from "vue";

export default {
  'AD': async (context, params) => {
    params.data = {};
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.data.expand = 'adsImgs,adsFieldsValues,city,region,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}ads/${params.id}`, {params: params.data})
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
  'AD_LIST': async (context, params) => {
    params.limit = 10;
    params.user = 'apuc06@mail.ru';
    params.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.expand = 'adsImgs,adsFieldsValues,city,region,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}ads/index`, {params: params})
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
