/**
 * Converts various values to boolean.
 * 
 * @param {*} value - The value to convert to boolean
 * @returns {boolean} - The boolean representation of the value
 */
function boolean(value) {
    switch (Object.prototype.toString.call(value)) {
        case '[object String]':
            return ['true', 't', 'yes', 'y', 'on', '1'].includes(value.trim().toLowerCase());
        case '[object Number]':
            return value.valueOf() === 1;
        case '[object Boolean]':
            return value.valueOf();
        default:
            return false;
    }
}

/**
 * Checks if a value can be considered boolean-like.
 * 
 * @param {*} value - The value to check
 * @returns {boolean} - True if the value is boolean-like
 */
function isBooleanable(value) {
    switch (Object.prototype.toString.call(value)) {
        case '[object String]':
            return [
                'true', 't', 'yes', 'y', 'on', '1',
                'false', 'f', 'no', 'n', 'off', '0'
            ].includes(value.trim().toLowerCase());
        case '[object Number]':
            return [0, 1].includes(value.valueOf());
        case '[object Boolean]':
            return true;
        default:
            return false;
    }
}

module.exports = { boolean, isBooleanable };
exports.boolean = boolean;
exports.isBooleanable = isBooleanable;
