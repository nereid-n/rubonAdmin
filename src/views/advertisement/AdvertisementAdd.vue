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
  import dataForm from '../../data/mainForm';
  import InputText from "../../components/form/InputText";
  import InputTextarea from "../../components/form/InputTextarea";
  import InputPhone from "../../components/form/InputPhone";
  import InputCheckbox from "../../components/form/InputCheckbox";
  import InputAutocomplete from "../../components/form/InputAutocomplete";
  import InputCategory from "../../components/form/InputCategory";
  import InputUpload from "../../components/form/InputUpload";
  import InputSelect from "../../components/form/InputSelect";
  import store from '../../store/store';
  import addFieldsMixin from '../../mixins/addFieldsMixin';

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
        this.$validator.validateAll()
          .then(answer => {
            if (answer) {
              store.dispatch(`ad/AD_${this.$route.meta.action}`, this.value)
                .then(res => {
                  console.log(res);
                });
            }
          });
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
              if (this.dataFields[i].data.name === 'Ads[city_id]') {
                this.dataFields[i].data.items = cities;
                break;
              }
            }
          });
        if (this.$route.meta.action === 'UPDATE') {
          let apiData = {
            id: this.$route.params.id
          };
          store.dispatch('ad/AD', apiData)
            .then(res => {
              for (let key in res.body) {
                if (key !== 'adsFieldsValues' && key !== 'adsImgs') {
                  this.value[`Ads[${key}]`] = res.body[key];
                }
              }
              this.value['file[]'] = [];
              this.value['Ads[phone]'] = this.value['Ads[phone]'].replace(/\D+/g,"");
              this.getDataDone = true;
              for (let value of res.body.adsFieldsValues) {
                if (value.value_id !== null) {
                  this.value[`AdsField[${value.ads_fields_name}]`] = value.value_id;
                }
                else {
                  this.value[`AdsField[${value.ads_fields_name}]`] = value.value;
                }
              }
              for (let value of res.body.adsImgs) {
                this.value['file[]'].push(value.img);
              }
              store.dispatch('category/ADD_FIELD', {id: this.value['Ads[category_id]']})
                .then(res => {
                  for (let i = 0; i < res.body.length; i++) {
                    res.body[i][0].name = `AdsField[${res.body[i][0].name}]`;
                  }
                  this.addFields(this.dataFields, res.body, 'Ads[category_id]');
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