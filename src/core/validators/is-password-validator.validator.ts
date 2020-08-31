// personally would love to regex the shit out of this function

export const IsValidatePassword = (value: string) => {
  if (value.length < 6) {
    return false;
  } else {
    return true;
  }
};
