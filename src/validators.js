import Schema from './Schema';

export const stringValidator = value => typeof value === 'string';
export const numberValidator = value => typeof value === 'number';
export const booleanValidator = value => typeof value === 'boolean';
export const objectValidator = value => typeof value === 'object' && !Array.isArray(value) && value !== null;
export const dateValidator = value => value instanceof Date;
export const arrayValidator = value => Array.isArray(value);
export const schemaValidator = value => value instanceof Schema;

const validators = new Map();

validators.set(String, stringValidator);
validators.set(Number, numberValidator);
validators.set(Boolean, booleanValidator);
validators.set(Object, objectValidator);
validators.set(Date, dateValidator);
validators.set(Array, arrayValidator);
validators.set(Schema, schemaValidator);

export const getValidatorForType = type => validators.get(type);
