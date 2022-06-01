import { Engine } from './Engine';
import loadMp4 from './loaders/mp4Loader';

export class ResourceManager {
  constructor(public readonly engine: Engine) {}

  loadMp4(url: string) {
    return loadMp4(url);
  }
}
