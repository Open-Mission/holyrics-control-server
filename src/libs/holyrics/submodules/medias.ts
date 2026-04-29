import { HolyricsBaseClient, HolyricsAuth } from '../client.js';

export class MediasModule {
  constructor(private client: HolyricsBaseClient) {}

  async getAll(auth?: HolyricsAuth) {
    return this.client.request('GetAudios', {}, auth);
  }

  async getById(id: string, auth?: HolyricsAuth) {
    return this.client.request('GetAudio', { id }, auth);
  }

  async setProperty(id: string, property: string, value: any, auth?: HolyricsAuth) {
    return this.client.request('SetAudioItemProperty', { id, property, value }, auth);
  }

  async playAudio(id: string, auth?: HolyricsAuth) {
    return this.client.request('PlayAudio', { id }, auth);
  }

  async playVideo(id: string, auth?: HolyricsAuth) {
    return this.client.request('PlayVideo', { id }, auth);
  }

  async showImage(id: string, auth?: HolyricsAuth) {
    return this.client.request('ShowImage', { id }, auth);
  }

  async exists(id: string, auth?: HolyricsAuth) {
    return this.client.request('AudioExists', { id }, auth);
  }

  async getMediaDuration(id: string, auth?: HolyricsAuth) {
    return this.client.request('GetMediaDuration', { id }, auth);
  }

  async getFavorites(auth?: HolyricsAuth) {
    return this.client.request('GetFavorites', {}, auth);
  }

  async favoriteAction(action: string, params?: any, auth?: HolyricsAuth) {
    return this.client.request('FavoriteAction', { action, ...params }, auth);
  }
}
