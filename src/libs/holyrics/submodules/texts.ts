import { HolyricsBaseClient } from '../client.js';

export class TextsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getText(id: string, fields?: string, auth?: any) {
    return this.client.request('GetText', { id, fields }, auth);
  }

  async getTexts(fields?: string, auth?: any) {
    return this.client.request('GetTexts', { fields }, auth);
  }

  async searchText(text: string, fields?: string, auth?: any) {
    return this.client.request('SearchText', { text, fields }, auth);
  }

  async showText(id: string, initial_index?: number, auth?: any) {
    return this.client.request('ShowText', { id, initial_index }, auth);
  }

  async showVerse(book: number, chapter: number, verse: number, auth?: any) {
    return this.client.request('ShowVerse', { book, chapter, verse }, auth);
  }

  async selectVerse(book: number, chapter: number, verse: number, auth?: any) {
    return this.client.request('SelectVerse', { book, chapter, verse }, auth);
  }
}
