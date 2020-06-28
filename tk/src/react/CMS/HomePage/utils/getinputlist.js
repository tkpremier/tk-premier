import { has, isNull, range } from 'lodash/fp';
import { defaultProps } from '../../../PhillipsCarousel/proptypes';


export default function getInputList(elementType, makersList) {
  const inputs = {
    buyNowCarousel(buyNowProps = {
      active: false, title: '', desc: '', carouselId: 0, displayOrder: 0
    }) {
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: buyNowProps.carouselId
        },
        {
          type: 'hidden',
          propName: 'carouselId',
          propValue: buyNowProps.carouselId
        },
        {
          type: 'hidden',
          propName: 'carouselAreaId',
          propValue: 1
        },
        {
          type: 'hidden',
          propName: 'carouselTypeId',
          propValue: 1
        },
        {
          type: 'hidden',
          propName: 'displayOrder',
          propValue: buyNowProps.displayOrder
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: buyNowProps.active
        },
        {
          type: 'markup',
          propName: 'carouselTitle',
          propValue: buyNowProps.carouselTitle,
          editorId: 'editor-buynow-name'
        }
      ];
    },
    sticky(stickyProps = {}) {
      const defaultSticky = isNull(stickyProps)
        ? {
          altText: '',
          id: 1,
          isActive: false,
          source: '',
          wrappingLink: ''
        }
        : stickyProps;
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: 1
        },
        {
          type: 'text',
          propName: 'source',
          label: 'Image Source',
          propValue: defaultSticky.source
        },
        {
          type: 'text',
          propName: 'wrappingLink',
          label: 'Promo Link',
          propValue: defaultSticky.wrappingLink
        },
        {
          type: 'text',
          propName: 'altText',
          label: 'Alt Copy',
          propValue: defaultSticky.altText
        },
        {
          type: 'radio',
          propName: 'isActive',
          propValue: defaultSticky.isActive
        }
      ];
    },
    slide(slideProps = {}) {
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: slideProps.id
        },
        {
          type: 'select',
          propName: 'displayOrder',
          label: 'Display Order',
          propValue: slideProps.displayOrder,
          list: range(0, slideProps.totalCount + 1).map(n => ({ value: n + 1, desc: `${n + 1}` }))
        },
        {
          type: 'text',
          propName: 'url',
          label: 'URL',
          propValue: slideProps.url
          // some change
        },
        {
          type: 'ImageInput',
          propName: 'imageUrl',
          propValue: slideProps.imageUrl,
          base64: null
        },
        {
          type: 'markup',
          propName: 'htmlCaption',
          propValue: slideProps.htmlCaption
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: slideProps.active
        }
      ];
    },
    featuredContent(itemProps = {}) {
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: itemProps.id || 0
        },
        {
          type: 'select',
          propName: 'displayOrder',
          propValue: itemProps.displayOrder || 0,
          label: 'Display Order',
          list: range(0, itemProps.totalCount + 1).map(n => ({ value: n + 1, desc: `${n + 1}` }))
        },
        {
          type: 'text',
          propName: 'url',
          propValue: itemProps.url || '',
          label: 'URL'
        },
        {
          type: 'ImageInput',
          propName: 'imageUrl',
          propValue: itemProps.imageUrl || '',
          base64: null
        },
        {
          type: 'markup',
          propName: 'htmlCaption',
          propValue: itemProps.htmlCaption || '',
          label: 'Caption'
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: itemProps.active || false,
          label: 'Active'
        },
        {
          type: 'hidden',
          propName: 'type',
          propValue: itemProps.type || ''
        }
      ];
    },
    video(videoProps = {}) {
      return [
        {
          label: 'id',
          type: 'hidden',
          propName: 'id',
          propValue: videoProps.id || 0
        },
        {
          label: 'Display Order',
          list: range(1, 4).map(n => ({
            'value': n,
            'desc': n
          })),
          propName: 'displayOrder',
          propValue: videoProps.displayOrder,
          type: 'select'
        },
        {
          label: 'active',
          propName: 'active',
          propValue: videoProps.active,
          type: 'radio'
        },
        {
          label: 'Video Url',
          propName: 'videoUrl',
          propValue: videoProps.videoUrl,
          type: 'text'
        },
        {
          label: 'Thumbnail Caption',
          propName: 'thumbnailCaption',
          propValue: videoProps.thumbnailCaption,
          type: 'text'
        },
        {
          editorId: `video-sale-info-editor${Math.floor(Math.random() * 1000)}`,
          label: 'Sale Info',
          propName: 'saleInfo',
          propValue: videoProps.saleInfo,
          type: 'markup'
        },
        {
          label: 'Caption',
          propName: 'htmlCaption',
          propValue: videoProps.htmlCaption,
          editorId: `video-html-caption-editor${Math.floor(Math.random() * 1000)}`,
          type: 'markup'
        },
        {
          base64: null,
          label: 'Thumbnail',
          propName: 'thumbnail',
          propValue: videoProps.thumbnail,
          toolTip: 'Thumbnails will display in 16 x 9 format',
          type: 'ImageInput'
        }
      ];
    },
    lowerBanner(bannerProps = {}) {
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: bannerProps.id
        },
        {
          type: 'text',
          propName: 'url',
          propValue: bannerProps.url
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: bannerProps.active
        },
        {
          type: 'ImageInput',
          propName: 'desktopImageUrl',
          propValue: bannerProps.desktopImageUrl,
          base64: null
        },
        {
          type: 'ImageInput',
          propName: 'mobileImageUrl',
          propValue: bannerProps.mobileImageUrl,
          base64: null
        }
      ];
    },
    carousel(carouselData = defaultProps) {
      const isBuyNow = carouselData.buyNowSaleNumber.length > 0;

      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: carouselData.carouselId
        },
        {
          type: 'hidden',
          propName: 'carouselAreaId',
          propValue: 1
        },
        {
          type: 'hidden',
          propName: 'carouselId',
          propValue: carouselData.carouselId
        },
        // conditionally adding different inputs for buyNow vs. regular carousel
        ...(isBuyNow ? [
          {
            type: 'markup',
            propName: 'carouselTitle',
            propValue: carouselData.carouselTitle,
            editorId: 'editor-buynow-name'
          },
          {
            type: 'markup',
            propName: 'carouselDesc',
            propValue: carouselData.carouselDesc,
            editorId: 'editor-buynow-description'
          }] : [
            {
              label: 'Title',
              type: 'text',
              propName: 'carouselTitle',
              propValue: carouselData.carouselTitle
            }
          ]),
        ...(!isBuyNow ? [
          {
            type: 'select',
            propName: 'carouselTypeId',
            propValue: carouselData.carouselTypeId,
            label: 'Carousel Type',
            list: [
              { value: 1, desc: 'Lot' },
              { value: 2, desc: 'Artist' }
            ]
          },
          {
            type: 'select',
            propName: 'displayOrder',
            propValue: carouselData.displayOrder,
            label: 'Display Order',
            list: [{ value: 1, desc: '1' }, { value: 2, desc: '2' }]
          }]
          : [
            {
              type: 'hidden',
              propName: 'carouselTypeId',
              propValue: 1
            },
            {
              type: 'hidden',
              propName: 'displayOrder',
              propValue: carouselData.displayOrder
            }
          ]),
        {
          type: 'radio',
          propName: 'active',
          propValue: carouselData.active
        }
      ];
    },
    carouselItem(carouselItem = {
      buyNowSaleNumber: '',
      saleNumber: '',
      lotNumber: 0,
      lotNumberFull: '',
      carouselItemId: 0,
      carouselId: 0,
      active: false,
      displayOrder: 1,
      totalCount: 0
    }) {
      return [
        {
          type: 'hidden',
          propName: 'id',
          propValue: carouselItem.carouselItemId || 0
        },
        {
          type: 'hidden',
          propName: 'carouselItemId',
          propValue: carouselItem.carouselItemId || 0
        },
        {
          type: 'hidden',
          propName: 'carouselId',
          propValue: carouselItem.carouselId
        },
        {
          type: 'text',
          propName: 'saleNumber',
          propValue: carouselItem.saleNumber || '',
          disabled: true
        },
        {
          type: 'text',
          propName: 'lotNumber',
          propValue: carouselItem.lotNumber || ''
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: carouselItem.active || false
        },
        {
          type: 'select',
          propName: 'displayOrder',
          label: 'Display Order',
          propValue: carouselItem.displayOrder || 0,
          list: range(0, carouselItem.totalCount + 1).map(n => ({ value: n + 1, desc: `${n + 1}` }))
        }
      ];
    },
    lot(lotData = {}) {
      return [
        {
          type: 'hidden',
          propName: 'carouselItemId',
          propValue: lotData.carouselItemId || 0
        },
        {
          type: 'hidden',
          propName: 'carouselId',
          propValue: lotData.carouselId
        },
        {
          type: 'text',
          propName: 'saleNumber',
          propValue: lotData.saleNumber || ''
        },
        {
          type: 'text',
          propName: 'lotNumber',
          propValue: lotData.lotNumber || ''
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: lotData.active || false
        },
        {
          type: 'select',
          label: 'Display Order',
          list: range(0, lotData.totalCount + 1).map(n => ({ value: n + 1, desc: `${n + 1}` })),
          propName: 'displayOrder',
          propValue: lotData.displayOrder || 0
        }
      ];
    },
    maker(makerData = {}) {
      return [
        {
          type: 'hidden',
          propName: 'carouselItemId',
          propValue: makerData.carouselItemId || 0
        },
        {
          type: 'hidden',
          propName: 'carouselId',
          propValue: makerData.carouselId || 0
        },
        {
          type: 'AutoComplete',
          propName: 'makerId',
          propValue: makerData.makerId || 0,
          descProp: 'makerName',
          valueProp: 'makerId',
          label: 'Artist',
          list: makersList,
          comparator(val) {
            return maker => maker.makerId === val;
          }
        },
        {
          type: 'radio',
          propName: 'active',
          propValue: makerData.active || false
        },
        {
          type: 'select',
          propName: 'displayOrder',
          propValue: makerData.displayOrder || 0,
          label: 'Display Order',
          list: range(0, makerData.totalCount + 1).map(n => ({ value: n + 1, desc: `${n + 1}` }))
        }
      ];
    },
    delete(elementProps) {
      let { id } = elementProps;
      id = has('carouselItemId')(elementProps)
        ? `${elementProps.carouselId}-${elementProps.carouselItemId}`
        : id;
      return [
        {
          type: 'delete',
          propName: 'id',
          propValue: id
        },
        {
          type: 'json',
          propName: 'element',
          propValue: JSON.stringify(elementProps)
        }
      ];
    },
    default() {
      console.warn(`The type: ${elementType}, you provided to getInputList does not exist.`);
      return [];
    }
  };
  return (inputs[elementType] || inputs.default);
}
