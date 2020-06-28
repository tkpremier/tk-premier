import getUrlQueries from '../../../utils/getUrlQueries';
import checkEnabled from '../../../PhillipsFilter/utils/checkEnabled';
import { getContentTypes, getDepartmentNames } from '../../../PhillipsFilter/utils/getItems';

const getFilterDimensions = (data = [], filterParameter = '') => {
  return [
    {
      dimension: 'contentType',
      label: 'Content Type',
      enabled: checkEnabled('contentType', filterParameter),
      items: getContentTypes(data, filterParameter),
      filterBy: ['contentType']
    },
    {
      dimension: 'departmentName',
      label: 'Department',
      enabled: checkEnabled('departmentName', filterParameter),
      items: getDepartmentNames(data, filterParameter),
      filterBy: ['departmentName']
    }
  ];
};

const getInitialState = (data = [], location = '') => {
  return {
    headerNavClicked: false,
    data,
    filterData: {
      relevantProps: [
        'contentType',
        'departmentId',
        'departmentName'
      ],
      filterDimensions: getFilterDimensions(data, getUrlQueries(location).filter)
    },
    sortOptions: [
      {
        label: 'Newest',
        value: 'date-desc',
        type: 'descending'
      },
      {
        label: 'Oldest',
        value: 'date-asc',
        type: 'ascending'
      }
    ],
    urlQueries: getUrlQueries(location)
  };
};

export default getInitialState;
