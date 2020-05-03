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

export const comparePassword = async (
  password: string,
  userPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(password, userPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
