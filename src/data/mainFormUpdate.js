export default [
  {
    component: 'InputText',
    rules: {
      required: true,
      max: 255
    },
    data: {
      name: 'Ads[title]',
      label: 'Заголовок',
      hint: '<b>Введите наименование товара, объекта или услуги.</b><br>В заголовке <b>не допускается: номер телефона, электронный адрес, ссылки</b><br>Не допускаются заглавные буквы (кроме аббревиатур).'
    }
  },
  {
    component: 'InputCategory',
    rules: {
      required: true,
      max: 1000
    },
    data: {
      name: 'Ads[category_id]',
      label: 'Категория',
      hint: ''
    }
  },
  {
    component: 'InputTextarea',
    rules: {
      required: true,
      max: 1000
    },
    data: {
      name: 'Ads[content]',
      label: 'Описание',
      hint: '<b>Добавьте описание вашего товара/услуги,</b> укажите преимущества и важные детали.<br>В описании <b>не допускается указание контактных данных.</b><br>Описание должно соответствовать заголовку и предлагаемому товару/услуге.<br>Не допускаются заглавные буквы (кроме аббревиатур).'
    }
  },
  {
    component: 'InputText',
    rules: {
      required: true,
      numeric: true
    },
    data: {
      name: 'Ads[price]',
      label: 'Цена',
      hint: 'Пожалуйста, укажите цену. <b>Обратите внимание, что указание нереальной или условной цены (1 руб., 111 руб.) запрещено.</b></br><b>Внимание, цена указывается в российских рублях</b>'
    }
  },
  {
    component: 'InputUpload',
    data: {
      name: 'file[]',
      label: 'Фотографии',
      multiple: true
    }
  }
]