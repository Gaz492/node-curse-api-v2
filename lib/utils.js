/*
* Created By Gareth on 27/05/2018 23:25 using WebStorm
* Project: node-curse-api-wrapper file utils
* Licence:
* */


const request = require('request-promise-native');

/**
 *
 * @param {Object} item
 * @returns {*|boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 *
 * @param {Object} target
 * @param {Object} sources
 * @returns {Object}
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, {[key]: {}});
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, {[key]: source[key]});
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 *
 * @param {String} url
 * @param {Object} options
 */
function getRequest(url, options) {
    const reqOptions = mergeDeep({
        method: 'GET',
        uri: url,
        headers: {
            'User-Agent': 'node-curseAPI-wrapper',
        },
        simple: false,
        resolveWithFullResponse: true,
    }, options);

    return new Promise((resolve, reject) => {
        request(reqOptions)
            .then((response) => {
                resolve(response);
            })
            .catch((respErr) => {
                reject(respErr);
            });
    });
}

/**
 *
 * @param {String} url
 * @param {Object} options
 */
function postRequest(url, options) {
    const reqOptions = mergeDeep({
        method: 'POST',
        uri: url,
        headers: {
            'User-Agent': 'node-curseAPI-wrapper',
        },
        simple: false,
        resolveWithFullResponse: true,
    }, options);

    return new Promise((resolve, reject) => {
        request(reqOptions)
            .then((response) => {
                resolve(response);
            })
            .catch((respErr) => {
                reject(respErr);
            });
    });
}

module.exports = {
    mergeDeep,
    getRequest,
    postRequest,
};
