precision highp float;

varying vec2 vUv;
varying vec3 vCol;

void main () {
  gl_FragColor = vec4(vCol, 1.0);
}
