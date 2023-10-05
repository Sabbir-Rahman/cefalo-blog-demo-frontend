/* eslint-disable no-undef */
import jwt_decode from "jwt-decode";

export const verifyJwt = (token) => {
  const publicKey = import.meta.env.REACT_JWT_PUBLIC_KEY
  const decoded = jwt_decode(token, publicKey);
  if (decoded) {
    return {
      decoded,
    };
  }
};
