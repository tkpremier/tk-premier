import React from 'react';

function goToDepartment(e) {
  location.assign(`/Department/React?departmentId=${e.target.value}`)
}

const Switch = () => (
  <select onChange={goToDepartment}>
    <option value={12}>Watches</option>
    <option value={4}>Jewels</option>
    <option value={6}>Latin America</option>
  </select>
);

export default Switch;
