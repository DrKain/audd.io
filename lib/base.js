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
exports.Base = void 0;
var fs_1 = require("fs");
var fs_2 = require("fs");
var fs_3 = require("fs");
var fetch = require('node-fetch');
var FormData = require('form-data');
var Base = /** @class */ (function () {
    function Base(api_token, endpoint) {
        this.api_token = api_token;
        this.endpoint = endpoint;
    }
    /**
     * Attempt to match the exact song using an externally linked file
     * @param url Direct link an audio or video file
     * @param extra Extra form data
     */
    Base.prototype.fromURL = function (url, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            var params = new URLSearchParams(__assign({ api_token: _this.api_token, url: url }, extra));
            _this.call({ params: params, method: 'POST' }).then(resolve, reject);
        });
    };
    /**
     * Attempt to match the exact song using a file
     * @param file Path to file
     * @param extra Extra form data
     */
    Base.prototype.fromFile = function (file, extra) {
        var _this = this;
        if (extra === void 0) { extra = {}; }
        return new Promise(function (resolve, reject) {
            if (!fs_2.existsSync(file))
                reject('File not found');
            var form = _this.createForm(file, extra);
            _this.call({ body: form, method: 'POST' }).then(resolve, reject);
        });
    };
    Base.prototype.call = function (data) {
        var _this = this;
        var url = this.endpoint + (data.params ? '?' + data.params.toString() : '');
        return new Promise(function (resolve, reject) {
            if (_this.api_token === '')
                return reject('api_token not set');
            fetch(url, data)
                .then(function (d) { return d.json(); })
                .then(function (res) { return resolve(res); }, reject);
        });
    };
    Base.prototype.createForm = function (file, extra) {
        if (extra === void 0) { extra = {}; }
        var form = new FormData();
        var size = fs_3.statSync(file).size;
        var stream = fs_1.createReadStream(file);
        form.append('file', stream, { knownLength: size });
        for (var _i = 0, _a = Object.keys(extra); _i < _a.length; _i++) {
            var key = _a[_i];
            form.append(key, extra[key]);
        }
        form.append('api_token', this.api_token);
        return form;
    };
    return Base;
}());
exports.Base = Base;
