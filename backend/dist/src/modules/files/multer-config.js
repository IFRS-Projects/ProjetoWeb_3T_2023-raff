"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
const node_crypto_1 = require("node:crypto");
const path = require("node:path");
const multerConfig = {
    storage: (0, multer_1.diskStorage)({
        destination: path.resolve(__dirname, '../../../../uploads'),
        filename: (req, file, cb) => {
            const uniqueSufix = Date.now() + '-' + (0, node_crypto_1.randomUUID)();
            const ext = path.extname(file.originalname);
            const fileName = `${uniqueSufix}${ext}`;
            cb(null, fileName);
        },
    }),
};
exports.default = multerConfig;
//# sourceMappingURL=multer-config.js.map