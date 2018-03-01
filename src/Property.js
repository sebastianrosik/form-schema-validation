const NO_ERROR_MESSAGE = '';
const NOT_IMPLEMENTED = 'not-implemented';

const combineBooleans = (combinedResult, singleResult) => singleResult && combinedResult;

export default class Property {
    static createError(value) {
        return `${NOT_IMPLEMENTED}: ${value}`;
    }

    static validateMultipleValues(values, validators) {
        const validationsResults = values.map(value =>
            Property.validateSingleValue(value, validators));
        return validationsResults.reduce(combineBooleans, true);
    }

    static validateSingleValue(value, validators) {
        const isValid = validators[0](value);
        return isValid;
    }

    constructor({ value, type, validators }) {
        this.value = value;
        this.type = type;
        this.validators = validators;
        this.error = false;
        this.errorMessage = NO_ERROR_MESSAGE;
    }

    hasMultipleValues() {
        return Array.isArray(this.value);
    }

    validate() {
        const validator = this.hasMultipleValues() ?
            Property.validateMultipleValues :
            Property.validateSingleValue;

        const isValid = validator(this.value, this.validators);

        if (!isValid) {
            this.errorMessage = Property.createError(this.value);
            this.error = isValid;
        }

        return isValid;
    }

    hasAnyValidators() {
        return this.validators.length !== 0;
    }
}
