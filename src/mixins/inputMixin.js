export default {
  data() {
    return {
      newValue: '',
      showError: false,
      showHint: false
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    error: {
      type: String
    },
    value: {
      default: ''
    }
  },
  methods: {
    blur() {
      this.showHint = false;
      this.$emit('blur', this.newValue);
    },
    focus() {
      this.showHint = true;
    },
    input(e) {
      this.newValue = e;
      this.$emit('input', this.newValue);
    },
  },
  created() {
    this.newValue = this.value;
  }
}