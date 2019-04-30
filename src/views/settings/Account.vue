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
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card class="pt-1">
        <v-card-title class="headline justify-center text-xs-center pb-0 pt-3">Сохранено успешно!</v-card-title>
        <v-card-actions class="justify-center pb-4">
          <v-btn color="blue white--text" @click="dialog = false">ОК</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-form>
  <Loader v-else/>
</template>

<script>
  import account from '../../data/account';
  import InputText from "../../components/form/InputText";
  import store from '../../store/store';
  import Loader from "../../components/Loader";

  export default {
    name: "Account",
    components: {Loader, InputText},
    data() {
      return {
        accountData: {},
        value: {},
        getDataDone: false,
        dialog: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll()
          .then(answer => {
            if (answer) {
              store.dispatch('user/AC_UPDATE', this.value)
                .then(res => {
                  this.dialog = true;
                });
            }
          });
      },
    },
    created() {
      this.accountData = account;
      let params = {};
      store.dispatch('user/USER_ME', params)
        .then(res => {
          for (let key in res.body.user) {
            this.value[`settings-form[${key}]`] = res.body.user[key];
          }
          this.getDataDone = true;
        });
    }
  }
</script>

<style scoped>

</style>
