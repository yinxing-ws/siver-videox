import { FrameData } from './FrameData';

/**
 * Video Frame
 * 区别于webcodecs自带的VideoFrame
 */
export class VFrame {
  static fromVideoFrame(vf: VideoFrame) {
    if (!vf.codedWidth || !vf.codedHeight || !vf.format) return null;

    const size = vf.allocationSize();
    if (!size) return null;

    const frameData = new FrameData(vf.codedWidth, vf.codedHeight, vf.format);

    const duration = vf.duration ? vf.duration / 1000 : null;
    const timestamp = (vf.timestamp || 0) / 1000;
    const vFrame = new VFrame(duration, timestamp, frameData);

    const data = new Uint8Array(size);
    vf.copyTo(data);
    vFrame.setData(data);

    return vFrame;
  }

  // duration in ms
  duration: number | null;
  // timestamp in ms
  timestamp: number;

  frameData: FrameData;

  constructor(duration: number | null, timestamp: number, frameData: FrameData) {
    this.duration = duration;
    this.timestamp = timestamp;
    this.frameData = frameData;
  }

  setData(data: Uint8Array) {
    this.frameData.setData(data);
  }

  toVideoFrame() {
    const { width, height, format, data } = this.frameData;

    return new VideoFrame(data, {
      duration: this.duration ? this.duration * 1000 : undefined,
      timestamp: this.timestamp * 1000,
      codedWidth: width,
      codedHeight: height,
      displayWidth: width,
      displayHeight: height,
      format,
    });
  }
}
