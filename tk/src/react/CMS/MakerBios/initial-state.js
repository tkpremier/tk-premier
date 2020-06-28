export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
}

export const globalState = {
  token: null,
  xsrf: null,
  baseUrl: 'https://devcms.phillips.com',
  auctionEdited: false
}

export const formErrors = {
  wrappingLink: false,
  source: false,
  altText: false,
  title: false,
  hasErrors: false
}

export const makerBios = {
  makerBios: [],
  progressIndicator: false,
  selectedMakerBio: {
    isConsignmentMaker: false,
    insights: [
      {
        insightId: 0,
        insight: 'Maker insight text'
      }
    ],
    biography: 'Maker Bio...',
    firstQuote: 'First quote...',
    secondQuote: 'Second quote...',
    isFeatured: false,
    landingDescription: 'Landing description...',
    artistImageBlocked: false,
    makerId: 0,
    makerName: 'Maker Name',
    nationality: '',
    birthYear: '',
    deathYear: '',
    saleNumber: 0,
    lotNumber: 0,
    lotNumberSuffix: '',
    imagePath: '',
    cloudinaryTransformation: '',
    useCloudinary: false
  }
}
