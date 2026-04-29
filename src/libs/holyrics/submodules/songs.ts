import { HolyricsBaseClient, HolyricsAuth } from '../client.js';

export class SongsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getAll(fields?: string, auth?: HolyricsAuth) {
    return this.client.request('GetSongs', { fields }, auth);
  }

  async getById(id: string, fields?: string, auth?: HolyricsAuth) {
    return this.client.request('GetSong', { id, fields }, auth);
  }

  async search(text: string, options: any = {}, auth?: HolyricsAuth) {
    return this.client.request('SearchSong', { text, ...options }, auth);
  }

  async show(id: string, initial_index?: number, auth?: HolyricsAuth) {
    return this.client.request('ShowSong', { id, initial_index }, auth);
  }

  async getRealTimeSongKey(auth?: HolyricsAuth) {
    return this.client.request('GetRealTimeSongKey', {}, auth);
  }

  async setRealTimeSongKey(key: string, auth?: HolyricsAuth) {
    return this.client.request('SetRealTimeSongKey', { key }, auth);
  }
}
