import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header';
import { Production } from './pages/Production';
import { Products } from './pages/Products';
import { RawMaterials } from './pages/RawMaterials';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RawMaterials />} />
        <Route path="/products" element={<Products />} />
        <Route path="/production" element={<Production />} />
      </Routes>
    </>
  );
}

export default App;
