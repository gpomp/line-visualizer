// const getBox = require('./getBox');
const query = require('../util/query');
const getLine = require('./getLine');
const getVideo = require('./getVideo');
module.exports = function ({ app, components }) {
  if (!query.gui) {
    const ui = document.querySelector('.dg.ac');
    ui.style.display = 'none';
  } else {
    const ui = document.querySelector('.dg.ac');
    ui.style.zIndex = 1000;
  }
  // const box = components.add(getBox(app));
  const video = components.add(getVideo(app));
  const line = components.add(getLine(app, { video }));

};
