import { HolyricsBaseClient } from '../client.js';

export class QuizModule {
  constructor(private client: HolyricsBaseClient) {}

  async getQuizList(auth?: any) {
    return this.client.request('GetQuizList', {}, auth);
  }

  async showQuiz(id: string, auth?: any) {
    return this.client.request('ShowQuiz', { id }, auth);
  }

  async quizAction(action: string, params?: any, auth?: any) {
    return this.client.request('QuizAction', { action, ...params }, auth);
  }
}
