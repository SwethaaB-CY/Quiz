/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  httpService: any;
  getHello(topic: string, questions: number): string {
    return this.httpService.get(
      `http://localhost:8000/generate-quiz?topic=${topic}&questions=${questions}`,
    );
  }
}
