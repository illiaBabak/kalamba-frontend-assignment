import { useLogin } from "api/mutations";
import { useState } from "react";
import { useHistory } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

type ValidationErrors = {
  email?: string;
  password?: string;
};

const DEFAULT_VALUE: FormData = {
  email: "",
  password: "",
};

export default function Login(): JSX.Element {
  const history = useHistory();

  const [values, setValues] = useState<FormData>(DEFAULT_VALUE);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const { mutateAsync: login, isLoading, error } = useLogin();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const errors: ValidationErrors = {};

    const email = values.email.trim();

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    const password = values.password;

    if (!password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      email: values.email.trim(),
      password: values.password,
    };

    await login(payload);

    history.push("/");
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>

            <ul className="error-messages">
              {!!error && <li>{error.message}</li>}

              {Object.values(validationErrors).map(error => (
                <li key={`${error}`}>{error}</li>
              ))}
            </ul>

            <form
              onSubmit={e => {
                e.preventDefault();

                handleSubmit();
              }}
            >
              <fieldset className="form-group">
                <input
                  value={values.email}
                  onChange={({ currentTarget: { value } }) => handleInputChange("email", value)}
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  value={values.password}
                  onChange={({ currentTarget: { value } }) => handleInputChange("password", value)}
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button disabled={isLoading} className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
