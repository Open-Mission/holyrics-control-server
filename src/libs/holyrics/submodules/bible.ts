import { HolyricsBaseClient } from '../client.js';

export class BibleModule {
  constructor(private client: HolyricsBaseClient) {}

  async getBibleVersions(auth?: any) {
    return this.client.request('GetBibleVersions', {}, auth);
  }

  async getBibleVersionsV2(auth?: any) {
    return this.client.request('GetBibleVersionsV2', {}, auth);
  }

  async getBibleSettings(auth?: any) {
    return this.client.request('GetBibleSettings', {}, auth);
  }

  async setBibleSettings(settings: any, auth?: any) {
    return this.client.request('SetBibleSettings', settings, auth);
  }
}
