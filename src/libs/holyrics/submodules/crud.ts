import { HolyricsBaseClient } from '../client.js';

export class CrudModule {
  constructor(private client: HolyricsBaseClient) {}

  async createItem(type: string, item: any, auth?: any) {
    return this.client.request('CreateItem', { type, item }, auth);
  }

  async editItem(type: string, id: string, item: any, auth?: any) {
    return this.client.request('EditItem', { type, id, item }, auth);
  }

  async deleteItem(type: string, id: string, auth?: any) {
    return this.client.request('DeleteItem', { type, id }, auth);
  }
}
