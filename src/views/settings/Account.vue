<template>
  <v-form v-if="getDataDone">
    <component v-for="input in accountData"
               :is="input.component"
               :key="input.data.name"
               :data="input.data"
               :data-vv-name="input.data.name"
               :error="errors.first(input.data.name)"
               v-model="value[input.data.name]"
               v-validate="input.rules"
    />
    <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
  </v-form>
</template>

<script>
  import account from '../../data/account';
  import InputText from "../../components/form/InputText";
  import store from '../../store/store';

  export default {
    name: "Account",
    components: {InputText},
    data() {
      return {
        accountData: {},
        value: {},
        getDataDone: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll()
          .then(answer => {
            if (answer) {
              store.dispatch('user/USER_UPDATE', this.value)
                .then(res => {
                  console.log(res);
                });
            }
          });
      },
    },
    created() {
      this.accountData = account;
      let params = {};
      store.dispatch('user/USER', params)
        .then(res => {
          for (let key in res.body) {
            this.value[`settings-form[${key}]`] = res.body[key];
          }
          this.getDataDone = true;
        });
    }
  }
</script>

<style scoped>

</style>