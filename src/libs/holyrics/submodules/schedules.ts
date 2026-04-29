import { HolyricsBaseClient } from '../client.js';

export class SchedulesModule {
  constructor(private client: HolyricsBaseClient) {}

  async getCurrentSchedule(auth?: any) {
    return this.client.request('GetCurrentSchedule', {}, auth);
  }

  async getSchedules(auth?: any) {
    return this.client.request('GetSchedules', {}, auth);
  }

  async setCurrentSchedule(id: string, auth?: any) {
    return this.client.request('SetCurrentSchedule', { id }, auth);
  }

  async getHistory(id: string, auth?: any) {
    return this.client.request('GetHistory', { id }, auth);
  }

  async getHistories(auth?: any) {
    return this.client.request('GetHistories', {}, auth);
  }

  async getNearestHistory(auth?: any) {
    return this.client.request('GetNearestHistory', {}, auth);
  }
}
