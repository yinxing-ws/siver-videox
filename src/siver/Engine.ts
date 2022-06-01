import { ResourceManager } from './ResourceManager';
import { VFrame } from './video';
import { VideoTrack } from './VideoTrack';

// 媒体对象
export class Engine {
  //
  _canvas: HTMLCanvasElement;

  resourceManager: ResourceManager;

  _trackList: VideoTrack[];

  // 时间
  time: number;
  totalTime: number;

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas;

    this.resourceManager = new ResourceManager(this);
  }

  tPlay = (frames: VFrame[]) => {
    let preStamp = 0;
    const ctx = this._canvas.getContext('2d');
    if (!ctx) return;
    
    const renderFrame = async () => {
      const frame = frames.shift();

      if (!frame) return;

      // 等待时间
      await new Promise((r) => {
        setTimeout(r, frame.timestamp - preStamp);
      });


      preStamp = frame.timestamp;

      // 在canvas上绘制帧
      const videoFrame = frame.toVideoFrame();
      console.log(videoFrame.codedWidth, videoFrame.codedHeight);

      // @ts-ignore
      ctx.drawImage(videoFrame, 0, 0);
      videoFrame.close();

      setTimeout(renderFrame, 0);
    };

    renderFrame();
  };

  play = () => {};

  pause = () => {};

  setTime = () => {};
}
