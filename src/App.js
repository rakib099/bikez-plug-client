import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './routes/Routes/Routes';

function App() {
  return (
    <div className="App max-w-[1440px] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
