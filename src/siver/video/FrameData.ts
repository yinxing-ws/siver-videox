import { nv12ToRgba } from './libc/codec';

export class FrameData {
  width: number;
  height: number;
  format: VideoPixelFormat;
  data: Uint8Array;

  constructor(width: number, height: number, format: VideoPixelFormat) {
    this.width = width;
    this.height = height;
    this.format = format;
  }

  setData(data: Uint8Array) {
    this.data = data;
  }

  convertToRGBA() {
    if (this.format === 'NV12') {
      this.format = 'RGBA';
      this.data = nv12ToRgba(this.data, this.width, this.height);
    }
  }
}
