import { FC, ClipboardEvent, useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import { useAppContext } from '../libs/contextLib';
import '../styles/form.css';
import { Spinner } from './Spinner';

const blockPaste = (event: ClipboardEvent<HTMLInputElement>) => {
  event.preventDefault();
  return false;
};

const isValidForm = (form: SignUpForm) => {
  return (
    form.email.length > 0 &&
    form.password === form.confirmPassword &&
    form.password.length >= 4
  );
};

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  confirmPasscode: string;
}

export const SignUp: FC = () => {
  const { form, setForm } = useForm<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    confirmPasscode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<string | undefined>(undefined);
  const { setAuthentication } = useAppContext();
  const history = useHistory();
  const showPasswordNotMatchingWarning =
    form.password.length > 0 &&
    form.confirmPassword.length > 0 &&
    form.password !== form.confirmPassword;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidForm(form)) {
      return;
    }
    setIsLoading(true);
    setUser('test');
    setIsLoading(false);
  };

  const onSubmitConfirmCode = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  };

  const renderSignUpForm = () => (
    <>
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <button className="font-medium text-indigo-600 hover:text-indigo-500">
            <Link to="/sign-in">login in</Link>
          </button>
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={setForm}
              autoFocus
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onPaste={blockPaste}
              onChange={setForm}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onPaste={blockPaste}
              onChange={setForm}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Confirm Password"
            />
          </div>
        </div>

        {showPasswordNotMatchingWarning && (
          <p className="flex justify-center items-center text-red-600 text-sm">
            Passwords must match
          </p>
        )}

        <div>
          <button
            type="submit"
            disabled={!isValidForm(form)}
            className="group relative disabled:opacity-50 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLoading ? <Spinner /> : 'Sign up'}
          </button>
        </div>
      </form>
    </>
  );

  const renderConfirmCodeForm = () => (
    <form className="mt-8 space-y-6" onSubmit={onSubmitConfirmCode}>
      <input type="hidden" name="remember" value="true" />
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Confirm passcode from email
      </h2>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="confirmPasscode" className="sr-only">
            Confirm passcode from email
          </label>
          <input
            id="confirmPasscode"
            name="confirmPasscode"
            type="text"
            autoFocus
            onChange={setForm}
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 border border-gray-300 placeholder-gray-500 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Passcode"
          />
          <p className="text-xs px-1">Please check your email for the code.</p>
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-8"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isLoading ? <Spinner /> : 'Confirm'}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <div className="min-h-25 flex items-center justify-center py-4 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {user ? renderConfirmCodeForm() : renderSignUpForm()}
      </div>
    </div>
  );
};
