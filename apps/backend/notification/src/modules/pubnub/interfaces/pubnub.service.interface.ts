import PubNub from 'pubnub';

export interface IPubNubService {
  publish(publishPayload: PubNub.PublishParameters): Promise<PubNub.PublishResponse>;
  subscribe(subcriptionParams: PubNub.SubscribeParameters): void;
  addEventListener(eventListenerParams: PubNub.ListenerParameters): void;
}
