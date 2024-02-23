import './App.css';
import Header from './component/Header';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      <Toaster />
      <div className="App">
        <Header />
      </div>
    </>
  );
}

export default App;
