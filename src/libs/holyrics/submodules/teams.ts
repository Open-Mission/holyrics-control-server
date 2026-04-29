import { HolyricsBaseClient } from '../client.js';

export class TeamsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getSongGroup(id: string, auth?: any) {
    return this.client.request('GetSongGroup', { id }, auth);
  }

  async getSongGroups(auth?: any) {
    return this.client.request('GetSongGroups', {}, auth);
  }

  async getTeams(auth?: any) {
    return this.client.request('GetTeams', {}, auth);
  }

  async getMembers(auth?: any) {
    return this.client.request('GetMembers', {}, auth);
  }

  async getRoles(auth?: any) {
    return this.client.request('GetRoles', {}, auth);
  }

  async getServices(auth?: any) {
    return this.client.request('GetServices', {}, auth);
  }

  async getEvents(auth?: any) {
    return this.client.request('GetEvents', {}, auth);
  }

  async addSongsToSongGroup(groupId: string, songIds: string[], auth?: any) {
    return this.client.request('AddSongsToSongGroup', { id: groupId, songs: songIds }, auth);
  }

  async removeSongsFromSongGroup(groupId: string, songIds: string[], auth?: any) {
    return this.client.request('RemoveSongsFromSongGroup', { id: groupId, songs: songIds }, auth);
  }
}
