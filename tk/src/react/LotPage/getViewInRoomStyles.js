import { find, sample } from 'lodash';

const PERSPECTIVE_CONSTANT = 0.02;
const RACKSPACE_URL = 'https://8675fa3b12fbaae97df1-49af760ec3cce3b92480c70a3569b570.ssl.cf2.rackcdn.com/view_in_room/';
const WALL_PERCENTAGE = 0.75;
const PERSPECTIVE_DATA = [
  {
    position: 'left',
    referenceImg: `${RACKSPACE_URL}Ross_left.png`,
    heightCm: 183,
    heightPx: 549,
    widthPx: 148
  },
  {
    position: 'right',
    referenceImg: `${RACKSPACE_URL}Ross_right.png`,
    heightCm: 183,
    heightPx: 549,
    widthPx: 190
  },
  {
    position: 'left',
    referenceImg: `${RACKSPACE_URL}Jed_left.png`,
    heightCm: 185,
    heightPx: 555,
    widthPx: 273
  },
  {
    position: 'right',
    referenceImg: `${RACKSPACE_URL}Jed_right.png`,
    heightCm: 185,
    heightPx: 555,
    widthPx: 273
  },
  {
    position: 'left',
    referenceImg: `${RACKSPACE_URL}Girls_left.png`,
    heightCm: 172,
    heightPx: 516,
    widthPx: 328
  },
  {
    position: 'right',
    referenceImg: `${RACKSPACE_URL}Girls_right.png`,
    heightCm: 172,
    heightPx: 516,
    widthPx: 328
  }
];

const calcAspectRatio = (width, height) => height / width;

const getImageHeight = (lot, reference) => (
  Math.ceil(lot.height * (reference.heightPx / reference.heightCm))
);

const getImageWidth = (height, aspectRatio) => Math.ceil(height / aspectRatio);

const applyPerspective = (dimension) => Math.ceil(dimension - (dimension * PERSPECTIVE_CONSTANT));

const calcImageDimensions = (lot, reference) => {
  const height = applyPerspective(getImageHeight(lot, reference));
  return { height, width: getImageWidth(height, calcAspectRatio(lot.width, lot.height)) };
};

const getImgUrl = (lot, dimensions) => (
  { lotImgUrl: `${lot.image}/${dimensions.width}/${dimensions.height}/false/false/false` }
);

const getImgPosition = ({ height, width }) => {
  return {
    bottom: Math.ceil((window.innerHeight * WALL_PERCENTAGE - height) * 0.425),
    marginLeft: Math.ceil(width / 2)
  };
};

const calcLotImgAttributes = (lot, dimensions, wallDimensions) => {
  return {
    ...dimensions,
    ...getImgUrl(lot, dimensions),
    ...getImgPosition(dimensions, wallDimensions)
  };
};

const calcReferenceStyles = (reference, lotImgDimensions) => {
  const referenceOffset = (lotImgDimensions.width / 2 + reference.widthPx + 25);
  return { referenceOffset, ...reference };
};

const getScreenSize = () => {
  const mediaQueries = [
    { size: 'small', queryString: 'screen and (max-height: 600px)' },
    { size: 'medium', queryString: 'screen and (max-height: 850px) and (min-height: 600px)' },
    { size: 'large', queryString: 'screen and (max-height: 1280px) and (min-height: 850px)' },
    { size: 'extraLarge', queryString: 'screen and (min-height: 1280px)' }
  ];
  return find(mediaQueries, (query) => window.matchMedia(query.queryString).matches);
};

const scaleImageByViewport = ({ size }) => {
  const scales = {
    small: 0.5,
    medium: 0.75,
    large: 1,
    extraLarge: 1.25
  };
  return scales[size] || 1;
};

const scaleImageByLotHeight = ({ height }) => {
  const viewport = getScreenSize();
  const maxHeights = {
    small: 152,
    medium: 183,
    large: 213,
    extraLarge: 244
  };
  let scale = 1;
  if (height > maxHeights[viewport.size]) {
    scale = maxHeights[viewport.size] / height;
  }
  return scale;
};

const applyViewportScale = (reference) => {
  const { heightPx, widthPx } = reference;
  const scale = scaleImageByViewport(getScreenSize());
  return {
    ...reference,
    heightPx: heightPx * scale,
    widthPx: widthPx * scale
  };
};

const applyLotScale = (reference, lot) => {
  const [refHeightPx, refWidthPx] = [reference.heightPx, reference.widthPx];
  const scale = scaleImageByLotHeight(lot);
  return {
    ...reference,
    heightPx: refHeightPx * scale,
    widthPx: refWidthPx * scale
  };
};

export default (lot, reference = sample(PERSPECTIVE_DATA)) => {
  const scaledRef = applyLotScale(applyViewportScale(reference), lot);
  const lotImgDimensions = calcImageDimensions(lot, scaledRef);
  return {
    ...calcReferenceStyles(scaledRef, lotImgDimensions),
    ...calcLotImgAttributes(lot, lotImgDimensions, scaledRef)
  };
};
