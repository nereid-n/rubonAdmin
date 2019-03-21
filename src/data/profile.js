export default [
  {
    component: 'InputText',
    rules: {
      max: 255
    },
    data: {
      fullName: 'Profile[name]',
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
      fullName: 'Profile[public_email]',
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
      fullName: 'Profile[website]',
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
      fullName: 'Profile[avatar]',
      label: 'Аватар',
      multiple: false
    }
  },
]