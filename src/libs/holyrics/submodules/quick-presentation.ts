import { HolyricsBaseClient } from '../client.js';

export class QuickPresentationModule {
  constructor(private client: HolyricsBaseClient) {}

  async showQuickPresentation(text: string, auth?: any) {
    return this.client.request('ShowQuickPresentation', { text }, auth);
  }

  async showCountdown(time: string, auth?: any) {
    return this.client.request('ShowCountdown', { time }, auth);
  }

  async actionNextQuickPresentation(auth?: any) {
    return this.client.request('ActionNextQuickPresentation', {}, auth);
  }

  async actionPreviousQuickPresentation(auth?: any) {
    return this.client.request('ActionPreviousQuickPresentation', {}, auth);
  }

  async closeCurrentQuickPresentation(auth?: any) {
    return this.client.request('CloseCurrentQuickPresentation', {}, auth);
  }

  async getCurrentQuickPresentation(auth?: any) {
    return this.client.request('GetCurrentQuickPresentation', {}, auth);
  }
}
