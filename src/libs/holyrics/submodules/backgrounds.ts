import { HolyricsBaseClient } from '../client.js';

export class BackgroundsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getCurrentBackground(auth?: any) {
    return this.client.request('GetCurrentBackground', {}, auth);
  }

  async getCurrentTheme(auth?: any) {
    return this.client.request('GetCurrentTheme', {}, auth);
  }

  async getThemes(auth?: any) {
    return this.client.request('GetThemes', {}, auth);
  }

  async getBackgrounds(auth?: any) {
    return this.client.request('GetBackgrounds', {}, auth);
  }

  async getBackgroundTags(auth?: any) {
    return this.client.request('GetBackgroundTags', {}, auth);
  }

  async setCurrentBackground(id: string, auth?: any) {
    return this.client.request('SetCurrentBackground', { id }, auth);
  }

  async getThumbnail(id: string, type: string, auth?: any) {
    return this.client.request('GetThumbnail', { id, type }, auth);
  }

  async getColorMap(auth?: any) {
    return this.client.request('GetColorMap', {}, auth);
  }

  async setLogo(id: string, auth?: any) {
    return this.client.request('SetLogo', { id }, auth);
  }

  async getBpm(auth?: any) {
    return this.client.request('GetBpm', {}, auth);
  }

  async setBpm(bpm: number, auth?: any) {
    return this.client.request('SetBpm', { bpm }, auth);
  }

  async getHue(auth?: any) {
    return this.client.request('GetHue', {}, auth);
  }

  async setHue(hue: number, auth?: any) {
    return this.client.request('SetHue', { hue }, auth);
  }
}
