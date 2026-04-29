import { HolyricsBaseClient } from './client.js';
import { SongsModule } from './submodules/songs.js';
import { PlaylistsModule } from './submodules/playlists.js';
import { MediasModule } from './submodules/medias.js';
import { PresentationModule } from './submodules/presentation.js';
import { AuthModule } from './submodules/auth.js';
import { SystemModule } from './submodules/system.js';
import { TextsModule } from './submodules/texts.js';
import { AnnouncementsModule } from './submodules/announcements.js';
import { QuickPresentationModule } from './submodules/quick-presentation.js';
import { QuizModule } from './submodules/quiz.js';
import { AutomaticPresentationsModule } from './submodules/automatic-presentations.js';
import { MediaPlayerModule } from './submodules/media-player.js';
import { BackgroundsModule } from './submodules/backgrounds.js';
import { SchedulesModule } from './submodules/schedules.js';
import { TeamsModule } from './submodules/teams.js';
import { CommunicationPanelModule } from './submodules/communication-panel.js';
import { BibleModule } from './submodules/bible.js';
import { SettingsModule } from './submodules/settings.js';
import { ActionsModule } from './submodules/actions.js';
import { CrudModule } from './submodules/crud.js';

class Holyrics {
  private static instance: Holyrics;
  public client: HolyricsBaseClient;

  public songs: SongsModule;
  public playlists: PlaylistsModule;
  public medias: MediasModule;
  public presentation: PresentationModule;
  public auth: AuthModule;
  public system: SystemModule;
  public texts: TextsModule;
  public announcements: AnnouncementsModule;
  public quickPresentation: QuickPresentationModule;
  public quiz: QuizModule;
  public automaticPresentations: AutomaticPresentationsModule;
  public mediaPlayer: MediaPlayerModule;
  public backgrounds: BackgroundsModule;
  public schedules: SchedulesModule;
  public teams: TeamsModule;
  public communicationPanel: CommunicationPanelModule;
  public bible: BibleModule;
  public settings: SettingsModule;
  public actions: ActionsModule;
  public crud: CrudModule;

  private constructor() {
    const baseUrl = process.env.HOLYRICS_URL || 'http://localhost:8091';
    const token = process.env.HOLYRICS_TOKEN || '';

    this.client = new HolyricsBaseClient(baseUrl, token);
    
    this.songs = new SongsModule(this.client);
    this.playlists = new PlaylistsModule(this.client);
    this.medias = new MediasModule(this.client);
    this.presentation = new PresentationModule(this.client);
    this.auth = new AuthModule(this.client);
    this.system = new SystemModule(this.client);
    this.texts = new TextsModule(this.client);
    this.announcements = new AnnouncementsModule(this.client);
    this.quickPresentation = new QuickPresentationModule(this.client);
    this.quiz = new QuizModule(this.client);
    this.automaticPresentations = new AutomaticPresentationsModule(this.client);
    this.mediaPlayer = new MediaPlayerModule(this.client);
    this.backgrounds = new BackgroundsModule(this.client);
    this.schedules = new SchedulesModule(this.client);
    this.teams = new TeamsModule(this.client);
    this.communicationPanel = new CommunicationPanelModule(this.client);
    this.bible = new BibleModule(this.client);
    this.settings = new SettingsModule(this.client);
    this.actions = new ActionsModule(this.client);
    this.crud = new CrudModule(this.client);
  }

  public static getInstance(): Holyrics {
    if (!Holyrics.instance) {
      Holyrics.instance = new Holyrics();
    }
    return Holyrics.instance;
  }

  /**
   * Performs the full authentication flow to get a session
   */
  public async authenticate(token: string) {
    return this.client.authenticate(token);
  }

  /**
   * Reconfigure the client with new credentials if needed
   */
  public configure(baseUrl: string, token: string) {
    this.client = new HolyricsBaseClient(baseUrl, token);
    this.songs = new SongsModule(this.client);
    this.playlists = new PlaylistsModule(this.client);
    this.medias = new MediasModule(this.client);
    this.presentation = new PresentationModule(this.client);
    this.auth = new AuthModule(this.client);
    this.system = new SystemModule(this.client);
    this.texts = new TextsModule(this.client);
    this.announcements = new AnnouncementsModule(this.client);
    this.quickPresentation = new QuickPresentationModule(this.client);
    this.quiz = new QuizModule(this.client);
    this.automaticPresentations = new AutomaticPresentationsModule(this.client);
    this.mediaPlayer = new MediaPlayerModule(this.client);
    this.backgrounds = new BackgroundsModule(this.client);
    this.schedules = new SchedulesModule(this.client);
    this.teams = new TeamsModule(this.client);
    this.communicationPanel = new CommunicationPanelModule(this.client);
    this.bible = new BibleModule(this.client);
    this.settings = new SettingsModule(this.client);
    this.actions = new ActionsModule(this.client);
    this.crud = new CrudModule(this.client);
  }
}

export const holyrics = Holyrics.getInstance();
export default holyrics;
