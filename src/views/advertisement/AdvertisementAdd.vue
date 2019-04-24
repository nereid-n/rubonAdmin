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
    <p v-if="error" class="red--text">Ошибка!</p>
    <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
  </v-form>
  <Loader v-else/>
</template>
<script>
  import dataFormCreate from '../../data/mainFormCreate';
  import dataFormUpdate from '../../data/mainFormUpdate';
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
  import Loader from "../../components/Loader";

  export default {
    name: "AdAdd",
    components: {
      Loader,
      InputSelect,
      InputUpload, InputCategory, InputAutocomplete, InputCheckbox, InputPhone, InputTextarea, InputText},
    data() {
      return {
        value: {},
        dataFields: [],
        getDataDone: false,
        error: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll()
          .then(answer => {
            if (answer) {
              let formData = new FormData();
              let pictures = [];
              let fileIndex = 0;
              for (let key in this.value) {
                if (key === 'file[]') {
                  for (let j in this.value[key]) {
                    if (typeof this.value[key][j] === 'string') {
                      for (let imgIndex = 0; imgIndex < this.value.images.length; imgIndex++) {
                        if (this.value.images[imgIndex].img === this.value[key][j]) {
                          pictures.push(this.value.images[imgIndex]);
                        }
                      }
                    }
                    else {
                      formData.append('files' + fileIndex, this.value[key][j]);
                      fileIndex++;
                    }
                  }
                }
                else {
                  formData.append(key, this.value[key]);
                }
              }
              if (pictures.length > 0) {
                formData.append('pictures', JSON.stringify(pictures));
              }
              else {
                formData.append('pictures', null);
              }
              formData.delete('images');
              store.dispatch(`ad/AD_${this.$route.meta.action}`, formData)
                .then(res => {
                  console.log(res);
                  if (res.ok) {
                    this.$router.push({name: 'ad', params: {id: res.body.id}});
                  }
                  else {
                    this.error = true;
                  }
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
        if (this.$route.meta.action === 'UPDATE') {
          Object.assign(this.dataFields, dataFormUpdate);
        } else {
          Object.assign(this.dataFields, dataFormCreate);
        }
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
              console.log(res);
              for (let key in res.body) {
                if (key !== 'adsFieldsValues' && key !== 'adsImgs') {
                  this.value[`Ads[${key}]`] = res.body[key];
                }
              }
              this.value['file[]'] = [];
              this.value.images = [];
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
                this.value.images.push({img: value.img, img_thumb: value.img_thumb});
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
          this.$nextTick(function () {
            this.getDataDone = true;
          })
        }
        if (this.$route.meta.action === 'UPDATE') {
          for (let i = 0; i < this.dataFields.length; i++) {
            if (this.dataFields[i].data.name === 'Ads[category_id]') {
              this.dataFields.splice(i, 1);
              break;
            }
          }
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