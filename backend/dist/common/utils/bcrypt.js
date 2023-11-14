"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deCrypt = exports.enCrypt = void 0;
const bcrypt = require("bcrypt");
async function enCrypt(password) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}
exports.enCrypt = enCrypt;
async function deCrypt(password, has) {
    return await bcrypt.compare(password, has);
}
exports.deCrypt = deCrypt;
//# sourceMappingURL=bcrypt.js.map