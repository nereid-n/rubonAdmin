<template>
  <v-container grid-list-xl>
    <v-form>
      <component v-for="input in dataFields"
                 :is="input.component"
                 :key="input.data.name"
                 :data="input.data"
                 :data-vv-name="input.data.name"
                 :error="errors.first(input.data.name)"
                 v-model="value[input.data.name]"
                 v-validate="input.rules"
                 @addFields="addFields"
      />
      <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
    </v-form>
  </v-container>
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

  export default {
    name: "Form",
    components: {
      InputSelect,
      InputUpload, InputCategory, InputAutocomplete, InputCheckbox, InputPhone, InputTextarea, InputText},
    data() {
      return {
        value: {},
        dataFields: []
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll();
      },
      addFields(fields, name) {
        let position = 0;
        for (let key = 0; key < this.dataFields.length; key++) {
          if (this.dataFields[key].data.name === name) {
            position = key + 1;
          }
          if (this.dataFields[key].hasOwnProperty('addField') && this.dataFields[key].addField === name) {
            this.dataFields.splice(key, 1);
            key--;
          }
        }
        for (let value of fields) {
          let newValue = {};
          newValue.data = {};
          switch(value[0].type_id) {
            case "1":
              newValue.component = 'InputCheckbox';
              break;
            case "2":
              newValue.component = '';
              break;
            case "3":
              newValue.component = 'InputText';
              break;
            case "4":
              newValue.component = 'InputSelect';
              break;
            default:
              newValue.component = '';
              break;
          }
          newValue.data.name = value[0].name;
          newValue.data.label = value[0].label;
          newValue.data.hint = value[0].hint;
          if (value[0].ads_fields_default_value.length > 0) {
            newValue.data.items = value[0].ads_fields_default_value;
          }
          newValue.addField = name;
          this.dataFields.splice(position, 0, newValue);
          position++;
        }
      }
    },
    created() {
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
            if (this.dataFields[i].data.name === 'city') {
              this.dataFields[i].data.items = cities;
              break;
            }
          }
        });
    }
  }
</script>

<style scoped>

</style>