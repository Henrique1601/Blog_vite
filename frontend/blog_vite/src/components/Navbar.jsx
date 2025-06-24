import { Link } from 'react-router-dom';
import '../scss/Navbar.scss'
import '../scss/styles.scss'
function Navbar() {
const isAuthenticated = !!localStorage.getItem('token'); // Verifica se o token existe
  return (
    <>
    <div className="Navbar-container">
    <nav className="navbar bg-dark sticky-top bg-body-tertiary navbar-expand-lg ">
      <div className="container-fluid">
        <Link className="navbar-brand " to="/">
          <img src="../../public/blogging (1).png"  alt="logo" width={30} height={30} className="d-inline-block align-text-top" />
          Blog
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/CreatePost">Criar Post</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn" onClick={() => {localStorage.removeItem('token');
 window.location.href = '/';}}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/Login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Register">Cadastro</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    </div>
    </>
  );
}

export default Navbar;