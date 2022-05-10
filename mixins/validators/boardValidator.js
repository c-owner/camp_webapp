import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';

const Validator = SimpleVueValidation.Validator;

Vue.use(SimpleVueValidation);

export default {
    data() {
        return {
            title: '',
            content: '',
            intro: [],
        }
    },
    validators: {
        title: function (value) {
            return Validator.value(value)
                .required(this.$t('board_write_sub'));
        },
        content: function (value) {
            return Validator.value(value)
                .required(this.$t('board_write_con'))
                .custom(() => {
                    var newText = value.replace(/(<([^>]+)>)/ig,"")
                    if(newText == "") {
                        return this.$t('board_write_con')
                    }
                });
        },
        intro:  function (value)  {
            return Validator.value(value)
                .custom(() => {
                    if (value.length === 0) {
                        return this.$t('err_input_intro')
                    }
                })
        },
        files: function (value) {
            return Validator.value(value)
                .custom(() => {
                    if (value.length === 0) {
                        return this.$t('err_input_intro')
                    }
                })
        }
    },
}
