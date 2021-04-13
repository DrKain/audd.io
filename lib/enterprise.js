"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuddEnterprise = void 0;
var fs_1 = require("fs");
var url_1 = require("url");
var base_1 = require("./base");
var FormData = require('form-data');
var AuddEnterprise = /** @class */ (function () {
    function AuddEnterprise(api_key) {
        this.api_token = '';
        this.debug = false;
        this.api_token = api_key;
        base_1.base.api_token = api_key;
    }
    Object.defineProperty(AuddEnterprise.prototype, "host", {
        get: function () {
            return 'https://enterprise.audd.io';
        },
        enumerable: false,
        configurable: true
    });
    AuddEnterprise.prototype.recognize = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = _this.host + (data.params ? '?' + data.params.toString() : '');
            base_1.base.call(url, data)
                .then(function (res) { return resolve(res); })
                .catch(reject);
        });
    };
    AuddEnterprise.prototype.fromURL = function (url, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            _this.recognize({
                params: new url_1.URLSearchParams(__assign({ api_token: _this.api_token, url: url }, extra)),
                method: 'POST'
            }).then(resolve, reject);
        });
    };
    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IResponse
     */
    AuddEnterprise.prototype.fromFile = function (file, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            if (!fs_1.existsSync(file))
                reject('File not found');
            var form = base_1.base.createForm(file, extra);
            _this.recognize({ body: form, method: 'POST' }).then(resolve, reject);
        });
    };
    return AuddEnterprise;
}());
exports.AuddEnterprise = AuddEnterprise;
