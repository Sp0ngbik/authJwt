import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/authPage/AuthPage";
import { PrivatePage } from "./pages/privatePage/PrivatePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="/private" element={<PrivatePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
