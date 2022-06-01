import { MP4Demuxer } from './libc/mp4Demuxer';

import { VFrame } from '../video';

export default (videoSrc: string): Promise<VFrame[]> => {
  return new Promise((resolve) => {
    const demuxer = new MP4Demuxer(videoSrc);

    let totalDuration = 0;
    let preTimeStamp = 0;
    const frameList: VFrame[] = [];

    const decoder = new VideoDecoder({
      output: (frame) => {
        const timestamp = frame.timestamp || 0;

        const isEnd = timestamp + timestamp - preTimeStamp === totalDuration;
        preTimeStamp = timestamp;

        const vFrame = VFrame.fromVideoFrame(frame);
        frame.close();
        if (!vFrame) return;

        frameList.push(vFrame);

        if (isEnd) {
          resolve(frameList);
        }
      },
      error: () => {},
    });

    demuxer.getConfig().then(({ config, duration }) => {
      totalDuration = duration;

      decoder.configure(config);
      demuxer.start((chunk) => {
        decoder.decode(chunk);
      });
    });
  });
};
