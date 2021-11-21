export const apiConfig = {
  host: process.env.NEXT_PUBLIC_API,
};

const protocol =
  process.env.NEXT_PUBLIC_ENV === "development" ? "http" : "https";

export const apiUrl = `${protocol}://${apiConfig.host}`;
