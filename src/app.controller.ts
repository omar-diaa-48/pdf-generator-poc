import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import * as puppeteer from 'puppeteer';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getPdf(
    @Res() res: Response
  ): Promise<any> {
    const browser = await puppeteer.launch({
      headless: 'new'
    });
    const page = await browser.newPage();
    await page.setContent(
      '<div><h1>PDF Content</h1><p>This is the content of the PDF.</p></div>'
    );

    const pdfBuffer = await page.pdf({ path: 'example.pdf', format: 'A4' });
    await browser.close();

    res.writeHead(200, { 'Content-Type': 'application/pdf' });

    res.end(pdfBuffer);
  }
}
