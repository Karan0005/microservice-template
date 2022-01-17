import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class AppHttpService {
  private http: HttpService = new HttpService();

  get(url: string) {
    return firstValueFrom(this.http.get(url).pipe(map((response) => response.data)));
  }

  post(url: string, data: unknown) {
    return firstValueFrom(this.http.post(url, data, { headers: { 'Content-Type': 'application/json' }, method: 'POST' }).pipe(map((response) => response.data)));
  }
}
