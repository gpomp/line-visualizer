const glslify = require('glslify');

module.exports = function (app, opt = {}) {
  const ctn = new THREE.Object3D();
  const geom = getLineGeometry();
  const video = opt.video;
  const mat = new THREE.ShaderMaterial({
    vertexShader: glslify('../shaders/line.vert'),
    fragmentShader: glslify('../shaders/line.frag'),
    uniforms: {
      tVideo: { type: 't', value: video.texture }
    }
  });

  const line = new THREE.Line(geom, mat);
  ctn.add(line);

  return {
    object3d: ctn,
    update (dt, state) {

    }
  }

  function getLineGeometry () {

    const geom = new THREE.BufferGeometry();

    const w = 256;
    const h = 256;
    const vw = 320;
    const vh = 320;
    const vw1 = vw + 1;
    const vh1 = vh + 1;
    const hw = w / 2;
    const hh = h / 2;
    const xs = -hw;
    const ys = -hh;
    const wSeg = w / vw1;
    const hSeg = h / vh1;

    const vertices = new Float32Array( vw1 * vh1 * 3 );
    const uvs = new Float32Array( vw1 * vh1 * 2 );

    let offset = 0;
    let offset2 = 0;
    let dir = 1;

    for (var y = 0; y < vh1; y++) {
      const ypos = ys + y * hSeg;
      for (var x = 0; x < vw1; x++) {
        const stx = dir === 1 ? xs : xs + w;
        const xpos = stx + dir * x * wSeg;

        // vertices[ offset   ] = xpos;
        // vertices[offset + 1] = ypos;

        uvs[ offset2     ] = (xpos + hw) / w;
        uvs[ offset2 + 1 ] = ( (ypos + hh) / h );

        offset += 3;
        offset2 += 2;
      }
      dir *= -1;
    }
    geom.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    geom.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
    geom.computeBoundingBox();

    return geom;
  }
}
