interface FormFields {
    email?: string;
    full_name?: string;
    username: string;
    password: string;
  }

  type FormErrors<T> = {
    [K in keyof T]: string;
  };
  
  export const validation = <T extends FormFields>(formData: T): [boolean, FormErrors<T>] => {
    const errors = {} as FormErrors<T>;
    let isValid = true;
 
    if ("email" in formData) {
      if (!formData.email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Invalid email";
        isValid = false;
      }
    }
  
    if ("full_name" in formData) {
      if (!formData.full_name) {
        errors.full_name = "Full Name is required";
        isValid = false;
      } else if (formData.full_name.length < 3 || formData.full_name.length > 50) {
        errors.full_name = "Full Name must be between 3 and 50 characters";
        isValid = false;
      } else if (!/^[A-Za-z\s]+$/.test(formData.full_name)) {
        errors.full_name = "Invalid name";
        isValid = false;
      }
    }
  
    if (!formData.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3 || formData.username.length > 20) {
      errors.username = "Username must be between 3 and 20 characters";
      isValid = false;
    }
  
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    }
  
    return [isValid, errors];
  };
  