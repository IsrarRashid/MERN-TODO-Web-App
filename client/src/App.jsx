import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import TodoPage from "./components/pages/TodoPage";
import LoginPage from "./components/pages/LoginPage";
import { createContext, useContext, useState } from "react";

export const TokenContext = createContext(null);
const ProtectedRoute = ({ element }) => {
  const [token] = useContext(TokenContext);
  return token ? element() : <Navigate to="/login" />;
};

function App() {
  // 38644 : Israr Rashid
  const [token, setToken] = useState(null);
  return (
    <>
      <TokenContext.Provider value={[token, setToken]}>
        <Routes>
          <Route path="/" element={<ProtectedRoute element={TodoPage} />} />
          {/* password : abc */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </TokenContext.Provider>
    </>
  );
}

export default App;
