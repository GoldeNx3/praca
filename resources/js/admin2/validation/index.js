import { ValidationProvider, extend, configure } from 'vee-validate';
import { alpha, ext, between, required, min, max, digits, dimensions, numeric, required_if, oneOf, email, confirmed } from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Pole {_field_} jest wymagane',
});

extend('min', {
    ...min,
    message: 'Pole {_field_} minimalnie musi mieć {length} znaków',
});

extend('max', {
    ...max,
    message: 'Pole {_field_} maksymalnie może mieć {length} znaków',
});

extend('ext', {
    ...ext,
    message: 'Pole {_field_} ma nieprawidłowe rozszerzenie. Dozwolone (_ext_).',
});

extend('email', {
    ...email,
    message: 'Pole {_field_} jest nieprawidłowym adresem e-mail',
});

extend('confirmed', {
    ...confirmed,
    message: 'Hasła nie są ze sobą zgodne',
});

extend('between', between);
extend('between', {params: ['min', 'max'], message: 'Pole musi mieć wartość od {min} do {max}'});

extend('oneOf', oneOf);
extend('oneOf', {message: 'Pole ma nieprawidłową wartość'});

extend('numeric', numeric);
extend('numeric', {message: 'Pole może mieć wartość tylko numeryczną'});

extend('alpha', alpha);
extend('digits', digits);
extend('dimensions', dimensions);
extend('required_if', required_if);

export default {
    name: 'validation',
    components: {
        ValidationProvider
    },
    mounted() {
        localize('ar', ar);
    }
}
