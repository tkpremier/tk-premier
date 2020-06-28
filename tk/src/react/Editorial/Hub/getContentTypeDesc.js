const getContentTypeDesc = (contentTypeId) => {
  switch (contentTypeId) {
    case 1:
      return 'Article';
    case 2:
      return 'Video';
    default:
      return null;
  }
};

export default getContentTypeDesc;
