/*
* Created By Gareth on 25/05/2018 12:34 using WebStorm
* Project: node-curse-api-wrapper file index
* Licence:
* */

const utils = require('./utils');

const LOGIN_URL = 'https://logins-v1.curseapp.net';
const API_URL = 'https://addons-v2.forgesvc.net';

/**
 * @class
 */
class CurseAPI {
    /**
     * Curse API Constructor
     * @constructor
     * @param {Object} options
     * @param {String} options.username
     * @param {String} options.password
     * @param {String} [options.loginMethod] - Does nothing right now
     */
    constructor(options) {
        if (!options || typeof options !== 'object') throw new Error('An Object is required to create the Curse api client.');

        this.username = options.username;
        this.password = options.password;
        this.loginMethod = options.loginMethod || 'curse';
    }

    Authenticate() {
        return new Promise((resolve, reject) => {
            utils.postRequest(`${LOGIN_URL}/login`, {json: {Username: this.username, Password: this.password}})
                .then((authResp) => {
                    if (authResp.statusCode === 200) {
                        resolve(authResp);
                    } else {
                        reject(authResp);
                    }
                })
                .catch((authErr) => {
                    reject(authErr);
                });
        });
    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddon(addonId) {

    }

    /**
     * @param {Number[]} addonIds
     * @constructor
     */
    GetAddons(addonIds) {

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

    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonChangelog(addonId, fileId) {

    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonFile(addonId, fileId) {

    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddonFiles(addonId) {

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

    }

    /**
     *
     * @constructor
     */
    GetModloaders() {

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
