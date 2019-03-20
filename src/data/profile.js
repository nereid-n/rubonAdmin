export default [
  {
    component: 'InputText',
    rules: {
      max: 255
    },
    data: {
      name: 'name',
      label: 'Имя',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      email: true
    },
    data: {
      name: 'public_email',
      label: 'Публичный email',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      url: true
    },
    data: {
      name: 'website',
      label: 'Вебсайт',
      hint: ''
    }
  },
  {
    component: 'InputUpload',
    rules: {
      image: true
    },
    data: {
      name: 'avatar',
      label: 'Аватар',
      multiple: false
    }
  },
]