import { HolyricsBaseClient } from '../client.js';

export class AnnouncementsModule {
  constructor(private client: HolyricsBaseClient) {}

  async showAnnouncement(id: string, auth?: any) {
    return this.client.request('ShowAnnouncement', { id }, auth);
  }

  async getAnnouncement(id: string, auth?: any) {
    return this.client.request('GetAnnouncement', { id }, auth);
  }

  async getAnnouncements(auth?: any) {
    return this.client.request('GetAnnouncements', {}, auth);
  }

  async getCustomMessages(auth?: any) {
    return this.client.request('GetCustomMessages', {}, auth);
  }

  async showCustomMessage(id: string, auth?: any) {
    return this.client.request('ShowCustomMessage', { id }, auth);
  }
}
