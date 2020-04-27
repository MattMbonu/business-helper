import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
