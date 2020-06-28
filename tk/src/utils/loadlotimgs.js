const imgError = require('./imgerror');

function loadLotImgs(imgs) {
  imgs.each((i, img) => {
    const $img = $(img);

    $img.on('error', () => {
      imgError(img, 'item');
      $img.parent('a').removeClass('modal-zoom').attr({ href: '#', target: '' });
    });

    if (img.complete) {
      $img.parents('.image, .thumb-slide').removeClass('pending');
    } else {
      $img.load(() => {
        $img.parents('.image, .thumb-slide').removeClass('pending');
      });
    }
  });
}

module.exports = loadLotImgs;
