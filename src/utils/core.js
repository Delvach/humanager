export const logError = error => console.log(error);

export const apiErrorHandler = error => logError(error);
export const uiErrorHandler = error => logError(error);
