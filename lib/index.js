"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Audd = void 0;
var base_1 = require("./base");
var Audd = /** @class */ (function () {
    function Audd(token) {
        this.recognize = new base_1.Base(token, 'https://api.audd.io');
        this.recognizeWithOffset = new base_1.Base(token, 'https://api.audd.io/recognizeWithOffset');
        this.enterprise = new base_1.Base(token, 'https://enterprise.audd.io');
    }
    return Audd;
}());
exports.Audd = Audd;
