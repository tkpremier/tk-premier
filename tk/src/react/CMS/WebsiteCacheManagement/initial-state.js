'use strict'

export const alert = {
  type: '',
  snackbarStatus: '',
  message: '',
  snackbarOpen: false
}

export const globalState = {
  websiteUrl: 'http://localhost/'
}

export const cacheEndpoints = [
  {
    sectionName: 'Auction Pages',
    items: [
      {
        name: 'Auction and Lots Page',
        endpoint: '/Cache/PurgeAuctionAndLotsPage',
        hasInput: true,
        input: {
          label: "Sale Number",
          key: "saleNumber"
        }
      },
      {
        name: 'Past Auctions',
        endpoint: '/Cache/PurgePastAuctions',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Current Auctions',
        endpoint: '/Cache/PurgeCurrentAuctions',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Exhibitions',
        endpoint: '/Cache/PurgeExhibitions',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: ' Auction Catalogues',
        endpoint: '/Cache/PurgeAuctionCatalogues',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Catalogue Subscriptions',
        endpoint: '/Cache/PurgeCatalogueSubscriptions',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Calendar Events',
        endpoint: '/Cache/PurgeCurrentCalendarEvents',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Lots Cache',
        endpoint: '/Cache/PurgeAuctionLots',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'All Upcoming Lots Page',
        endpoint: '/Cache/PurgeAllUpcomingLots',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      }
      // {
      //   name: 'Purge All Auction Caches',
      //   endpoint: '/Cache/PurgeAllAuctions',
      //   hasInput: false, 
      //input: {
      //   label: "",
      //   key: ""
      // }
      // }      
    ]
  },
  {
    sectionName: 'Homepage',
    items: [
      {
        name: 'Homepage',
        endpoint: '/Cache/PurgeHomePageContent',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Sticky Image',
        endpoint: '/Cache/PurgeStickyImage',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      }
    ]
  },
  {
    sectionName: 'Artists & Makers',
    items: [
      {
        name: 'Artists & Makers Page',
        endpoint: '/Cache/PurgeMakerLandingPage',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Artist Headlines',
        endpoint: '/Cache/PurgeMakerHeadlines',
        hasInput: true,
        input: {
          label: "Maker Id",
          key: "makerId"
        }
      },
      {
        name: 'Artist Buletin',
        endpoint: '/Cache/PurgeMakerBulletin',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      }
    ]
  },
  {
    sectionName: 'Various',
    items: [
      {
        name: 'Press Releases',
        endpoint: '/Cache/PurgePressReleases',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Videos',
        endpoint: '/Cache/PurgeVideos',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Locations',
        endpoint: '/Cache/PurgeLocations',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Departments',
        endpoint: '/Cache/PurgeDepartments',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Team',
        endpoint: '/Cache/PurgeTeam',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      },
      {
        name: 'Editorial Content(flockler articles)',
        endpoint: '/Cache/PurgeEditorialContent',
        hasInput: false,
        input: {
          label: "",
          key: ""
        }
      }
    ]
  }
]

export const selectedCacheEndpoint = {
  name: '',
  endpoint: '',
  hasInput: false,
  input: {
    label: "",
    key: ""
  }
}