import { useEffect, useState } from "react";
import PopUp from "../popup/PopUp";

export default function TextInput({ label, register, name, error, className, type, ...rest }) {
  
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);

      const timer = setTimeout(() => setShow(false), 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className={className}>
      <input id={name} type={type} {...register(name)} {...rest} />
      <label htmlFor={name}>{label}</label>
      {show && error && (
        <PopUp
          message={error.message}
          isError={true}
          onClose={() => setShow(false)}
        />
      )}
    </div>
  );
}
