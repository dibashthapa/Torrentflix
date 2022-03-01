import './App.css';
import {AuthProvider} from './auth/authProvider';
import {Navbar} from './components/navbar';
import Routes from './routes';
import {ErrorHandler} from './utils/errorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorHandler>
        <Navbar />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ErrorHandler>
    </div>
  );
}

export default App;
