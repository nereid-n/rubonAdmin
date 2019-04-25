<template>
  <v-form v-if="getDataDone">
    <component v-for="input in profileData"
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
  import profile from '../../data/profile';
  import InputText from "../../components/form/InputText";
  import InputUpload from "../../components/form/InputUpload";
  import store from '../../store/store';
  import Loader from "../../components/Loader";

  export default {
    name: "Profile",
    components: {Loader, InputUpload, InputText},
    data() {
      return {
        profileData: {},
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
	            let formData = new FormData();
	            if (this.value.avatar === undefined) {
                this.value.avatar = null;
              }
              else {
                this.value.avatar = this.value.avatar[0];
              }
              for (let key in this.value) {
                formData.append(key, this.value[key]);
              }
              store.dispatch('user/USER_UPDATE', formData)
                .then(res => {
                  if (res.ok) {
                    this.dialog = true;
                  }
                  console.log(res);
                });
            }
          });
      },
    },
    created() {
      this.profileData = profile;
      let params = {
        data: {
          expand: 'profile'
        }
      };
      store.dispatch('user/USER_ME', params)
        .then(res => {
          console.log(res);
          for (let key in res.body.profile) {
            if (key !== 'avatar') {
              this.value[`Profile[${key}]`] = res.body.profile[key];
            }
            else {
              if (res.body.profile[key]  !== null) {
                this.value[key] = [res.body.profile[key]];
              }
            }
          }
          this.getDataDone = true;
        });
    }
  }
</script>

<style scoped>

</style>
