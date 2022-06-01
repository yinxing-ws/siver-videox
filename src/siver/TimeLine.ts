import { EngineObject } from './EngineObject';
import { Track } from './Track';

export class TimeLine extends EngineObject {
  private _tracks: Array<Track>;

  constructor(engine) {
    super(engine);

    this._tracks = [];
  }
}
