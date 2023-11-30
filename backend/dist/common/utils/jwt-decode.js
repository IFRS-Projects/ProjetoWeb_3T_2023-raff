"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecodeJwtToken = void 0;
const DecodeJwtToken = (token) => {
    const tokenSplited = token.split('.');
    if (tokenSplited.length < 3 || !tokenSplited[1]) {
        return undefined;
    }
    return JSON.parse(Buffer.from(tokenSplited[1], 'base64').toString('ascii'));
};
exports.DecodeJwtToken = DecodeJwtToken;
//# sourceMappingURL=jwt-decode.js.map