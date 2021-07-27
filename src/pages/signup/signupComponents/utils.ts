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
  if (password.length === 0) {
    return "Required";
  }
  if (
    !new RegExp("^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$").test(password)
  ) {
    return "Password should be atleast 8 characters with atleast 1 number";
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
