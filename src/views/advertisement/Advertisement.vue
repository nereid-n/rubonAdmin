<template>
  <v-data-table v-if="load"
                hide-actions
                hide-headers
                :items="items"
  >
    <template v-slot:items="props">
      <td v-html="props.item.name" class="first-td"></td>
      <td v-html="props.item.value"></td>
    </template>
  </v-data-table>
  <Loader v-else/>
</template>

<script>
  import store from '../../store/store';
  import formData from '../../data/mainFormCreate';
  import addFieldsMixin from '../../mixins/addFieldsMixin';
  import Loader from "../../components/Loader";

  export default {
    name: "Advertisement",
    components: {Loader},
    data() {
      return {
        load: false,
        items: [],
        dataFields: [],
        value: {}
      }
    },
    created() {
      let apiData = {
        id: this.$route.params.id,
      };
      store.dispatch('ad/AD', apiData)
        .then(res => {
          for (let key in res.body) {
            if (key !== 'adsFieldsValues' && key !== 'adsImgs') {
              this.value[`Ads[${key}]`] = res.body[key];
            }
          }
          store.dispatch('category/CATEGORY_NAME', {id: this.value['Ads[category_id]']})
            .then(resCategory => {
              this.value[`Ads[category_id]`] = resCategory.body.name;
              this.value[`Ads[city_id]`] = res.body.region.name + ' / ' + res.body.city.name;
              this.value[`Ads[email]`] = this.$store.state.user.public_email;
              store.dispatch('category/ADD_FIELD', {id: res.body.category_id})
                .then(resAddField => {
                  for (let i = 0; i < resAddField.body.length; i++) {
                    resAddField.body[i][0].name = `AdsField[${resAddField.body[i][0].name}]`;
                  }
                  this.addFields(formData, resAddField.body, 'Ads[category_id]');
                  for (let i = 0; i < formData.length; i++) {
                    let label = formData[i].data.label;
                    let name = formData[i].data.name;
                    let value = '';
                    if (this.value[name] !== undefined) {
                      value = this.value[name];
                    }
                    else {
                      if (name === 'file[]') {
                        value = '<div class="table-img-wrap">'
                        for (let valueImg of res.body.adsImgs) {
                          value += `<div class="table-img"><img src="${valueImg.img}"></div>`;
                        }
                        value += '</div>';
                      }
                      else {
                        for (let valueField of res.body.adsFieldsValues) {
                          if (`AdsField[${valueField.ads_fields_name}]` === name) {
                            value = valueField.value;
                            break;
                          }
                        }
                      }
                    }
                    if (formData[i].data.name === 'Ads[option2]') {
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
                  this.load = true;
                });
            });
        })
    },
    mixins: [addFieldsMixin]
  }
</script>

<style lang="scss">
  table.v-table thead td:not(:nth-child(1)), table.v-table tbody td:not(:nth-child(1)), table.v-table thead th:not(:nth-child(1)), table.v-table tbody th:not(:nth-child(1)), table.v-table thead td:first-child, table.v-table tbody td:first-child, table.v-table thead th:first-child, table.v-table tbody th:first-child {
    padding: 10px 15px;
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