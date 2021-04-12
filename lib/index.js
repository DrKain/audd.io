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
exports.Audd = void 0;
var fs_1 = require("fs");
var url_1 = require("url");
var FormData = require('form-data');
var fetch = require('node-fetch');
var Audd = /** @class */ (function () {
    function Audd(api_token) {
        if (api_token === void 0) { api_token = null; }
        this.api_token = '';
        this.debug = false;
        this.enterprise = false;
        if (api_token)
            this.api_token = api_token;
    }
    Object.defineProperty(Audd.prototype, "host", {
        get: function () {
            return this.enterprise ? 'https://enterprise.audd.io' : 'https://api.audd.io';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Audd.prototype, "uri_recognize", {
        get: function () {
            return this.host;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Audd.prototype, "uri_withoffset", {
        get: function () {
            return this.host + '/recognizeWithOffset';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Logs a message to the console when debugging is enabled
     * @param message Log Message
     */
    Audd.prototype.log = function (message) {
        if (this.debug)
            console.log(message);
    };
    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    Audd.prototype.recognizeWithOffset = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.log('[INFO] recognizeWithOffset');
            if (_this.api_token === '')
                return reject('api_token not set');
            _this.log("[INFO] " + Object.keys(data));
            var url = _this.uri_withoffset + (data.params ? '?' + data.params.toString() : '');
            _this.log("[INFO] " + data.method + " : " + url);
            fetch(url, data)
                .then(function (d) { return d.json(); })
                .then(function (response) {
                _this.log("[INFO] Status : " + response.status);
                if (response.status === 'error' && response.error) {
                    _this.log("[ERROR] " + response.error.error_code);
                    return reject("" + response.error.error_message);
                }
                else
                    resolve(response);
            }, reject);
        });
    };
    /**
     * Sends a request to the Audd.io API and returns the response
     * @param data IData
     * @returns IResponse
     */
    Audd.prototype.recognize = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.api_token === '')
                return reject('api_token not set');
            _this.log("[INFO] " + Object.keys(data));
            var url = _this.uri_recognize + (data.params ? '?' + data.params.toString() : '');
            _this.log("[INFO] " + data.method + " : " + url);
            fetch(url, data)
                .then(function (d) { return d.json(); })
                .then(function (response) {
                _this.log("[INFO] Status : " + response.status);
                if (response.status === 'error' && response.error) {
                    _this.log("[ERROR] " + response.error.error_code);
                    return reject("" + response.error.error_message);
                }
                else
                    resolve(response);
            }, reject);
        });
    };
    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IResponse
     */
    Audd.prototype.fromURL = function (url, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            _this.log("[INFO] fromURL");
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
    Audd.prototype.fromFile = function (file, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            _this.log("[INFO] fromFile");
            if (!fs_1.existsSync(file))
                reject('File not found');
            var form = new FormData();
            var size = fs_1.statSync(file).size;
            var stream = fs_1.createReadStream(file);
            form.append('file', stream, { knownLength: size });
            for (var _i = 0, _a = Object.keys(extra); _i < _a.length; _i++) {
                var key = _a[_i];
                form.append(key, extra[key]);
            }
            form.append('api_token', _this.api_token);
            _this.recognize({ body: form, method: 'POST' }).then(resolve, reject);
        });
    };
    /**
     * Attempt to recognise one or more songs in a video or audio file
     * @param file Path to file
     * @param extra Extra form data
     * @returns IGuess
     */
    Audd.prototype.guessFromFile = function (file, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            _this.log("[INFO] fromFile");
            if (!fs_1.existsSync(file))
                reject('File not found');
            var form = new FormData();
            var size = fs_1.statSync(file).size;
            var stream = fs_1.createReadStream(file);
            for (var _i = 0, _a = Object.keys(extra); _i < _a.length; _i++) {
                var key = _a[_i];
                form.append(key, extra[key]);
            }
            form.append('file', stream, { knownLength: size });
            form.append('api_token', _this.api_token);
            _this.recognizeWithOffset({
                body: form,
                method: 'POST'
            }).then(resolve, reject);
        });
    };
    /**
     * Attempt to recognise one or more songs in an external video or audio file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     * @returns IGuess
     */
    Audd.prototype.guessFromURL = function (url, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            _this.log("[INFO] fromURL");
            _this.recognizeWithOffset({
                params: new url_1.URLSearchParams(__assign({ api_token: _this.api_token, url: url }, extra)),
                method: 'POST'
            }).then(resolve, reject);
        });
    };
    return Audd;
}());
exports.Audd = Audd;
