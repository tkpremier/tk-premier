export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
};

export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  auctionEdited: false
};

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
};

export const lotComponent = {
  active: true,
  saleNumber: 'string',
  objectNumber: 'string',
  componentContainerId: 0,
  displayOrder: 1,
  componentData: [
    {
      active: true,
      componentId: 0,
      displayOrder: 1,
      htmlCaption: '',
      imageUrl: ''
    }
  ],
  componentType: 'RichText',
  title: 'string'
};

export const lotComponents = {
  auctions: [],
  lots: [],
  lotComponents: [{ ...lotComponent }],
  lotComponentEdited: false,
  progressIndicator: false,
  selectedAuction: {
    auctionTitle: 'Selected Auction',
    saleNumber: '',
    startDate: '',
    auctionSelected: false
  },
  selectedLot: {
    auctionLotPublicId: 0,
    lotNumber: 1,
    lotNumberFull: '1',
    lotNumberSuffix: '',
    lotSelected: false,
    objectNumber: 0,
    saleNumber: ''
  },
  selectedLotComponent: {
    active: true,
    objectNumber: '0',
    componentContainerId: 0,
    displayOrder: 1,
    componentData: [
      {
        active: true,
        componentId: 1,
        displayOrder: 1,
        htmlCaption: ' ',
        imageUrl: ''
      }
    ],
    componentType: 'RichTextCarousel',
    title: ''
  },
  selectedLotComponentData: {
    active: true,
    componentId: 0,
    displayOrder: 1,
    htmlCaption: '',
    imageUrl: ''
  },
  noLots: false
};

export const richTextBlank = {
  active: true,
  objectNumber: '0',
  componentContainerId: 0,
  displayOrder: 1,
  componentData: [
    {
      active: true,
      componentId: 3,
      displayOrder: 1,
      htmlCaption: ' ',
      imageUrl: ''
    }
  ],
  componentType: 'RichText',
  title: 'Rich Text Component'
};

export const carouselBlank = {
  active: true,
  objectNumber: '0',
  componentContainerId: 0,
  displayOrder: 1,
  componentData: [
    {
      active: true,
      componentId: 0,
      displayOrder: 1,
      htmlCaption: '',
      imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg'
    }
  ],
  componentType: 'Carousel',
  title: 'Carousel Component'
};

export const richTextCarouselBlank = {
  active: true,
  objectNumber: '0',
  componentContainerId: 0,
  displayOrder: 1,
  componentData: [
    {
      active: true,
      componentId: 0,
      displayOrder: 1,
      htmlCaption: '',
      imageUrl: ''
    }
  ],
  componentType: 'RichTextCarousel',
  title: 'Rich Text Carousel Component'
};

export const videoBlank = {
  active: true,
  objectNumber: '0',
  componentContainerId: 0,
  displayOrder: 1,
  componentData: [
    {
      active: true,
      componentId: 0,
      displayOrder: 1,
      htmlCaption: ' ',
      imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg'
    }
  ],
  componentType: 'Video',
  title: 'Video Component'
};

export const carouselItemBlank = {
  active: true,
  componentId: 0,
  displayOrder: 1,
  htmlCaption: '',
  imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg'
};

export const richTextCarouselItemBlank = {
  active: true,
  componentId: 0,
  displayOrder: 1,
  htmlCaption: '',
  imageUrl: ''
};
