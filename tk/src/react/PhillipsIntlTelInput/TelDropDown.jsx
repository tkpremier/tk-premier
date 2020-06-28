import React, { useEffect, forwardRef } from 'react';

const TelDropDown = forwardRef(({ initialCountry, initialValue }, ref) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.intlTelInput) {
      ref.iti = window.intlTelInput(ref.current, {
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.4/js/utils.js',
        initialCountry: initialCountry
      });
    }
  }, []);
  return (
    <input type="tel" ref={ref} defaultValue={initialValue} />
  );
});

export default TelDropDown;
