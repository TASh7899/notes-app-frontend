import './App.css';
import AppRoutes from '../routes/routes';

function App() {
  console.log("ENV:", import.meta.env.VITE_API_URL);

  return (
    <>
      <AppRoutes />
    </>
  )
}

export default App
