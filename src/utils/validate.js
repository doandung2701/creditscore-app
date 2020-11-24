const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
const isEmpty = (text) => {
  //null or undefined
  return !text || text === ""
}
const validatePhoneNumber=(phone)=>{
  return phoneRegExp.test(phone);
}

const validateName = (name) => {
  const regex = /^[a-z A-Z]+$/;
  return regex.test(name);
}
export {
  phoneRegExp,
  validateEmail,
  validateName,
  isEmpty,
  validatePhoneNumber
}
