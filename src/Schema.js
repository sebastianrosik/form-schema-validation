import get from 'lodash/get';

import { getValidatorForType } from './validators';
import Property from './Property';

const getValidatorsForType = (type) => {
    if (!Array.isArray(type)) {
        return [getValidatorForType(type)];
    }
    return type.map(singleType => getValidatorForType(singleType));
};

export default class Schema {
    constructor(schema) {
        this.schema = schema;
    }

    validate(model) {
        const keys = Object.keys(model);

        const properties = keys.map((key) => {
            const value = get(model, key);
            const type = get(this.schema, `['${key}'].type`);
            const validators = getValidatorsForType(type);
            return new Property({
                value,
                type,
                validators,
            });
        });

        return properties
            .filter(property => property.hasAnyValidators())
            .filter(property => !property.validate())
            .map(property => property.errorMessage);
    }
}
