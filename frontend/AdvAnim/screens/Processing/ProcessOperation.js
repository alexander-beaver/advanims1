/**
 * Prepare the data to be transported to the API
 * @param a
 * @returns {*}
 */
function convertBase64ToEncodableFormat(a){
    const slashRegex = /(\/)+/g;
    const plusRegex = /(\+)+/g;

    a = a.replace(slashRegex, "_");
    a = a.replace(plusRegex, "-");
    return a;

}

/**
 * Convert a transported format to the raw base64
 * @param a
 * @returns {*}
 */
function convertEncodableFormatToBase64(a){
    const underscoreRegex = /(_)+/g;
    const dashRegex = /(-)+/g;
    a = a.replace(underscoreRegex, "/");
    a = a.replace(dashRegex, "+");
    return a;
}