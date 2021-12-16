import bcrypt from "bcrypt";
export const createHash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  hashedPassword: string,
  password: string
) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};
