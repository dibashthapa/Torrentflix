import bcrypt from "bcrypt";
export const createHash = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};
export const comparePassword = async (hashedPassword, password) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
};
//# sourceMappingURL=hash.js.map