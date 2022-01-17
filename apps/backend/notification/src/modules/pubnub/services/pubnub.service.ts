import { Injectable } from '@nestjs/common';
import { IPubNubService } from '../interfaces';
import { ConfigService } from '@nestjs/config';
import PubNub from 'pubnub';

@Injectable()
export class PubNubService implements IPubNubService {
  private pubnub: PubNub;

  constructor(private config: ConfigService) {
    this.pubnub = new PubNub({
      publishKey: this.config.get('pubnub.publishKey') || '',
      subscribeKey: this.config.get('pubnub.subscribeKey') || '',
      uuid: this.config.get('pubnub.uuid') || ''
    });
  }

  public publish(publishPayload: PubNub.PublishParameters): Promise<PubNub.PublishResponse> {
    return this.pubnub.publish(publishPayload);
  }

  public subscribe(subcriptionParams: PubNub.SubscribeParameters): void {
    this.pubnub.subscribe(subcriptionParams);
  }

  public addEventListener(eventListenerParams: PubNub.ListenerParameters): void {
    this.pubnub.addListener(eventListenerParams);
  }
}
