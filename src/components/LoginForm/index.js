import { useEffect, useState } from "react";
import s from './style.module.css';

const LoginForm = ({ onSubmit, onRegister, buttonTitle, linkTitle, isOpenModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isOpenModal === false) {
      setEmail('');
      setPassword('');
    }
  }, [isOpenModal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit({
      email,
      password
    })
    setEmail('');
    setPassword('');
  }

  const handleClickLink = (e) => {
    e.preventDefault();
    onRegister && onRegister();
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={s.root}>
          <input className={s.input}
            value={email}
            type="email"
            name="email"
            onChange={(e) => {setEmail(e.target.value)}}
            required
          />
          <span className={s.highlight}></span>
          <span className={s.bar}></span>
          <label className={s.label}>Email</label>
        </div>
        <div className={s.root}>
          <input className={s.input}
            value={password}
            type="password"
            name="password"
            onChange={(e) => {setPassword(e.target.value)}}
            required
          />
          <span className={s.highlight}></span>
          <span className={s.bar}></span>
          <label className={s.label}>Password</label>
        </div>
        <div className={s.flex}>
        <button>
          {buttonTitle}
        </button>
          <a
            onClick={handleClickLink}
          >
            {linkTitle}
          </a>
        </div>
      </form>
    </>
  )
}

export default LoginForm;
