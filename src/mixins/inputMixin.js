export default {
  data() {
    return {
      value: '',
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
    }
  },
  methods: {
    blur() {
      this.showHint = false;
      this.$emit('blur', this.value);
    },
    focus() {
      this.showHint = true;
    },
    input(e) {
      this.value = e;
      this.$emit('input', this.value);
    }
  }
}