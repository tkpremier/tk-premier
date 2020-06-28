import createInitialUserState from '../PhillipsUser/createInitialUserState';

export const defaultBuyNow = {
  active: false,
  buyNowSaleNumber: '',
  carouselAreaId: 0,
  carouselDesc: '',
  carouselId: 0,
  carouselItems: [],
  carouselTitle: '',
  carouselTypeId: 0,
  departmentId: 0,
  desc: '',
  displayOrder: 0,
  itemCount: 0,
  title: ''
};

export const editingState = departmentId => ({
  componentType: '',
  data: {},
  editing: false,
  isCarouselItem: false,
  saving: false,
  saved: false,
  method: 'POST',
  url: `/api/departments/${departmentId}/`,
  noBody: false,
  error: {}
});

const initialEditState = departmentId => ({
  editingComponent: editingState(departmentId)
});

const setInitialState = ({ editable, department, userJSON }) => {
  const userState = createInitialUserState({
    ...JSON.parse(userJSON)
  });
  const editState = initialEditState(department.departmentId);
  return {
    ...department,
    ...(!editable && { ...userState }),
    ...(editable && { ...editState }),
    editable
  };
};

export default setInitialState;
