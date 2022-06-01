import MP4Box from 'mp4box';

const { EncodedVideoChunk } = window as any;

class MP4Source {
  private file: any;
  private info: any;
  private _info_resolver: any;
  private _onChunk: any;

  constructor(uri) {
    this.file = MP4Box.createFile();
    this.file.onError = console.error.bind(console);
    this.file.onReady = this.onReady.bind(this);
    this.file.onSamples = this.onSamples.bind(this);

    fetch(uri).then((response) => {
      // @ts-ignore
      const reader = response.body.getReader();
      let offset = 0;
      const mp4File = this.file;

      function appendBuffers({ done, value }) {
        if (done) {
          mp4File.flush();
          return;
        }

        const buf = value.buffer;
        buf.fileStart = offset;

        offset += buf.byteLength;

        mp4File.appendBuffer(buf);

        return reader.read().then(appendBuffers);
      }

      return reader.read().then(appendBuffers);
    });

    this.info = null;
    this._info_resolver = null;
  }

  onReady(info) {
    this.info = info;

    if (this._info_resolver) {
      this._info_resolver(info);
      this._info_resolver = null;
    }
  }

  getInfo() {
    if (this.info) return Promise.resolve(this.info);

    return new Promise((resolver) => {
      this._info_resolver = resolver;
    });
  }

  getAvccBox() {
    return this.file.moov.traks[0].mdia.minf.stbl.stsd.entries[0].avcC;
  }

  start(track, onChunk) {
    this._onChunk = onChunk;
    this.file.setExtractionOptions(track.id);
    this.file.start();
  }

  onSamples(track_id, ref, samples) {
    for (const sample of samples) {
      const type = sample.is_sync ? 'key' : 'delta';

      const chunk = new EncodedVideoChunk({
        type,
        timestamp: (sample.cts / sample.timescale) * 1000 * 1000,
        duration: (sample.duration / sample.timescale) * 1000 * 1000,
        data: sample.data,
      });

      this._onChunk(chunk);
    }
  }
}

class Writer {
  private data: Uint8Array;
  private idx: number;
  private size: number;

  constructor(size) {
    this.data = new Uint8Array(size);
    this.idx = 0;
    this.size = size;
  }

  getData() {
    if (this.idx !== this.size) throw 'Mismatch between size reserved and sized used';

    return this.data.slice(0, this.idx);
  }

  writeUint8(value) {
    this.data.set([value], this.idx);
    this.idx++;
  }

  writeUint16(value) {
    // TODO: find a more elegant solution to endianess.
    const arr = new Uint16Array(1);
    arr[0] = value;
    const buffer = new Uint8Array(arr.buffer);
    this.data.set([buffer[1], buffer[0]], this.idx);
    this.idx += 2;
  }

  writeUint8Array(value) {
    this.data.set(value, this.idx);
    this.idx += value.length;
  }
}

export class MP4Demuxer {
  private source: MP4Source;
  private track: any;

  constructor(uri) {
    this.source = new MP4Source(uri);
  }

  getExtraData(avccBox) {
    let i;
    let size = 7;
    for (i = 0; i < avccBox.SPS.length; i++) {
      size += 2 + avccBox.SPS[i].length;
    }
    for (i = 0; i < avccBox.PPS.length; i++) {
      size += 2 + avccBox.PPS[i].length;
    }

    const writer = new Writer(size);

    writer.writeUint8(avccBox.configurationVersion);
    writer.writeUint8(avccBox.AVCProfileIndication);
    writer.writeUint8(avccBox.profile_compatibility);
    writer.writeUint8(avccBox.AVCLevelIndication);
    writer.writeUint8(avccBox.lengthSizeMinusOne + (63 << 2));

    writer.writeUint8(avccBox.nb_SPS_nalus + (7 << 5));
    for (i = 0; i < avccBox.SPS.length; i++) {
      writer.writeUint16(avccBox.SPS[i].length);
      writer.writeUint8Array(avccBox.SPS[i].nalu);
    }

    writer.writeUint8(avccBox.nb_PPS_nalus);
    for (i = 0; i < avccBox.PPS.length; i++) {
      writer.writeUint16(avccBox.PPS[i].length);
      writer.writeUint8Array(avccBox.PPS[i].nalu);
    }

    return writer.getData();
  }

  async getConfig() {
    const info = await this.source.getInfo();

    // @ts-ignore
    this.track = info.videoTracks[0];

    const extraData = this.getExtraData(this.source.getAvccBox());

    const config = {
      codec: this.track.codec,
      codedHeight: this.track.track_height,
      codedWidth: this.track.track_width,
      description: extraData,
    };

    return Promise.resolve({
      config,
      duration: this.track.movie_duration * this.track.movie_timescale,
    });
  }

  start(onChunk) {
    this.source.start(this.track, onChunk);
  }
}
