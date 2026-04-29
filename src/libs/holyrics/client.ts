import { createHash } from 'crypto';
import { z } from 'zod';

export const holyricsResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  data: z.any().optional(),
  error: z.union([
    z.string(),
    z.object({
      code: z.number(),
      key: z.string(),
      message: z.string()
    })
  ]).optional(),
  response_status: z.string().optional(),
  response: z.any().optional()
});

export type HolyricsResponse<T = any> = z.infer<typeof holyricsResponseSchema> & { data?: T };

export const holyricsAuthSchema = z.object({
  token: z.string(),
  sid: z.string(),
  nonce: z.string(),
  rid: z.number()
});

export type HolyricsAuth = z.infer<typeof holyricsAuthSchema>;

export class HolyricsBaseClient {
  private baseUrl: string;
  private defaultToken: string;

  constructor(baseUrl: string, token: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    this.defaultToken = token;
  }

  public static calculateDToken(token: string, nonce: string, rid: number, data: string): string {
    return createHash('sha256').update(`${nonce}:${rid}:${token}:${data}`).digest('hex');
  }

  /**
   * Performs the full authentication flow to get a session
   */
  async authenticate(token: string): Promise<HolyricsAuth> {
    // 1. Get nonce and sid
    const authUrl = `${this.baseUrl}/api/Auth`;
    const initResponse = await fetch(authUrl);
    const initResult: HolyricsResponse<{ sid: string; nonce: string }> = await initResponse.json();

    if (initResult.status !== 'ok' || !initResult.data) {
      throw new Error('Failed to initialize authentication: ' + JSON.stringify(initResult.error));
    }

    const { sid, nonce } = initResult.data;
    const rid = 0;
    const dtoken = HolyricsBaseClient.calculateDToken(token, nonce, rid, 'auth');

    // 2. Complete authentication
    const loginUrl = `${authUrl}?sid=${sid}&rid=${rid}&dtoken=${dtoken}`;
    const loginResponse = await fetch(loginUrl);
    const loginResult: HolyricsResponse = await loginResponse.json();

    if (loginResult.status !== 'ok') {
      throw new Error('Authentication failed: ' + JSON.stringify(loginResult.error));
    }

    return { token, sid, nonce, rid };
  }

  async request<T = any>(action: string, params: any = {}, auth?: HolyricsAuth): Promise<{ data: T; nextAuth?: HolyricsAuth }> {
    const url = new URL(`${this.baseUrl}/api/${action}`);
    
    let currentAuth = auth;
    let nextAuth: HolyricsAuth | undefined;

    if (currentAuth) {
      const rid = currentAuth.rid + 1;
      const data = Object.keys(params).length === 0 ? '{}' : JSON.stringify(params);
      const dtoken = HolyricsBaseClient.calculateDToken(currentAuth.token, currentAuth.nonce, rid, data);
      
      url.searchParams.append('sid', currentAuth.sid);
      url.searchParams.append('rid', rid.toString());
      url.searchParams.append('dtoken', dtoken);
      
      nextAuth = { ...currentAuth, rid };
    } else {
      // Fallback to simple token in query param if no session auth provided
      url.searchParams.append('token', this.defaultToken);
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const result: HolyricsResponse<T> = await response.json();
      
      if (result.status === 'error') {
        const errorMsg = typeof result.error === 'string' 
          ? result.error 
          : result.error?.message || 'Unknown error';
        throw new Error(`Holyrics API Error (${action}): ${errorMsg}`);
      }
      
      return { data: result.data as T, nextAuth };
    } catch (error: any) {
      throw error;
    }
  }
}
