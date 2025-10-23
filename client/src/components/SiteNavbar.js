import Identicon from 'identicon.js';
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/KMRVLOGO.png';

const SiteNavbar = ({token, account, setAccount, setToken}) => {
    const navigate = useNavigate()
    
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('account')
        setToken('')
        setAccount('');
        navigate('/login');
    }
    return (
        <Navbar collapseOnSelect expand="md" variant="dark" fixed="top" 
                className="site-navbar" 
                style={{ 
                    backgroundColor: '#000000',
                    boxShadow: '0 2px 10px rgba(255, 255, 255, 0.1)'
                }}>
            <Container>
                <Navbar.Brand as={Link} to="/" className="me-auto">
                    <img className='ml-2' height="70" width="70" src={logo} alt="Company Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto"> {/* Changed to ms-auto to push items right */}
                        { token!=='' && account!=="" ? 
                            <>
                                <Nav.Link className='img'>
                                    <img
                                        className='ml-2'
                                        width='40'
                                        height='40'
                                        src={`data:image/png;base64,${new Identicon(account, 40).toString()}`}
                                        alt="profile"
                                    />
                                </Nav.Link>
                                <Nav.Link>
                                    <small className='text-nav'>
                                        {account.slice(0, 5)+ '...' + account.slice(-4)}
                                    </small>
                                </Nav.Link>
                                <Nav.Link onClick={logout}>
                                    <small className='text-nav'>
                                        Log&nbsp;Out
                                    </small>
                                </Nav.Link>
                            </>
                            : 
                            <>
                                <Nav.Link as={Link} to="/home" className="nav-link-custom">
                                    <small className='text-nav'>
                                        Home
                                    </small>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/about" className="nav-link-custom">
                                    <small className='text-nav'>
                                        About Us
                                    </small>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login" className="nav-link-custom">
                                    <small className='text-nav'>
                                        Login
                                    </small>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register" className="nav-link-custom">
                                    <small className='text-nav'>
                                        Register
                                    </small>
                                </Nav.Link>
                            </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>

            <style jsx="true">{`
                .site-navbar {
                    transition: all 0.3s ease;
                }
                
                .text-nav {
                    color: #ffffff !important;
                    font-size: 1.1rem;
                    transition: all 0.3s ease;
                }
                
                .nav-link-custom {
                    padding: 0.5rem 1.2rem;
                    margin: 0 0.2rem;
                    border-radius: 4px;
                    transition: all 0.3s ease;
                }
                
                .nav-link-custom:hover {
                    background-color: #333333;
                    transform: scale(1.05);
                }
                
                .nav-link-custom:hover .text-nav {
                    color: #ffffff !important;
                    text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
                    font-size: 1.15rem;
                }
                
                @media (max-width: 768px) {
                    .nav-link-custom {
                        padding: 0.5rem;
                        margin: 0.2rem 0;
                        text-align: center;
                    }
                    .ms-auto {
                        margin-left: 0 !important;
                    }
                }
            `}</style>
        </Navbar>
    )
}

export default SiteNavbar