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
        getDataDone: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll()
          .then(answer => {
            if (answer) {
	            let formData = new FormData();
              this.value.avatar = this.value.avatar[0];
              for (let key in this.value) {
                formData.append(key, this.value[key]);
              }
              store.dispatch('user/USER_UPDATE', formData)
                .then(res => {
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
      store.dispatch('user/USER', params)
        .then(res => {
          for (let key in res.body.profile) {
            if (key !== 'avatar') {
              this.value[`Profile[${key}]`] = res.body.profile[key];
            }
            else {
              if (res.body.profile[key]  !== null) {
                this.value[key] = ['https://rub-on.ru/' + res.body.profile[key]];
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
