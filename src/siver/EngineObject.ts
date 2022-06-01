import { Engine } from './Engine';

export class EngineObject {
  private _engine: Engine;

  get engine() {
    return this._engine;
  }

  constructor(engine: Engine) {
    this._engine = engine;
  }
}
