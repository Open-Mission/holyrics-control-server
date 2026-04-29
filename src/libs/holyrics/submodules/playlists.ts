import { HolyricsBaseClient, HolyricsAuth } from '../client.js';

export class PlaylistsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getLyricsPlaylist(auth?: HolyricsAuth) {
    return this.client.request('GetLyricsPlaylist', {}, auth);
  }

  async getMediaPlaylist(auth?: HolyricsAuth) {
    return this.client.request('GetMediaPlaylist', {}, auth);
  }

  async addToPlaylist(type: 'song' | 'media', id: string, auth?: HolyricsAuth) {
    const action = type === 'song' ? 'AddLyricsToPlaylist' : 'AddToPlaylist';
    return this.client.request(action, { id }, auth);
  }

  async getSavedPlaylists(auth?: HolyricsAuth) {
    return this.client.request('GetSavedPlaylists', {}, auth);
  }

  async loadSavedPlaylist(name: string, auth?: HolyricsAuth) {
    return this.client.request('LoadSavedPlaylist', { name }, auth);
  }
}
