<template>
  <div>
    <v-btn color="blue white--text" to="/ad/add">Добавить объявление</v-btn>
    <v-data-table hide-actions
                  :items="items"
                  :total-items="totalPages"
                  class="mt-3"
                  :headers="headers"
    >
      <template v-slot:items="props">
        <td class="table-img-preview-wrap">
          <div class="table-img-preview">
            <img :src="props.item.img" alt="">
          </div>
        </td>
        <td v-html="props.item.title" class="first-td"></td>
        <td v-html="props.item.category"></td>
        <td v-html="props.item.price"></td>
        <td v-html="props.item.created"></td>
        <td v-html="props.item.updated"></td>
        <td class="last-td">
          <v-btn :to="`/ad/update/${props.item.id}`" flat icon color="blue" class="ma-0">
            <v-icon>edit</v-icon>
          </v-btn>
          <v-btn :to="`/ad/${props.item.id}`" flat icon color="blue">
            <v-icon>visibility</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination total-visible="10"
                    v-model="page"
                    :length="totalPages"
                    @input="changePage"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
  import store from '../../store/store';

  export default {
    name: "AdvertimentList",
    data() {
      return {
        items: [],
        totalPages: 1,
        page: 1,
        loading: false,
        headers: [
          {
            text: 'Изображение',
            sortable: false
          },
          {
            text: 'Название',
            sortable: false,
          },
          {
            text: 'Категория',
            sortable: false,
          },
          {
            text: 'Цена',
            sortable: false,
          },
          {
            text: 'Добавлено',
            sortable: false,
          },
          {
            text: 'Обновлено',
            sortable: false,
          },
          {
            text: '',
            sortable: false,
          }
        ]
      }
    },
    methods: {
      changePage() {
        this.getDataApi();
      },
      getDataApi() {
        let params = {
          page: this.page
        };
        store.dispatch('ad/AD_LIST', params)
          .then(res => {
            this.items = [];
            this.totalPages = res.body._meta.totalCount;
            for (let value of res.body.ads) {
              let created = new Date(value.dt_add * 1000);
              created = created.toLocaleDateString();
              let updated = new Date(value.dt_update * 1000);
              updated = updated.toLocaleDateString();
              this.items.push({
                img: value.adsImgs[0].img,
                title: value.title,
                category: value.categoryAds.name,
                price: value.price,
                created: created,
                updated: updated,
                id: value.id
              });
            }
          })
      }
    },
    created() {
      this.getDataApi();
    }
  }
</script>

<style lang="scss">
  .v-table {
    min-width: 1075px;
  }
  .v-pagination {
    flex-wrap: wrap;
  }
  .last-td {
    width: 140px;
  }
  .table-img-preview {
    width: 220px;
    height: 160px;
    &-wrap {
      width: 220px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
</style>