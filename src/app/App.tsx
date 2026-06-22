import { Route, Routes } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";


export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </Layout>
  );
}
