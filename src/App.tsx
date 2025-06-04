import { Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Applications = lazy(() => import("./pages/Applications"));
const NewApplication = lazy(() => import("./pages/NewApplication"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/applications" replace />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/applications/new" element={<NewApplication />} />
      </Routes>
    </Suspense>
  );
}

export default App;
