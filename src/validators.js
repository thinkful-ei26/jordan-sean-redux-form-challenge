// Validation Requirements:
// Contains a value
// The value is non-empty
// The value is be exactly 5 characters long
// Each character is a number

let empty = '';

export const containsValue = value => value ? undefined : 'Must contain a value';
export const nonEmpty = value => value.trim() === empty ? 'The value must not be empty' : undefined;
export const fiveCharacters = value => value.length === 5 ? undefined : 'The value must be 5 characters long';
export const numbers = value => isNaN(Number(value)) ? 'Each character must be a number' : undefined;



// bool expression ? operation if true : operation if false