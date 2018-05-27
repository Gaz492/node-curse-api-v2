/*
* Created By Gareth on 25/05/2018 12:34 using WebStorm
* Project: node-curse-api-wrapper file index
* Licence: 
* */

'use strict';

const request = require('request-promise-native');

const LOGIN_URL = "https://logins-v1.curseapp.net";
const API_URL = "https://addons-v2.forgesvc.net";

let AUTH_TOKEN;

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
        if (!options || typeof options !== 'object') throw new Error("An Object is required to create the Curse api client.");

        this.username = options.username;
        this.password = options.password;
        this.loginMethod = options.loginMethod || 'curse';
    }

    Authenticate() {
        return new Promise((resolve, reject) => {
            const reqOptions = {
                method: 'POST',
                uri: LOGIN_URL + '/login',
                headers: {
                    'User-Agent': 'node-curseAPI-wrapper'
                },
                json: {
                    'Username': this.username,
                    'Password': this.password
                },
                simple: false,
                resolveWithFullResponse: true
            };

            request(reqOptions)
                .then((authResp) => {
                    if (authResp.statusCode === 200) {
                        AUTH_TOKEN = authResp.body.Session.Token;
                        resolve('Successfully Authenticated')
                    } else {
                        reject(authResp);
                    }
                })
                .catch((authErr) => {
                    reject(authErr)
                })
        })
    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddon(addonId){

    }

    /**
     * @param {Number[]} addonIds
     * @constructor
     */
    GetAddons(addonIds){

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
    GetAddonsByCriteria(gameId, sectionId, categoryId, gameVersion, index, pageSize, sort, isSortDescending, searchFilter){

    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddonDescription(addonId){

    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonChangelog(addonId, fileId){

    }

    /**
     * @param {Number} addonId
     * @param {Number} fileId
     * @constructor
     */
    GetAddonFile(addonId, fileId){

    }

    /**
     * @param {Number} addonId
     * @constructor
     */
    GetAddonFiles(addonId){

    }

    /**
     * @param {String} gameSlug
     * @param {String} addonSlug
     * @constructor
     */
    GetRepositoryMatchFromSlug(gameSlug, addonSlug){

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
    GetFeaturedAddons(gameId, featuredCount, popularCount, updatedCount, addonIds){

    }

    /**
     *
     * @constructor
     */
    GetAddonsDatabaseTimestamp(){

    }

    /**
     *
     * @constructor
     */
    GetSyncProfile(){

    }

    /**
     *
     * @param {Number} instanceId
     * @param {String} computerName
     * @param {String} instanceGuid
     * @param {String} instanceLabel
     * @constructor
     */
    JoinSyncGroup(instanceId, computerName, instanceGuid, instanceLabel){

    }

    /**
     *
     * @param {Number} instanceId
     * @param {Number} computerId
     * @param {String} instanceGuid
     * @constructor
     */
    LeaveSyncGroup(instanceId, computerId, instanceGuid){

    }
}

module.exports = CurseAPI;