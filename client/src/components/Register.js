import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Buffer } from 'buffer';

const Register = ({mediChain, ipfs, connectWallet, token, account, setToken, setAccount}) => {
    const [designation] = useState("3"); // Hardcoded to "Insurance Provider"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(account !== "") {
            // For "Insurance Provider", no age or treatment data required
            mediChain.methods.register(name, 0, parseInt(designation), email, "").send({from: account}).on('transactionHash', async (hash) => {
                window.location.href = '/login'
            });
        }
    }

    useEffect(() => {
        var t = localStorage.getItem('token');
        var a = localStorage.getItem('account');
        t = t ? t : "";
        a = a ? a : "";
        if(t !== "" && a !== "") window.location.href = '/login';
        else {
            localStorage.removeItem('token');
            localStorage.removeItem('account');
            setToken('');
            setAccount('');
        }
    }, [token]);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px'
        }}>
            <div style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '500px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#2c3e50',
                    marginBottom: '1.5rem',
                    fontWeight: '600',
                    fontSize: '1.8rem'
                }}>Doctor Registration</h2>
                
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-4" controlId="formWallet">
                        <Form.Label style={{
                            display: 'block',
                            textAlign: 'left',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#34495e'
                        }}>Connect Metamask Wallet</Form.Label>
                        { account === "" ? (
                            <Button 
                                onClick={connectWallet}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    background: '#3498db',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontWeight: '500',
                                    fontSize: '1rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => e.target.style.background = '#2980b9'}
                                onMouseOut={(e) => e.target.style.background = '#3498db'}
                            >
                                Click To Connect Metamask
                            </Button>
                        ) : (
                            <Form.Control 
                                type="text" 
                                disabled 
                                value={`Connected: ${account.slice(0, 6)}...${account.slice(-4)}`}
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '8px',
                                    border: '1px solid #dfe6e9',
                                    background: '#f8f9fa',
                                    color: '#2d3436',
                                    textAlign: 'center',
                                    fontWeight: '500'
                                }}
                            />
                        )}
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formName">
                        <Form.Label style={{
                            display: 'block',
                            textAlign: 'left',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#34495e'
                        }}>Doctor Name</Form.Label>
                        <Form.Control 
                            required 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder="Enter your name"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #dfe6e9',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formEmail">
                        <Form.Label style={{
                            display: 'block',
                            textAlign: 'left',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#34495e'
                        }}>Doctor Email ID</Form.Label>
                        <Form.Control 
                            required 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Enter your email"
                            style={{
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #dfe6e9',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </Form.Group>

                    <Button 
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            background: '#2ecc71',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: '500',
                            fontSize: '1rem',
                            marginTop: '1rem',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#27ae60'}
                        onMouseOut={(e) => e.target.style.background = '#2ecc71'}
                        disabled={account === ""}
                    >
                        Register As Doctor
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Register;