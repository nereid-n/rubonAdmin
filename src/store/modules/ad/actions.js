import Vue from "vue";

export default {
  'AD': async (context, params) => {
    if(params.data === undefined) {
      params.data = {};
    }
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.data.expand = 'adsImgs,adsFieldsValues,city,region,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}items/${params.id}`, {params: params.data})
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
  'AD_UPDATE_LIST': async (context, params) => {
    if(params.data === undefined) {
      params.data = {};
    }
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.data.expand = 'days,adsImgs,adsFieldsValues,city,region,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}items/${params.id}`, {params: params.data})
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
    params.data.limit = 10;
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.data.expand = 'days,adsImgs,adsFieldsValues,city,region,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}items/index`, {params: params.data})
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
  'AD_CREATE': async (context, params) => {
    params.append('api_key', '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e');
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}items/create-new`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
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
  'AD_UPDATE': async (context, params) => {
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}items/update-new`, params)
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
  'AD_UPDATE_AD': async (context, params) => {
    params.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}items/refresh`, params)
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
  'AD_FAVOURITE': async (context, params) => {
    params.data.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    params.data.expand = 'adsImgs,adsFieldsValues,categoryAds';
    return await Vue.http.get(`${process.env.VUE_APP_API_URL}favourite/get-favourites`, {params: params.data})
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
  'AD_DELETE': async (context, params) => {
    params.api_key = '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e';
    return await Vue.http.post(`${process.env.VUE_APP_API_URL}favourite/del-favourites`, {params: params})
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
