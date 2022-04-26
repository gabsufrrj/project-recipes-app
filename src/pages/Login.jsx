import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passInput, setPassInput] = useState('');

  const onInputChange = ({ target: { id, value } }) => {
    if (id === 'email') {
      setEmailInput(value);
    } else {
      setPassInput(value);
    }
  };

  // validação de login.
  // ideia de regex de verificação de email retirado do site:
  // https://www.w3resource.com/javascript/form/email-validation.php
  useEffect(() => {
    const SIX = 6;
    const emailIsValid = emailInput.toLowerCase()
      .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

    if (passInput.length > SIX && emailIsValid) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailInput, passInput]);

  const saveOnStorage = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: emailInput }));
  };

  return (
    <form>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={ onInputChange }
        value={ emailInput }
        id="email"
        data-testid="email-input"
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={ onInputChange }
        value={ passInput }
        data-testid="password-input"
      />
      <Link to="/foods">
        <input
          type="submit"
          onClick={ saveOnStorage }
          disabled={ isDisabled }
          value="Login"
          data-testid="login-submit-btn"
        />
      </Link>
    </form>
  );
}

export default Login;

// Tela de Login desenvolvida por Gabriel Gregório e João Victor Kikuti em pair programming.
