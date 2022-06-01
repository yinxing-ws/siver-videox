// 这里RBG~[0, 255], Y~[16,235], UV~[16,239]
export const yuv2rgb = (Y: number, U: number, V: number): [number, number, number] => {
  const f = (n: number) => Math.max(Math.min(255, n), 0);

  const R = 1.164 * (Y - 16) + 1.596 * (V - 128);
  const G = 1.164 * (Y - 16) - 0.813 * (V - 128) - 0.391 * (U - 128);
  const B = 1.164 * (Y - 16) + 2.018 * (U - 128);
  return [f(R), f(G), f(B)];
};

/**
 * NV12, 422, Y1Y2Y3Y4U1V1U2V2U3V3U4V4
 * rgba, 4444
 * in size: width * height * 1.5
 * out size: width * height * 4
 * @param data
 * @param width
 * @param height
 */
export const nv12ToRgba = (data: Uint8Array, width: number, height: number): Uint8Array => {
  const total = width * height;
  const ret = new Uint8Array(total * 4);

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const index = row * width + col;
      const uvRow = Math.floor(row / 2);
      const uvCol = Math.floor(col / 2);
      const uvIndex = (uvRow * width) / 2 + uvCol;
      const Y = data[index];
      const U = data[total + uvIndex * 2];
      const V = data[total + uvIndex * 2 + 1];

      const [R, G, B] = yuv2rgb(Y, U, V);
      const retIndex = index * 4;
      ret[retIndex] = R;
      ret[retIndex + 1] = G;
      ret[retIndex + 2] = B;
      ret[retIndex + 3] = 255;
    }
  }

  return ret;
};
