import arrow from "../src/assets/arrow.svg"
import book from "../src/assets/book.svg"
import secure from "../src/assets/secure.svg"
import thinking from "../src/assets/thinking.svg"

import styles from  '../styles/Homepage.module.css';

export default function HomePage() {
  return(
    <div className={styles.HomePage}>
      <div className={styles['banner-main']}>
        <div className={styles.text}>
          <h1>Write it Down.</h1>
          <h1>Never Forget</h1>

        <div>
          <p>
            the free and easy to use app for all
          </p>
          <p>
            your needs
          </p>
        </div>

          <button className={styles['signup-btn']}>Sign up now</button>
        </div>

        <div className={styles.image}>
          <img src={arrow} className={styles.arrow} alt="image error" />
        </div>

      </div>

      <div className={styles['banner-right']}>
        <div className={styles.text}>
          <h1 className={styles['banner-heading']}>Anywhere Anytime</h1>
          <div>
            <p>Whether you're at home, in class, or</p>
            <p>on the go — your notes are always</p>
            <p>just a tap away.</p>
            <p>make new notes on the go and save </p>
            <p>them instantly</p>
          </div>
        </div>

        <div className={styles.image}>
          <img src={book} className={styles.book} alt="image error" />
        </div>
      </div>

      <div className={styles['banner-left']}>
        <div className={styles.image}>
          <img className={styles.secure} src={secure} alt="image error" />
        </div>

        <div className={styles.text}>
          <h1 className={styles['banner-heading']}>Safe and Secure</h1>
          <div>
            <p>Your ideas stay yours. Always</p>
            <p>encrypted. Always protected.</p>
          </div>

          <div>
            <p>safely access them within </p>
            <p>your account.</p>
          </div>
        </div>
      </div>

      <div className={styles['banner-right']}>
        <div className={styles.text}>

          <div>
            <h1 className={styles['banner-heading']}>Stay Organized,</h1>
            <h1 className={styles['banner-heading']}>Effortlessly</h1>
          </div>

          <div>
            <p>Notes, lists, and plans </p>
            <p>all in one place.</p>
          </div>

          <div>
            <p>Focus on what matters </p>
            <p>while we keep your </p>
            <p>thoughts sorted and accessible.</p>
          </div>
      </div>

      <div className={styles.image}>
        <img src={thinking} className={styles.thinking} alt="image error" />
      </div>

      </div>

      <div className={styles['banner-center']}>

          <h1>Join us today</h1>
            <p>Whether you're journaling, planning</p>
            <p>or just jotting — we've got your </p>
            <p>back.</p>

          <button className={styles['signup-btn']}>Sign up now</button>

        
      </div>


    </div>
  )
}
