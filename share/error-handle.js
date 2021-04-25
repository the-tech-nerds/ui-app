export function serverError(errMessage) {
   const matches = errMessage.match(/\[(.*?)\]/);
   if (matches) {
      return matches[1].replace(/['"]+/g, '');
   } else {
      return undefined;
   }
}

export function serverValidation(errMessage) {
   const matches = errMessage.match(/\{(.*?)\}/);
   if (matches) {
      return matches[1].replace(/{'"}+/g, []);
   } else {
      return undefined;
   }
}