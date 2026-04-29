import { HolyricsBaseClient } from '../client.js';

export class CommunicationPanelModule {
  constructor(private client: HolyricsBaseClient) {}

  async getCommunicationPanelInfo(auth?: any) {
    return this.client.request('GetCommunicationPanelInfo', {}, auth);
  }

  async setCommunicationPanelSettings(settings: any, auth?: any) {
    return this.client.request('SetCommunicationPanelSettings', settings, auth);
  }

  async startCountdownCommunicationPanel(time: string, auth?: any) {
    return this.client.request('StartCountdownCommunicationPanel', { time }, auth);
  }

  async stopCountdownCommunicationPanel(auth?: any) {
    return this.client.request('StopCountdownCommunicationPanel', {}, auth);
  }

  async startTimerCommunicationPanel(time: string, auth?: any) {
    return this.client.request('StartTimerCommunicationPanel', { time }, auth);
  }

  async stopTimerCommunicationPanel(auth?: any) {
    return this.client.request('StopTimerCommunicationPanel', {}, auth);
  }

  async setTextCommunicationPanel(text: string, show: boolean, auth?: any) {
    return this.client.request('SetTextCommunicationPanel', { text, show }, auth);
  }

  async setAlertCommunicationPanel(text: string, show: boolean, auth?: any) {
    return this.client.request('SetAlertCommunicationPanel', { text, show }, auth);
  }

  async communicationPanelCallAttention(auth?: any) {
    return this.client.request('CommunicationPanelCallAttention', {}, auth);
  }
}
