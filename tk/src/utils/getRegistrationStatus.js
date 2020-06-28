/*
RegistrationStatusID StatusDesc
  1 New
  2 Pending
  3 Accepted
  4 Rejected
*/

export default function getRegistrationStatusDesc(id = 0) {
  const statuses = [null, 'New', 'Pending', 'Accepted', 'Rejected'];
  return statuses[id];
}
