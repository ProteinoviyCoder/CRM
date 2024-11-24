export const errorHandler = (error: any): string => {
  let errorMessage: string = "Unknown error";

  if (
    "data" in error &&
    typeof (error.data as { message: string }).message === "string"
  ) {
    errorMessage = (error.data as { message: string }).message;
  } else if ("status" in error) {
    errorMessage = `Error status: ${error.status} - Unknown error`;
  } else {
    errorMessage = `Unknown error on client side`;
  }

  return errorMessage;
};
