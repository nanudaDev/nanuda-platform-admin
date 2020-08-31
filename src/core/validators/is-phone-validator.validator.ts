export const IsValidatePhone = (value: string) => {
  // check if only numbers
  if (value.match('.*[a-z].*')) {
    return 'letters';
  }
  if (value.length < 10) {
    return 'length';
  }
  return value;
};
