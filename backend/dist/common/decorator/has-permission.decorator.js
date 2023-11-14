"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasPermission = void 0;
const common_1 = require("@nestjs/common");
const HasPermission = (permission) => (0, common_1.SetMetadata)('permission', permission);
exports.HasPermission = HasPermission;
//# sourceMappingURL=has-permission.decorator.js.map