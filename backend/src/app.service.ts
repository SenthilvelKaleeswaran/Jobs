import { Injectable, Req } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) { }
  getHello(@Req() request: Request): string {
    const userLocale =
      request.headers['accept-language'] || request.headers['Accept-Language'] || 'en';

      console.log(userLocale)

    const greeting = this.i18n.t('test.HELLO', { lang: userLocale.slice(0,2) });

    return greeting;
  }


 
}
