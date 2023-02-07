"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const js_yaml_1 = __importDefault(require("js-yaml"));
const crypto_1 = __importDefault(require("crypto"));
const getCacheKey = (fileData, filePath, options) => {
    const optionsString = typeof options === 'string' ? options : JSON.stringify(options);
    return crypto_1.default
        .createHash('md5')
        .update(fileData)
        .update(optionsString)
        .digest('hex');
};
const process = (sourceText) => {
    const result = js_yaml_1.default.load(sourceText);
    const json = JSON.stringify(result, null, '\t');
    return `module.exports = ${json}`;
};
const transformer = {
    getCacheKey,
    process,
};
exports.default = transformer;
__exportStar(require("./types"), exports);
