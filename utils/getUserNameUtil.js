export const getUserNameFromEmail = (email) => {
  const name = email.split('@')[0];
  return name;
};
