"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
var fs_1 = require("fs");
var fs_2 = require("fs");
var fetch = require('node-fetch');
var FormData = require('form-data');
var Base = /** @class */ (function () {
    function Base() {
        this.api_token = '';
    }
    Base.prototype.call = function (url, data) {
        var _this = this;
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
        var size = fs_2.statSync(file).size;
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
