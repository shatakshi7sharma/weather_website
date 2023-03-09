import cryptoJs from "crypto-js";
import moment from 'moment/moment';
import momentTz from 'moment-timezone';
import jwt_decode from 'jwt-decode';
import { useSelector } from "react-redux";
import { getCookie } from "./cookies";
export const encrypt = (msg) => {
  const pass = cryptoJs.enc.Utf8.parse("08277A08B0ABA7070VH28A5FCED7396D");
  const iv = cryptoJs.enc.Utf8.parse("D9062EA86462LL7E");
  try {
    var options = { mode: cryptoJs.mode.CBC, iv: iv };
    var json = cryptoJs.AES.encrypt(msg, pass, options);
    return json.ciphertext.toString(cryptoJs.enc.Hex);
  } catch (err) {
    console.error(err);
    return "";
  }
};
export const decrypt = (hex) => {
  const pass = cryptoJs.enc.Utf8.parse("08277A08B0ABA7070VH28A5FCED7396D");
  const iv = cryptoJs.enc.Utf8.parse("D9062EA86462LL7E");
  try {
    var options = { mode: cryptoJs.mode.CBC, iv: iv };
    var json = cryptoJs.AES.decrypt(
      {
        ciphertext: cryptoJs.enc.Hex.parse(hex),
      },
      pass,
      options
    );
    return json.toString(cryptoJs.enc.Utf8);
  } catch (err) {
    console.error(err);
    return "";
  }
};
export const aes256encrypt = (input) => {
  try {
    let encryptedInput = [];
    input.forEach((data) => {
      let tempObject = {};
      for (let key in data) {
        let tempArr2 = [];
        if (data[key] instanceof Array) {
          data[key].forEach((data2) => {
            if (typeof data2 === "object") {
              let tempObject2 = {};
              for (let key in data2) {
                if (data2[key] === null) {
                  tempObject2[key] = null;
                } else tempObject2[key] = encrypt(data2[key].toString());
              }
              tempArr2.push(tempObject2);
            } else {
              tempArr2.push(encrypt(data2.toString()));
            }
          });
          tempObject[key] = tempArr2;
        } else {
          if (data[key] === null) {
            tempObject[key] = null;
          } else tempObject[key] = encrypt(data[key].toString());
        }
      }
      encryptedInput.push(tempObject);
    });
    return encryptedInput;
  } catch (e) {
    return "";
  }
};

export const aesSingle256encrypt = (data) => {
  try {
    return encrypt(data.toString());
  } catch (e) {
    return "";
  }
};

export const aes256decrypt = (input) => {
  try {
    let decryptedInput = [];
    input.forEach((data) => {
      let tempObject = {};
      for (let key in data) {
        let tempArr2 = [];
        if (data[key] instanceof Array) {
          data[key].forEach((data2) => {
            if (typeof data2 === "object") {
              let tempObject2 = {};
              for (let key in data2) {
                tempObject2[key] =
                  data2[key] === null ? null : decrypt(data2[key].toString());
              }
              tempArr2.push(tempObject2);
            } else {
              let val = decrypt(data2.toString());
              tempArr2.push(val);
            }
          });
          tempObject[key] = tempArr2;
        } else if (typeof data[key] === "object") {
          let data3 = data[key];
          let tempObject3 = {};
          for (let key in data3) {
            tempObject3[key] =
              data3[key] === null ? null : decrypt(data3[key].toString());
          }
          tempObject[key] = tempObject3;
        } else {
          tempObject[key] =
            data[key] === null ? null : decrypt(data[key].toString());
        }
      }
      decryptedInput.push(tempObject);
    });
    return decryptedInput;
  } catch (e) {
    return "";
  }
};
export const goToBack = (navigate) => {
  navigate(-1);
}
export const numberFormatStyle = (number) => {
  if (number) {
    if (number < 1e3) return number;
    if (number >= 1e3 && number < 1e6) return +(number / 1e3).toFixed(1) + 'K';
    if (number >= 1e6 && number < 1e9) return +(number / 1e6).toFixed(1) + 'M';
    if (number >= 1e9 && number < 1e12) return +(number / 1e9).toFixed(1) + 'B';
    if (number >= 1e12) return +(number / 1e12).toFixed(1) + 'T';
  } else {
    return 0
  }
};
export const numberFormat = (number) => {
  if (number) {
    const formattedNumber = Intl.NumberFormat().format(number);
    return formattedNumber;
  } else {
    return 0
  }
}
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const textTitleCase = (text) => {
  if (text) {
    let words = text.split(' ');
    for (let i = 0; i < words.length; ++i) {
      words[i] = capitalizeFirstLetter(words[i]);
    }
    return words.join(' ');
  } else {
    return '-'
  }
}
export const dateTimeFormat = (date, formatType) => {
  if (date !== 'Invalid date') {
    const formattedDate = momentTz.utc(date).toISOString();
    return moment(formattedDate).format(formatType);
  } else {
    return ''
  }
}
export const timeFormat = (date) => {
  const formattedDate = momentTz.utc(date).toISOString();
  return moment(formattedDate).format('hh a');
}
export const getDecodedAccessToken = (token) => {
  try {
    return jwt_decode(token);
  } catch (Error) {
    return null;
  }
}
export const loggedUser = (token) => {
  const loggedUser = getDecodedAccessToken(token);
  return loggedUser;
}
export const loggedUserToken = () => {
  const loggedUser = getDecodedAccessToken(getCookie('hype')?.token);
  return loggedUser;
}
export const currentActiveUser = () => {
  const activeUser = loggedUserToken();
  let permission = '';
  if(activeUser?.role_id === 0){
    permission = 'SUPER_ADMIN';
  }
  if(activeUser?.role_id === 1){
    permission = 'ADMIN';
  }
  if(activeUser?.role_id === 2){
    permission = 'MOBILE_USER';
  }
  if(activeUser?.role_id === 3){
    permission = 'PROJECT_OWNER';
  }
  if(activeUser?.role_id === 4){
    permission = 'ANALYST';
  }
  if(activeUser?.role_id === 5){
    permission = 'USER';
  }
  return permission;
}
export const downloadFile = (data, filename, columns) => {
  let csvData = ConvertToCSV(data, columns);
  let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
  let downloadLink = document.createElement('a');
  let url = URL.createObjectURL(blob);
  let isSafariBrowser =
    navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;
  if (isSafariBrowser) {
    downloadLink.setAttribute('target', '_blank');
  }
  downloadLink.setAttribute('href', url);
  downloadLink.setAttribute('download', filename + '.csv');
  downloadLink.style.visibility = 'hidden';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

export const ConvertToCSV = (objArray, headerList) => {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = 'S.No,';
  for (let index in headerList) {
    row += textTitleCase(headerList[index].replace('_', ' ') + ',');
  }
  row = row.slice(0, -1);
  str += row + '\r\n';
  for (let i = 0; i < array.length; i++) {
    let line = i + 1 + '';
    for (let index in headerList) {
      let head = headerList[index];
      line += ',' + array[i][head];
    }
    str += line + '\r\n';
  }
  return str;
}
