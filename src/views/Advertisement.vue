<template>
  <v-data-table hide-actions
                hide-headers
                :items="items"
  >
    <template v-slot:items="props">
      <td v-html="props.item.name" class="first-td"></td>
      <td v-html="props.item.value"></td>
    </template>
  </v-data-table>
</template>

<script>
  import store from '../store/store';
  import formData from '../data/mainForm';
  import addFieldsMixin from '../mixins/addFieldsMixin';

  export default {
    name: "Advertisement",
    data() {
      return {
        items: [],
        dataFields: []
      }
    },
    created() {
      let apiData = {
        id: this.$route.params.id,
        data: {
          api_key: '$2y$13$ZqWntDlaRGERxLUxNZbRXOy549OmSc2C3o9ehreZejXBScFbfqN5e',
          expand: 'adsImgs,adsFieldsValues'
        }
      };
      store.dispatch('ad/AD', apiData)
        .then(res => {
          store.dispatch('category/CATEGORY_NAME', {id: res.body.category_id})
            .then(resCategory => {
              res.body.category_id = resCategory.body.name;
            });
          store.dispatch('city/CITY_NAME', {id: res.body.city_id})
            .then(resCity => {
              res.body.city_id = resCity.body.name;
            });
          store.dispatch('category/ADD_FIELD', {id: res.body.category_id})
            .then(resAddField => {
              this.addFields(formData, resAddField.body, 'category_id');
              for (let i = 0; i < formData.length; i++) {
                let label = formData[i].data.label;
                let name = formData[i].data.name;
                let value = '';
                if (res.body[name] !== undefined) {
                  value = res.body[name];
                }
                else {
                  if (name === 'photos') {
                    value = '<div class="table-img-wrap">'
                    for (let valueImg of res.body.adsImgs) {
                      value += `<div class="table-img"><img src="${valueImg.img}"></div>`;
                    }
                    value += '</div>';
                  }
                  else {
                    for (let valueField of res.body.adsFieldsValues) {
                      if (valueField.ads_fields_name === name) {
                        value = valueField.value;
                        break;
                      }
                    }
                  }
                }
                if (formData[i].data.name === 'agreed') {
                  continue;
                }
                this.items.push({
                  name: label,
                  value: value
                });
              }
            });
        })
    },
    mixins: [addFieldsMixin]
  }
</script>

<style lang="scss">
  table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
    padding: 10px 24px;
  }
  .first-td {
    width: 200px;
  }
  .table-img {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 250px;
    height: 190px;
    margin: 10px;
    border: 1px solid rgba(0,0,0,0.12);
    &-wrap {
      margin: -10px;
    }
    img {
      max-width: 80%;
      max-height: 80%;
    }
  }
</style>