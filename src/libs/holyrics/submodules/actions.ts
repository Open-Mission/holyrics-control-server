import { HolyricsBaseClient } from '../client.js';

export class ActionsModule {
  constructor(private client: HolyricsBaseClient) {}

  async apiAction(api_id: string, action: string, params?: any, auth?: any) {
    return this.client.request('ApiAction', { api_id, action, ...params }, auth);
  }

  async scriptAction(script_id: string, action: string, params?: any, auth?: any) {
    return this.client.request('ScriptAction', { script_id, action, ...params }, auth);
  }

  async apiRequest(api_id: string, action: string, params?: any, auth?: any) {
    return this.client.request('ApiRequest', { api_id, action, ...params }, auth);
  }

  async moduleAction(module_id: string, action: string, params?: any, auth?: any) {
    return this.client.request('ModuleAction', { module_id, action, ...params }, auth);
  }

  async runActions(actions: any[], auth?: any) {
    return this.client.request('RunActions', { actions }, auth);
  }

  async getTriggers(auth?: any) {
    return this.client.request('GetTriggers', {}, auth);
  }

  async getTriggerTags(auth?: any) {
    return this.client.request('GetTriggerTags', {}, auth);
  }

  async getTriggerPauseStateForTag(tag: string, auth?: any) {
    return this.client.request('GetTriggerPauseStateForTag', { tag }, auth);
  }

  async setTriggerPauseStateForTag(tag: string, paused: boolean, auth?: any) {
    return this.client.request('SetTriggerPauseStateForTag', { tag, paused }, auth);
  }

  async getTriggerPauseStateForReceiver(receiver: string, auth?: any) {
    return this.client.request('GetTriggerPauseStateForReceiver', { receiver }, auth);
  }

  async setTriggerPauseStateForReceiver(receiver: string, paused: boolean, auth?: any) {
    return this.client.request('SetTriggerPauseStateForReceiver', { receiver, paused }, auth);
  }

  async getScheduledTasks(auth?: any) {
    return this.client.request('GetScheduledTasks', {}, auth);
  }

  async executeFile(path: string, auth?: any) {
    return this.client.request('ExecuteFile', { path }, auth);
  }
}
