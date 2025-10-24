import { Routes, Route } from "react-router";
import Dashboard from "./routes/Dashboard";
import Category from "./routes/Category";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
    </div>
  );
}

export default App;
