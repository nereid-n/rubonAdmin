<template>
  <v-form v-if="getDataDone">
    <component v-for="input in dataFields"
               :is="input.component"
               :key="input.data.name"
               :data="input.data"
               :data-vv-name="input.data.name"
               :error="errors.first(input.data.name)"
               v-model="value[input.data.name]"
               v-validate="input.rules"
               @addFields="onAddFields"
    />
    <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
  </v-form>
</template>

<script>
  import dataForm from '../data/mainForm';
  import InputText from "../components/form/InputText";
  import InputTextarea from "../components/form/InputTextarea";
  import InputPhone from "../components/form/InputPhone";
  import InputCheckbox from "../components/form/InputCheckbox";
  import InputAutocomplete from "../components/form/InputAutocomplete";
  import InputCategory from "../components/form/InputCategory";
  import InputUpload from "../components/form/InputUpload";
  import InputSelect from "../components/form/InputSelect";
  import store from '../store/store';
  import addFieldsMixin from '../mixins/addFieldsMixin';

  export default {
    name: "AdAdd",
    components: {
      InputSelect,
      InputUpload, InputCategory, InputAutocomplete, InputCheckbox, InputPhone, InputTextarea, InputText},
    data() {
      return {
        value: {},
        dataFields: [],
        getDataDone: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll();
      },
      onAddFields(fields, name) {
        this.addFields(this.dataFields, fields, name);
      },
      getData() {
        this.value = {};
        this.dataFields = [];
        this.getDataDone = false;
        this.dataFields = dataForm;
        store.dispatch('city/CITY_LIST')
          .then(res => {
            let cities = [];
            for (let i in res.body) {
              cities.push({header: i});
              for (let j in res.body[i]) {
                cities.push({id: j, value: res.body[i][j]});
              }
            }
            for (let i = 0; i < this.dataFields.length; i++) {
              if (this.dataFields[i].data.name === 'city_id') {
                this.dataFields[i].data.items = cities;
                break;
              }
            }
          });
        if (this.$route.meta.action === 'UPDATE') {
          let apiData = {
            id: this.$route.params.id,
            data: {
              api_key: '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e',
              expand: 'adsImgs,adsFieldsValues'
            }
          };
          store.dispatch('ad/AD', apiData)
            .then(res => {
              this.value = res.body;
              this.value.photos = [];
              this.value.phone = this.value.phone.replace(/\D+/g,"");
              this.getDataDone = true;
              for (let value of this.value.adsFieldsValues) {
                if (value.value_id !== null) {
                  this.value[value.ads_fields_name] = value.value_id;
                }
                else {
                  this.value[value.ads_fields_name] = value.value;
                }
              }
              for (let value of this.value.adsImgs) {
                this.value.photos.push(value.img);
              }
              store.dispatch('category/ADD_FIELD', {id: this.value.category_id})
                .then(res => {
                  this.addFields(this.dataFields, res.body, 'category_id');
                });
            });
        }
        else {
          setTimeout(() => {
            this.getDataDone = true;
          }, 10);
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getData();
      });
    },
    mixins: [addFieldsMixin]
  }
</script>

<style scoped>

</style>