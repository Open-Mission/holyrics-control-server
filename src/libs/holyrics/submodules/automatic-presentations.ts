import { HolyricsBaseClient } from '../client.js';

export class AutomaticPresentationsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getAutomaticPresentations(auth?: any) {
    return this.client.request('GetAutomaticPresentations', {}, auth);
  }

  async getAutomaticPresentation(id: string, auth?: any) {
    return this.client.request('GetAutomaticPresentation', { id }, auth);
  }

  async playAutomaticPresentation(id: string, auth?: any) {
    return this.client.request('PlayAutomaticPresentation', { id }, auth);
  }

  async getAutomaticPresentationPlayerInfo(auth?: any) {
    return this.client.request('GetAutomaticPresentationPlayerInfo', {}, auth);
  }

  async automaticPresentationPlayerAction(action: string, params?: any, auth?: any) {
    return this.client.request('AutomaticPresentationPlayerAction', { action, ...params }, auth);
  }
}
