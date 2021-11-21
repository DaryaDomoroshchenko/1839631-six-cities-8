import { FormEvent, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppRoute } from '../../const';
import { loginAction } from '../../store/actions/api-actions/api-actions-auth';
import { ThunkAppDispatch } from '../../types/action';
import AuthData from '../../types/auth-data';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logIn(authData: AuthData) {
    return dispatch(loginAction(authData));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginForm({ logIn }: PropsFromRedux): JSX.Element {
  const history = useHistory();
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      logIn({
        login: loginRef.current.value,
        password: passwordRef.current.value,
      })
        .then(() => {
          history.push(AppRoute.Main);
        });
    }
  };

  return (
    <form
      className="login__form form"
      action="#"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          ref={loginRef}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          ref={passwordRef}
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}

export { LoginForm };
export default connector (LoginForm);
