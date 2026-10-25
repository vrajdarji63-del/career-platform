import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar.jsx';

export default function PublicLayout() {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
