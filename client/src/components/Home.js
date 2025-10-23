import HomePng from '../assets/home.jpg';
import landpng from '../images/LandingPageChart2.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <div className="home-container">
            <br></br><br></br><br></br><br></br>
                {/* Hero Section with Image and CTA */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1 className="hero-title">Welcome to KRMV</h1>
                        <p className="hero-subtitle">
                        This decentralized <span>Electronic Health Records (EHR)</span> system 
        uses <span>Ethereum blockchain</span> and <span>IPFS</span> to 
        create a secure, patient-controlled platform. Medical data is stored immutably via <span>Smart Contracts</span>, 
        with zero centralized points of failure.
                        </p>
                        <div className="cta-buttons">
                            <button 
                                className="primary-button"
                                onClick={() => navigate('/register')}
                            >
                                Register With Us
                            </button>
                            <button 
                                className="secondary-button"
                                onClick={() => navigate('/about')}
                            >
                                Learn More About Us
                            </button>
                        </div>
                        <br>
                        </br>
                        <br>
                        </br>
                        <br>
                        </br><img 
                            src={landpng} 
                            alt="Modern application interface showing key features" 
                            className="hero-image"
                            loading="lazy"
                        />
                    </div>
                    <div className="hero-image-container">
                        <img 
                            src={HomePng} 
                            alt="Modern application interface showing key features" 
                            className="hero-image"
                            loading="lazy"
                        />
                    </div>
                </section>

                {/* Value Proposition Section */}
                <section className="value-section">
                    <div className="value-card">
                        <div className="value-icon">🔒</div>
                        <h2>Blockchain Technology</h2>
                        <p>Blockchain technology is a distributed ledger that securely links together growing lists of records, known as blocks, through cryptographic hashes. And it  allows for transparent information sharing within a business network, storing data in blocks that are linked together in a chain, ensuring chronological consistency.</p>
                    </div>
                    <div className="value-card"> 
                        <div className="value-icon">🦊 </div>
                        <h2>MetaMask </h2>
                        <p>MetaMask is a digital wallet that allows users to interact with blockchain applications securely. It acts as a bridge between regular web browsers and the Ethereum blockchain, enabling users to access decentralized applications (dApps) by simply connecting their wallet.                         </p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🗂️ </div>
                        <h2>InterPlanetary File System</h2>
                        <p>It is a decentralized storage network that allows files to be stored across multiple computers instead of a central server. When a file, such as a medical report, is uploaded to IPFS, it is broken into chunks and given a unique content identifier (CID), like a digital fingerprint. This CID is stored on the blockchain.</p>
                    </div>
                </section>
            </div>

            {/* Inline styles for development or scoped style component */}
            <style jsx="true">{`
                .home-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .hero-section {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 40px;
                    padding: 80px 0;
                }

                .hero-content {
                    flex: 1;
                    max-width: 500px;
                }

                .hero-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .hero-subtitle {
                    font-size: 1.1rem;
                    color: #4a5568;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }

                .hero-image-container {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                }

                .hero-image {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                        0 4px 6px -2px rgba(0, 0, 0, 0.05);
                }

                .cta-buttons {
                    display: flex;
                    gap: 16px;
                    margin-top: 2rem;
                }

                .primary-button,
                .secondary-button {
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .primary-button {
                    background-color: #4299e1;
                    color: white;
                    border: none;
                }

                .primary-button:hover {
                    background-color: #3182ce;
                    transform: translateY(-1px);
                }

                .secondary-button {
                    background-color: white;
                    color: #4299e1;
                    border: 1px solid #4299e1;
                }

                .secondary-button:hover {
                    background-color: #ebf8ff;
                    transform: translateY(-1px);
                }

                .value-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 30px;
                    padding: 60px 0;
                }

                .value-card {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease;
                }

                .value-card:hover {
                    transform: translateY(-5px);
                }

                .value-icon {
                    font-size: 2rem;
                    margin-bottom: 1rem;
                }

                .value-card h3 {
                    font-size: 1.25rem;
                    color: #2d3748;
                    margin-bottom: 0.75rem;
                }

                .value-card p {
                    color: #4a5568;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .hero-section {
                        flex-direction: column;
                        text-align: center;
                        padding: 40px 0;
                    }

                    .cta-buttons {
                        justify-content: center;
                    }

                    .hero-content {
                        max-width: 100%;
                    }
                }
            `}</style>
        </>
    );
};

export default Home;
