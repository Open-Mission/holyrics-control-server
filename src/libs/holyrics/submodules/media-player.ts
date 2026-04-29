import { HolyricsBaseClient } from '../client.js';

export class MediaPlayerModule {
  constructor(private client: HolyricsBaseClient) {}

  async getMediaPlayerInfo(auth?: any) {
    return this.client.request('GetMediaPlayerInfo', {}, auth);
  }

  async mediaPlayerAction(action: string, params?: any, auth?: any) {
    return this.client.request('MediaPlayerAction', { action, ...params }, auth);
  }
}
