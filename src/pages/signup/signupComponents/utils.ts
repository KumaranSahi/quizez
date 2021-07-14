export const emailValidation = (email: string) => {
  if (!email) {
    return "Required";
  }
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "Invalid email address";
  }
};

export const passwordValidation = (password: string) => {
  if (!password) {
    return "Required";
  }
  if (password.length < 8) {
    return "Password should contain atleast 8 characters";
  }
};

export const nameValidation = (name: string) => {
  if (!name) {
    return "Required";
  }
};

export const passwordChangeValidation = (
  password: string,
  confirmPassword: string
) => password === confirmPassword;
