import Vue from "vue";

export default {
  'AD': async (context, params) => {
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
  // 'AD_LIST': async (context, params) => {
  //   return await Vue.http.get(`${process.env.VUE_APP_API_URL}category/${params.id}`, {params: params.data})
  //     .then(
  //       res => {
  //         return res;
  //       },
  //       err => {
  //         return err;
  //       }
  //     )
  //     .catch(err => console.error(`catch, ${err}`));
  // },
};
