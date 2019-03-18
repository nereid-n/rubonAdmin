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
      };
      store.dispatch('ad/AD', apiData)
        .then(res => {
          console.log(res)
          store.dispatch('category/CATEGORY_NAME', {id: res.body.category_id})
            .then(resCategory => {
              res.body.category_id = resCategory.body.name;
              res.body.city_id = res.body.region.name + ' / ' + res.body.city.name;
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
                  let created = new Date(res.body.dt_add * 1000);
                  created = created.toLocaleString();
                  let updated = new Date(res.body.dt_update * 1000);
                  updated = updated.toLocaleString();
                  this.items.push(
                    {
                      name: 'Добавлено',
                      value: created
                    },
                    {
                      name: 'Обновлено',
                      value: updated
                    },
                    {
                      name: 'Просмотры',
                      value: res.body.views
                    }
                  );
                });
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