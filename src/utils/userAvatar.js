const userAvatar = (name) => {
  const namesArray = name.split(' ');
  const initials = namesArray.map((word) => word.charAt(0).toUpperCase());
  return initials.join('');
};
