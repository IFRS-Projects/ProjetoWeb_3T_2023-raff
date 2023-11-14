import { diskStorage } from 'multer';
import { randomUUID } from 'node:crypto';
import * as path from 'node:path';

const multerConfig = {
  storage: diskStorage({
    destination: path.resolve(__dirname, '../../../../uploads'),
    filename: (req, file, cb) => {
      const uniqueSufix = Date.now() + '-' + randomUUID();
      const ext = path.extname(file.originalname);
      const fileName = `${uniqueSufix}${ext}`;

      cb(null, fileName);
    },
  }),
};

export default multerConfig;
