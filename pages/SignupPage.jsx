import styles from '../styles/SignupPage.module.css';
import { formSchema } from '../schema/formSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../components/textInput/textInput';
import PopUp from '../components/popup/PopUp';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../axiosConfig.js';

export default function SignupPage() {
  const [showPop, setShowPop] = useState(false);
  const [message, setMessage] = useState((''));
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/api/user/signup', data)
      console.log('form submitted : ', data);
      setMessage(res.data.message);
      setError(false);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 1000);
      setTimeout(() => navigate('/login'), 1000);

    } catch (err) {
      console.error(err);
      setMessage(err?.response?.data?.error || "error");
      setError(true);
      setShowPop(true);
      setTimeout(() => setShowPop(false), 2000);
    }
  };



  return (
    <>
      {showPop && (
        <PopUp
          message={message}
          isError={error}
          onClose={() => setShowPop(false)}
        />
      )}

    <div className={styles.page}>
      <div className={styles.heading}>
        <h1>Sign up</h1>
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
            <p className={styles.subtext}>Username should be unique</p>
          </div>

          <div className={styles.field}>
            <TextInput
              className={styles.input}
              label="email"
              name="email"
              register={register}
              error={errors.email}
              placeholder="Enter your email"
            />
            <p className={styles.subtext} >Email should be valid</p>
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
            <div className={styles.passwordinfo}>
              <p className={styles.subtext} >Password should be 8 characters long</p>
              <p className={styles.subtext}>It should contain:</p>
              <p className={styles.subtext}> At least one uppercase character</p>
              <p className={styles.subtext}> At least one lowercase character</p>
              <p className={styles.subtext}> At least one digit</p>
              <p className={styles.subtext}> At least one special character such as !@#$%^&*</p>
            </div>
          </div>

          <div className={styles.confirmandbutton}>

          <div className={styles.field}>
            <TextInput
              className={styles.input}
              type="password"
              label="confirmPassword"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
              placeholder="Confirm password"
            />
            <p className={styles.subtext}>Both passwords should match</p>
          </div>

          <button className={styles.formbutton} type="submit">Submit</button>

          </div>

        </form>
      </div>
    </div>
  </>
  );
}

