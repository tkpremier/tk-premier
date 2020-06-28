
export default function (response) {
  try {
    if (!response.ok) {
      return response.json().then((error) => {
        console.error('API ERROR: ', error);
        throw new Error(error.message);
      });
    }
    return response.json();
  } catch (e) {
    console.log('error: ', e);
    throw new Error(e);
  }
}
