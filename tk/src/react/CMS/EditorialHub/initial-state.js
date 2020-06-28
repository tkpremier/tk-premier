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

export const editorials = {
  progressIndicator: false,
  editorials: [],
  editorialsImageUpload: {
    preview: '',
    componentId: ''
  },
  selectedEditorial: {
    active: true,
    title: 'New Editorial'
  },
  selectedComponent: {
    // componentId: -1,
    title: 'New Component',
    active: true
  }
};


// {
//   "componentContainerId": int,
//   "componentData": [{
        // "active": bool,
        // "componentId": int,
        // "displayOrder": int,
        // "htmlCaption": string,
        // "imageUrl": string,
        // "url": string
        // "videoTitle": string
//    }],
//   "componentType": int,
//   "displayOrder": int,
//   "active": bool
// }

// {
//   featuredSection = 1,
//   video = 2,
//   articleTextLeft = 3,
//   articleTextRight = 4,
//   articleGridThreeItems = 5
// }

export const editorialDataBlank1 = {
  active: true,
  componentId: 1,
  displayOrder: 1,
  htmlCaption: '<pre>Eyebrow</pre><h2>Headline</h2><p>description</p>',
  imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg',
  itemType: 'Article',
  title: 'Editorial One',
  url: 'https://www.phillips.com'
};

export const editorialDataBlank2 = {
  active: true,
  componentId: 2,
  displayOrder: 2,
  htmlCaption: '<pre>Eyebrow</pre><h2>Headline</h2><p>description</p>',
  imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg',
  itemType: 'Article',
  title: 'Editorial Two',
  url: 'https://www.phillips.com'
};

export const editorialDataBlank3 = {
  active: true,
  componentId: 3,
  displayOrder: 3,
  htmlCaption: '<pre>Eyebrow</pre><h2>Headline</h2><p>description</p>',
  imageUrl: 'https://phillips.vo.llnwd.net/v1/web_prod/images/placeholders/temp-image.jpg',
  itemType: 'Article',
  title: 'Editorial Three',
  url: 'https://www.phillips.com'
};

export const featuredEditorial = {
  active: true,
  componentContainerId: 0,
  componentData: [editorialDataBlank1, editorialDataBlank2, editorialDataBlank3],
  componentType: 1,
  displayOrder: 1,
  title: 'Main Feature'
};

export const videoDataBlank = {
  active: true,
  componentId: 1,
  displayOrder: 1,
  htmlCaption: '<pre>Eyebrow</pre><h2>Headline</h2><p>description</p>',
  imageUrl: 'https://player.vimeo.com/video/421889238',
  itemType: 'Article',
  title: 'Editorial One',
  url: 'https://www.phillips.com'
}

export const videoEditorial = {
  active: true,
  componentContainerId: 0,
  componentData: [videoDataBlank],
  componentType: 2,
  displayOrder: 1,
  title: 'Video'
};

export const featuredSideEditorial = {
  active: true,
  componentContainerId: 0,
  componentData: [editorialDataBlank1],
  componentType: 4,
  displayOrder: 1,
  title: 'Full Width Feature'
};

export const gridItemEditorial = {
  active: true,
  componentContainerId: 0,
  componentData: [editorialDataBlank1, editorialDataBlank2, editorialDataBlank3],
  componentType: 5,
  displayOrder: 1,
  title: 'Curated Group of Articles'
};
