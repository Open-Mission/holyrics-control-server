import { HolyricsBaseClient } from '../client.js';

export class SystemModule {
  constructor(private client: HolyricsBaseClient) {}

  async getTokenInfo(auth?: any) {
    return this.client.request('GetTokenInfo', {}, auth);
  }

  async checkPermissions(actions: string, auth?: any) {
    return this.client.request('CheckPermissions', { actions }, auth);
  }

  async getVersion(auth?: any) {
    return this.client.request('GetVersion', {}, auth);
  }

  async getHolyricsPlanInfo(auth?: any) {
    return this.client.request('GetHolyricsPlanInfo', {}, auth);
  }

  async getAPIServerInfo(auth?: any) {
    return this.client.request('GetAPIServerInfo', {}, auth);
  }

  async getRuntimeEnvironment(auth?: any) {
    return this.client.request('GetRuntimeEnvironment', {}, auth);
  }

  async setRuntimeEnvironment(environment: string, auth?: any) {
    return this.client.request('SetRuntimeEnvironment', { environment }, auth);
  }

  async getGlobalSettings(auth?: any) {
    return this.client.request('GetGlobalSettings', {}, auth);
  }

  async setGlobalSettings(settings: any, auth?: any) {
    return this.client.request('SetGlobalSettings', settings, auth);
  }

  async getSyncStatus(auth?: any) {
    return this.client.request('GetSyncStatus', {}, auth);
  }

  async getApis(auth?: any) {
    return this.client.request('GetApis', {}, auth);
  }

  async getScripts(auth?: any) {
    return this.client.request('GetScripts', {}, auth);
  }

  async getModules(auth?: any) {
    return this.client.request('GetModules', {}, auth);
  }

  async getInterfaceInput(auth?: any) {
    return this.client.request('GetInterfaceInput', {}, auth);
  }

  async setInterfaceInput(input: any, auth?: any) {
    return this.client.request('SetInterfaceInput', input, auth);
  }

  async openDrawLots(auth?: any) {
    return this.client.request('OpenDrawLots', {}, auth);
  }

  async getStyledModels(auth?: any) {
    return this.client.request('GetStyledModels', {}, auth);
  }

  async getStyledModelsAsMap(auth?: any) {
    return this.client.request('GetStyledModelsAsMap', {}, auth);
  }

  async ping() {
    return this.client.ping();
  }
}
