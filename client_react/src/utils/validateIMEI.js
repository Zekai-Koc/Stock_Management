export const validateIMEI = (imei) => {
   const isValidLength = /^\d{15}$/.test(imei);

   const isValidChecksum = (number) => {
      let sum = 0;
      let shouldDouble = false;
      for (let i = number.length - 1; i >= 0; i--) {
         let digit = parseInt(number.charAt(i), 10);
         if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
         }
         sum += digit;
         shouldDouble = !shouldDouble;
      }
      return sum % 10 === 0;
   };

   const isValid = isValidLength && isValidChecksum(imei);
   return {
      isValid,
      errorMessage: isValid
         ? ""
         : "IMEI must be a valid 15-digit number with a valid checksum.",
   };
};
