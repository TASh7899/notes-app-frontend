import styles from '../styles/SignupPage.module.css';
import { formSchema } from '../schema/LoginSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../components/textInput/textInput';
import PopUp from '../components/popup/PopUp';
import { useState, useEffect } from 'react';

import api from '../axiosConfig.js'
import { useLocation, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const location = useLocation();
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/api/user/check-session')
    .then(res => {
      if (res.data.loggedIn) {
        navigate('/editor');
      }
      });

    if (location.state?.fromProtected) {
      setMessage('unauthorized');
      setError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  }, [location, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/api/user/login', data);
      console.log('form submitted : ', data);
      setMessage(res.data.message);
      setError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
      navigate('/editor');

    } catch (err) {
      setMessage(err?.response?.data?.error || 'error');
      setError(true);
      setShowPop(true)
      setTimeout(() => setShowPop(false), 2000);
    }
  };

  return (
    <>
      {showPop && <PopUp message={message} isError={error} onClose={() => setShowPop(false)} />}

    <div className={styles.page}>
      <div className={styles.heading}>
        <h1> Login </h1>
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

          <div className={styles.field}>
            <TextInput
              className={styles.input}
              label="username"
              name="username"
              register={register}
              error={errors.username}
              placeholder="Enter your username"
            />
          </div>

          <div className={styles.field}>
            <TextInput
              className={styles.input}
              type="password"
              label="password"
              name="password"
              register={register}
              error={errors.password}
              placeholder="Enter your password"
            />
          </div>

          <div className={styles.confirmandbutton}>
          <button className={styles.formbutton} type="submit">Submit</button>
          </div>

        </form>
      </div>
    </div>

    </>
  );
}

