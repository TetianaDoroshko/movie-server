//
// util for transforming date format MM-DD-YYYY => DD-MM-YYYY

const transformDate = (dateString) => {
  if (dateString && new RegExp(/^\d{2}-\d{2}-\d{4}$/).test(dateString)) {
    const arr = dateString.split("-");
    const newDate = [arr[1], arr[0], arr[2]].join("-");
    return new Date(newDate);
  }
  return dateString;
};
module.exports = transformDate;
