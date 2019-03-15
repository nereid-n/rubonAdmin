export default {
  methods: {
    addFields(obj, fields, name) {
      let position = 0;
      for (let key = 0; key < obj.length; key++) {
        if (obj[key].data.name === name) {
          position = key + 1;
        }
        if (obj[key].hasOwnProperty('addField') && obj[key].addField === name) {
          obj.splice(key, 1);
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
        obj.splice(position, 0, newValue);
        position++;
      }
    },
  }
}