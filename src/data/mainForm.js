export default [
  {
    component: 'InputText',
    rules: {
      required: true,
      max: 255
    },
    data: {
      name: 'title',
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
      name: 'category',
      label: 'Категория',
      hint: '',
      body: 'CategoryModal'
    }
  },
  {
    component: 'InputTextarea',
    rules: {
      required: true,
      max: 1000
    },
    data: {
      name: 'description',
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
      name: 'price',
      label: 'Цена',
      hint: 'Пожалуйста, укажите цену. <b>Обратите внимание, что указание нереальной или условной цены (1 руб., 111 руб.) запрещено.</b></br><b>Внимание, цена указывается в российских рублях</b>'
    }
  },
  {
    component: 'InputUpload',
    rules: {
      image: true
    },
    data: {
      name: 'photos',
      label: 'Фотографии',
    }
  },
  {
    component: 'InputAutocomplete',
    rules: {
      required: true
    },
    data: {
      name: 'city',
      label: 'Город',
      hint: 'Выберите город из списка',
      items: ['one', 'two', 'three']
    }
  },
  {
    component: 'InputText',
    rules: {
      required: true,
      alpha: true
    },
    data: {
      name: 'name',
      label: 'Имя',
      hint: 'Как к Вам обращаться?'
    }
  },
  {
    component: 'InputPhone',
    rules: {
      required: true,
      min: 19
    },
    data: {
      name: 'phone',
      label: 'Телефон',
      hint: 'Как с Вами связаться?'
    }
  },
  {
    component: 'InputText',
    rules: {
      required: true,
      email: true
    },
    data: {
      name: 'email',
      label: 'Email',
      hint: 'Вы можете указать публичный емейл в личном кабинете'
    }
  },
  {
    component: 'InputCheckbox',
    rules: {
      required: true,
      is: true
    },
    data: {
      name: 'agreed',
      label: '* Я соглашаюсь с правилами использования сервиса, а также с передачей и обработкой моих данных на RUB-ON. Я подтверждаю своё совершеннолетие и ответственность за размещение объявления',
      hint: ''
    }
  },
]