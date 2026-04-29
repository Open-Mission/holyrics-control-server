import { HolyricsBaseClient, HolyricsAuth } from '../client.js';

export class AuthModule {
  constructor(private client: HolyricsBaseClient) {}

  /**
   * Performs the full authentication flow with a token (Step 1 & 2)
   */
  async loginWithToken(token: string): Promise<HolyricsAuth> {
    return this.client.authenticate(token);
  }

  /**
   * Login using the hash method (two-step Auth flow)
   */
  async loginWithHash(token: string): Promise<HolyricsAuth> {
    return this.client.authenticate(token);
  }

  /**
   * Authenticate using an existing session
   */
  async loginWithSession(auth: HolyricsAuth) {
    return this.client.request('Auth', {}, auth);
  }
}