import { HolyricsBaseClient, HolyricsAuth } from '../client.js';

export class PresentationModule {
  constructor(private client: HolyricsBaseClient) {}

  async getCurrent(auth?: HolyricsAuth) {
    return this.client.request('GetCurrentPresentation', {}, auth);
  }

  async close(auth?: HolyricsAuth) {
    return this.client.request('CloseCurrentPresentation', {}, auth);
  }

  async getF8(auth?: HolyricsAuth) {
    return this.client.request('GetF8', {}, auth);
  }

  async setF8(show: boolean, auth?: HolyricsAuth) {
    return this.client.request('SetF8', { show }, auth);
  }

  async toggleF8(auth?: HolyricsAuth) {
    return this.client.request('ToggleF8', {}, auth);
  }

  async next(auth?: HolyricsAuth) {
    return this.client.request('ActionNext', {}, auth);
  }

  async previous(auth?: HolyricsAuth) {
    return this.client.request('ActionPrevious', {}, auth);
  }

  async goToIndex(index: number, auth?: HolyricsAuth) {
    return this.client.request('ActionGoToIndex', { index }, auth);
  }

  async getSlideDescriptions(auth?: HolyricsAuth) {
    return this.client.request('GetSlideDescriptions', {}, auth);
  }

  async goToSlideDescription(description: string, auth?: HolyricsAuth) {
    return this.client.request('ActionGoToSlideDescription', { description }, auth);
  }

  async getAlert(auth?: HolyricsAuth) {
    return this.client.request('GetAlert', {}, auth);
  }

  async setAlert(text: string, show: boolean, auth?: HolyricsAuth) {
    return this.client.request('SetAlert', { text, show }, auth);
  }
}
