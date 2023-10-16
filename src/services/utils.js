export const handleRefreshTokenResponse = async (
  err,
  newToken,
  returnFunction,
  ...functionInput
) => {
  if (newToken.status == 'SUCCESS') {
    // callling the function again with new token
    return await returnFunction(
      ...functionInput
    );
  }
  return {
    status: 'ERROR',
    message: err.response.data.message,
    developerMessage: err.response.data.developerMessage,
  };
};
