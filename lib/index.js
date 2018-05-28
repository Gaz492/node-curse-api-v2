/* eslint-disable prefer-promise-reject-errors */
/*
* Created By Gareth on 25/05/2018 12:34 using WebStorm
* Project: node-curse-api-wrapper file index
* Licence: MIT License

Copyright (c) 2018 Gareth Williams

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
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
        utils.postRequest(`${LOGIN_URL}/login`, { json: { Username: this.username, Password: this.password } })
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
            utils.getRequest(`${API_URL}/api/addon/${addonId}`, { headers: { AuthenticationToken: this.authToken } })
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
        const postBody = {
            addonIds,
        };
        return new Promise((resolve, reject) => {
            utils.postRequest(`${API_URL}/api/addon`, { json: postBody, headers: { AuthenticationToken: this.authToken } })
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
     * @param {Number} gameId
     * @param {Object} [options]
     * @param {Number} [options.sectionId]
     * @param {Number} [options.categoryId]
     * @param {String} [options.gameVersion]
     * @param {Number} [options.index]
     * @param {Number} [options.pageSize]
     * @param {String} [options.sort]
     * @param {Boolean} [options.isSortDescending]
     * @param {String} [options.searchFilter]
     * @constructor
     */
    GetAddonsByCriteria(gameId, options = {}) {
        const queryParams = {
            gameId,
            sectionId: typeof options.sectionId !== 'undefined' ? options.sectionId : '',
            categoryId: typeof options.categoryId !== 'undefined' ? options.categoryId : '',
            gameVersion: typeof options.gameVersion !== 'undefined' ? options.gameVersion : '',
            index: typeof options.index !== 'undefined' ? options.index : 0,
            pageSize: typeof options.pageSize !== 'undefined' ? options.pageSize : 1000,
            sort: typeof options.sort !== 'undefined' ? options.sort : 'LastUpdated',
            isSortDescending: typeof options.isSortDescending !== 'undefined' ? options.isSortDescending : true,
            searchFilter: typeof options.searchFilter !== 'undefined' ? options.searchFilter : '',
        };
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/search?gameId=${queryParams.gameId}&sectionId=${queryParams.sectionId}&categoryId=${queryParams.categoryId}&gameVersion=${queryParams.gameVersion}&index=${queryParams.index}&pageSize=${queryParams.pageSize}&searchFilter=${queryParams.searchFilter}&sort=${queryParams.sort}&sortDescending=${queryParams.isSortDescending}`, { headers: { AuthenticationToken: this.authToken } })
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
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/slug?gameSlug=${gameSlug}&addonSlug=${addonSlug}`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {Number} gameId
     * @param {Object} [options]
     * @param {Number} [options.featuredCount]
     * @param {Number} [options.popularCount]
     * @param {Number} [options.updatedCount]
     * @param {Number[]} [options.addonIds]
     * @constructor
     */
    GetFeaturedAddons(gameId, options = {}) {
        const postBody = {
            gameId,
            featuredCount: typeof options.featuredCount !== 'undefined' ? options.featuredCount : 6,
            popularCount: typeof options.popularCount !== 'undefined' ? options.popularCount : 14,
            updatedCount: typeof options.updatedCount !== 'undefined' ? options.updatedCount : 14,
            addonIds: typeof options.addonIds !== 'undefined' ? options.addonIds : null,
        };
        return new Promise((resolve, reject) => {
            utils.postRequest(`${API_URL}/api/addon/featured`, {
                json: postBody,
                headers: { AuthenticationToken: this.authToken },
            })
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
    GetAddonsDatabaseTimestamp() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/addon/timestamp`, { headers: { AuthenticationToken: this.authToken } })
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
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/modloader/${gameVersion}`, { headers: { AuthenticationToken: this.authToken } })
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
    GetModloadersDatabaseTimestamp() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/modloader/timestamp`, { headers: { AuthenticationToken: this.authToken } })
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
    GetMinecraftVersions() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/version`, { headers: { AuthenticationToken: this.authToken } })
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
    GetMinecraftVersion(gameVersion) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/version/${gameVersion}`, { headers: { AuthenticationToken: this.authToken } })
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
    GetMinecraftVersionsDatabaseTimestamp() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/minecraft/version/timestamp`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {Number} gameId
     * @constructor
     */
    GetGame(gameId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/game/${gameId}`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {Boolean} [supportsAddons]
     * @constructor
     */
    GetGames(supportsAddons) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/game?supportsAddons=${supportsAddons}`, { headers: { AuthenticationToken: this.authToken } })
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
    GetGameDatabaseTimestamp() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/game/timestamp`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {Number} categoryId
     * @constructor
     */
    GetCategoryByID(categoryId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/category/${categoryId}`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {String} slug
     * @constructor
     */
    GetCategoryBySlug(slug) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/category?slug=${slug}`, { headers: { AuthenticationToken: this.authToken } })
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
    GetCategories() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/category`, { headers: { AuthenticationToken: this.authToken } })
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
    GetCategoryDatabaseTimestamp() {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/category/timestamp`, { headers: { AuthenticationToken: this.authToken } })
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
     * @param {Number} sectionId
     * @constructor
     */
    GetCategoriesBySection(sectionId) {
        return new Promise((resolve, reject) => {
            utils.getRequest(`${API_URL}/api/category/section/${sectionId}`, { headers: { AuthenticationToken: this.authToken } })
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
}

module.exports = CurseAPI;
