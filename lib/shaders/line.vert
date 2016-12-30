#define M_PI 3.1415926535897932384626433832795
#define RADIUS 100.0

uniform sampler2D tVideo;

varying vec2 vUv;
varying vec3 vCol;

#pragma glslify: luma = require(glsl-luma) 

void main() {

  vec3 pos = position;
  float theta = 2.0 * M_PI * uv.x;
  float phi = M_PI * uv.y;

  pos.x = cos(theta) * sin(phi) * RADIUS;
  pos.z = sin(theta) * sin(phi) * RADIUS;
  pos.y = -cos(phi) * RADIUS;
  vCol = texture2D(tVideo, uv).rgb;
  pos += normalize(pos) * (luma(vCol) - 0.5) * 20.0;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
