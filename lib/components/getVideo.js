const VIDEO_URL = 'assets/videos/video3.mp4';

module.exports = function(app, opt = {}) {
  const video = document.createElement('video');
  const source = document.createElement('source');
  source.src = VIDEO_URL;
  source.type = 'video/mp4';

  video.appendChild(source);

  video.onloadedmetadata = metaDataloaded;
  video.setAttribute('playsinline', '');
  video.setAttribute('autoplay', '');
  video.setAttribute('preload', '');
  video.loop = true;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const texture = new THREE.Texture(canvas);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.NearestFilter;

  let isReady = false;
  let isPlaying = false;

  return {
    texture,
    update (dt, state) {
      if (isReady && isPlaying) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        texture.needsUpdate = true;
      }
    }
  }

  function metaDataloaded () {
    video.width = video.videoWidth;
    video.height = video.videoHeight;
    canvas.width = video.width;
    canvas.height = video.height;
    texture.needsUpdate = true;
    isReady = true;
    isPlaying = true;
  }
}
