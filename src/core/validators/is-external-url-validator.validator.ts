export const IsValidExternalPath = (path: string) => {
  /^(https?:|mailto:|tel:)/.test(path);
};
