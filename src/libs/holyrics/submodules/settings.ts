import { HolyricsBaseClient } from '../client.js';

export class SettingsModule {
  constructor(private client: HolyricsBaseClient) {}

  async getWallpaperSettings(auth?: any) {
    return this.client.request('GetWallpaperSettings', {}, auth);
  }

  async setWallpaperSettings(settings: any, auth?: any) {
    return this.client.request('SetWallpaperSettings', settings, auth);
  }

  async getDisplaySettings(auth?: any) {
    return this.client.request('GetDisplaySettings', {}, auth);
  }

  async setDisplaySettings(settings: any, auth?: any) {
    return this.client.request('SetDisplaySettings', settings, auth);
  }

  async getDisplaySettingsPresets(auth?: any) {
    return this.client.request('GetDisplaySettingsPresets', {}, auth);
  }

  async getTransitionEffectSettings(auth?: any) {
    return this.client.request('GetTransitionEffectSettings', {}, auth);
  }

  async setTransitionEffectSettings(settings: any, auth?: any) {
    return this.client.request('SetTransitionEffectSettings', settings, auth);
  }

  async getTranslationPresetList(auth?: any) {
    return this.client.request('GetTranslationPresetList', {}, auth);
  }

  async getTranslationPreset(id: string, auth?: any) {
    return this.client.request('GetTranslationPreset', { id }, auth);
  }

  async applyTranslationPreset(id: string, auth?: any) {
    return this.client.request('ApplyTranslationPreset', { id }, auth);
  }

  async getLogoSettingsPresetList(auth?: any) {
    return this.client.request('GetLogoSettingsPresetList', {}, auth);
  }

  async getLogoSettingsPreset(id: string, auth?: any) {
    return this.client.request('GetLogoSettingsPreset', { id }, auth);
  }

  async applyLogoSettingsPreset(id: string, auth?: any) {
    return this.client.request('ApplyLogoSettingsPreset', { id }, auth);
  }

  async getBibleResponsiveReadingSettingsPresetList(auth?: any) {
    return this.client.request('GetBibleResponsiveReadingSettingsPresetList', {}, auth);
  }

  async getBibleResponsiveReadingSettingsPreset(id: string, auth?: any) {
    return this.client.request('GetBibleResponsiveReadingSettingsPreset', { id }, auth);
  }

  async applyBibleResponsiveReadingSettingsPreset(id: string, auth?: any) {
    return this.client.request('ApplyBibleResponsiveReadingSettingsPreset', { id }, auth);
  }

  async getPresentationFooterSettings(auth?: any) {
    return this.client.request('GetPresentationFooterSettings', {}, auth);
  }

  async setPresentationFooterSettings(settings: any, auth?: any) {
    return this.client.request('SetPresentationFooterSettings', settings, auth);
  }

  async getMidiSettings(auth?: any) {
    return this.client.request('GetMidiSettings', {}, auth);
  }

  async getRuleGroupList(auth?: any) {
    return this.client.request('GetRuleGroupList', {}, auth);
  }

  async getRuleGroup(id: string, auth?: any) {
    return this.client.request('GetRuleGroup', { id }, auth);
  }

  async testRuleGroup(id: string, text: string, auth?: any) {
    return this.client.request('TestRuleGroup', { id, text }, auth);
  }

  async getTransitionEffectTemplateSettingsList(auth?: any) {
    return this.client.request('GetTransitionEffectTemplateSettingsList', {}, auth);
  }

  async getTransitionEffectTemplateSettings(id: string, auth?: any) {
    return this.client.request('GetTransitionEffectTemplateSettings', { id }, auth);
  }

  async setTransitionEffectTemplateSettings(settings: any, auth?: any) {
    return this.client.request('SetTransitionEffectTemplateSettings', settings, auth);
  }
}
