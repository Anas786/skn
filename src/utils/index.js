import { toast } from "react-toastify";
import moment from "moment";

export const BEARER_TOKEN_IMAGE_HEADERS = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("skn_token"),
    "Content-Type": "multipart/form-data",
  },
};
export const errorToast = (err) => {
  toast.error(err.message);
};
export const getFormattedDateTime = (date) => {
  if (date) return moment(date).format("YYYY-MM-DD, hh:mm A");
  return "-";
};
export const getFormattedDate = (date) => {
  if (date) return moment(date).format("YYYY-MM-DD");
  return "";
};

export const formatCurrency = (number) => number ? `Rs. ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : 'Rs. 0';

export const imageValidation = (file, setError, setLoading, isImage) => {
  let res = true;
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (isImage && !isJpgOrPng) {
    setLoading();
    setError("You can only upload JPG/PNG file!");
    res = false;
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  // if (!isLt2M) {
  //   res = false;
  //   setLoading();
  //   setError("Image must smaller than 2MB!");
  // }

  return res;
};
// moment().format("MMMM Do YYYY, h:mm:ss a");
