import "./App.css";
import { AuthProvider } from "./auth/authProvider";
import { Navbar } from "./components/navbar";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
