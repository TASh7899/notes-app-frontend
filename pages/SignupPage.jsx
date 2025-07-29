import styles from '../styles/SignupPage.module.css';
import { formSchema } from '../schema/formSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TextInput from '../components/textInput/textInput';
import PopUp from '../components/popup/PopUp';
import { useState } from 'react';

export default function SignupPage() {
  const [showPop, setShowPop] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const onSubmit = (data) => {
    console.log('form submitted : ', data);
    setShowPop(true);
    setTimeout(() => setShowPop(false), 3000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.heading}>
        <h1>Sign up</h1>
      </div>

      {showPop && (
        <PopUp
          message="Successfully submitted the form"
          isError={false}
          onClose={() => setShowPop(false)}
        />
      )}

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
            <p>Username should be unique</p>
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
            <p>Email should be valid</p>
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
              <p>Password should be 8 characters long</p>
              <p>It should contain:</p>
              <p> At least one uppercase character</p>
              <p> At least one lowercase character</p>
              <p> At least one digit</p>
              <p> At least one special character such as !@#$%^&*</p>
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
            <p>Both passwords should match</p>
          </div>

          <button className={styles.formbutton} type="submit">Submit</button>

          </div>

        </form>
      </div>
    </div>
  );
}

