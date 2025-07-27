import { useEffect } from 'react';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user_data");
    navigate("/login");
  }, []);

  return (
    <div className='bg-white/40'>
      <Loading />
    </div>
  );
}

export default Logout;
