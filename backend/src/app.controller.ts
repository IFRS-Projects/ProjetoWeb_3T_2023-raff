import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('img/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    await res.sendFile(fileId, { root: 'uploads' });
  }
}
