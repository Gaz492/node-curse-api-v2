/* eslint-disable prefer-promise-reject-errors */
/*
* Created By Gareth on 25/05/2018 12:34 using WebStorm
* Project: node-curse-api-wrapper file index
* Licence:
* */

const EventEmitter = require('events');
const utils = require('./utils');

const LOGIN_URL = 'https://logins-v1.curseapp.net';
const API_URL = 'https://addons-v2.forgesvc.net';

/**
 * @class
 */

class CurseAPI extends EventEmitter {
    /**
     * Curse API Constructor
     * @constructor
     * @param {Object} options
     * @param {String} options.username
     * @param {String} options.password
     * @param {String} [options.loginMethod] - Does nothing right now
     */
    constructor(options) {
        super();
        if (!options || typeof options !== 'object') throw new Error('An Object is required to create the Curse api client.');

        this.username = options.username;
        this.password = options.password;
        this.loginMethod = options.loginMethod || 'curse';
        this.authToken = '';
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    Authenticate() {
        utils.postRequest(`${LOGIN_URL}/login`, {json: {Username: this.username, Password: this.password}})
            .then((authResp) => {
                if (authResp.statusCode === 200) {
                    this.setAuthToken(authResp.body.Session.Token);
                    this.emit('authenticated');
                } else {
                    console.log(authResp.body);
                }
            })
            .catch((authErr) => {
                console.log(authErr);
            });
    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddon(addonId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/${addonId}`, {headers: {AuthenticationToken: this.authToken}})
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number[]} addonIds
     * @constructor
     */
    GetAddons(addonIds) {
        console.log('Not Implemented');
    }

    /**
     * @param {Number} gameId
     * @param {Number} sectionId
     * @param {Number} categoryId
     * @param {String} gameVersion
     * @param {Number} index
     * @param {Number} pageSize
     * @param {*} sort
     * @param {Boolean} isSortDescending
     * @param {String} searchFilter
     * @constructor
     */
    GetAddonsByCriteria(gameId, sectionId, categoryId, gameVersion, index, pageSize, sort, isSortDescending, searchFilter) {

    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddonDescription(addonId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/${addonId}/description`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonChangelog(addonId, fileId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/${addonId}/file/${fileId}/changelog`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonFile(addonId, fileId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/${addonId}/file/${fileId}`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddonFiles(addonId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/${addonId}/files`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {String} gameSlug
     * @param {String} addonSlug
     * @constructor
     */
    GetRepositoryMatchFromSlug(gameSlug, addonSlug) {

    }

    /**
     *
     * @param {Number} gameId
     * @param {Number} featuredCount
     * @param {Number} popularCount
     * @param {Number} updatedCount
     * @param {Number[]} addonIds
     * @constructor
     */
    GetFeaturedAddons(gameId, featuredCount, popularCount, updatedCount, addonIds) {

    }

    /**
     *
     * @constructor
     */
    GetAddonsDatabaseTimestamp() {

    }

    /**
     *
     * @param {String} key
     * @constructor
     */
    GetModloader(key) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/modloader/${key}`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     *
     * @constructor
     */
    GetModloaders() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/modloader`, { headers: { AuthenticationToken: this.authToken } })
                .then((resp) => {
                    if (resp.statusCode === 200) {
                        resolve(resp.body);
                    } else {
                        reject(`Status Code Error: ${resp.statusCode}`);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     *
     * @param {String} gameVersion
     * @constructor
     */
    GetModloadersForGameVersion(gameVersion) {

    }

    /**
     *
     * @constructor
     */
    GetModloadersDatabaseTimestamp() {

    }

    /**
     *
     * @constructor
     */
    GetMinecraftVersions() {

    }

    /**
     *
     * @param {String} gameVersion
     * @constructor
     */
    GetMinecraftVersion(gameVersion) {

    }

    /**
     *
     * @constructor
     */
    GetMinecraftVersionsDatabaseTimestamp() {

    }

    /**
     *
     * @param {Number} gameId
     * @constructor
     */
    GetGame(gameId) {

    }

    /**
     *
     * @param {Boolean} [supportsAddons]
     * @constructor
     */
    GetGames(supportsAddons) {

    }

    /**
     *
     * @constructor
     */
    GetGameDatabaseTimestamp() {

    }

    /**
     *
     * @param {Number} categoryId
     * @constructor
     */
    GetCategoryByID(categoryId) {

    }

    /**
     *
     * @param {String} slug
     * @constructor
     */
    GetCategoryBySlug(slug) {

    }

    /**
     *
     * @constructor
     */
    GetCategories() {

    }

    /**
     *
     * @constructor
     */
    GetCategoryDatabaseTimestamp() {

    }

    /**
     *
     * @param {Number} sectionId
     * @constructor
     */
    GetCategoriesBySection(sectionId) {

    }
}

module.exports = CurseAPI;
