// src/components/About.js
import React from 'react';
import logo  from '../images/KRMVHospitalAboutUs.png';

const About = () => {
    return (
        <div className="about-container">
            <br></br><br>
            </br>
            <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh'  // This makes the container take up the full viewport height
}}>
  <img 
    src={logo} 
    alt="Company Logo" 
    style={{
      height: '500px',
      width: '500px',
      maxWidth: '100%',  // Ensures it stays responsive
      objectFit: 'contain'  // Maintains aspect ratio
    }}
  />
</div>
            <section className="about-content">
                <div className="about-section">
                    
                    <h2>Empowering Secure Healthcare with Blockchain</h2>
              <p>We are a team of healthcare professionals and technologists dedicated to redefining Electronic Health Records (EHR) management. Our mission is to deliver a secure, efficient, and intelligent solution for healthcare data integrity.</p>

                </div>

                <div className="about-section">
                <h2>For Healthcare Providers</h2>
              <p>Access assigned patient lists and medical history.</p> 
              <p>Document diagnoses, treatment plans, and medical notes.</p>  
              <p>Ensure streamlined, real-time collaboration.</p>

              <h2>For Patients</h2>  
              <p>Securely manage and access personal medical history.</p>
              <p>Upload and store medical reports with <strong>blockchain-backed authenticity.</strong></p>  
              <p>Grant or revoke access to healthcare providers.</p> 

              <h2>For Diagnostic Centers</h2>
              <p>Retrieve doctor-authorized patient data.</p>
              <p>Upload and store diagnostic reports securely.</p>
              <p>Ensure confidentiality and compliance with privacy regulations.</p>

              <h2>Data Security & Privacy</h2>
              <p>We uphold the highest standards of data security and patient autonomy. Our blockchain-powered access control ensures that only authorized entities can retrieve medical records, giving patients full control over their health data.</p>

                </div>

            <div className="about-section">
                <h2>Connect With Us</h2> 
              <p>Phone: +123 456 7890 </p> 
              <p>Email: project@gmail.com</p>
            </div>  
            </section>

            <style jsx>{`
                .about-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .about-hero {
                    text-align: center;
                    padding: 80px 0;
                    background: linear-gradient(135deg,rgb(222, 225, 227) 0%,rgb(173, 175, 177) 100%);
                    color: white;
                    border-radius: 8px;
                    margin-bottom: 40px;
                }

                .about-hero h1 {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .about-hero p {
                    font-size: 1.2rem;
                    opacity: 0.9;
                }

                .about-content {
                    display: grid;
                    gap: 40px;
                    padding: 40px 0;
                }

                .about-section {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .about-section h2 {
                    color: #2d3748;
                    margin-bottom: 1rem;
                    font-size: 1.8rem;
                }

                .about-section p {
                    color: #4a5568;
                    line-height: 1.7;
                    font-size: 1.1rem;
                }

                @media (max-width: 768px) {
                    .about-hero {
                        padding: 60px 20px;
                    }

                    .about-hero h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default About;