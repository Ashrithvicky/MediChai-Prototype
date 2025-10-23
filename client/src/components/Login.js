import { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = ({mediChain, connectWallet, token, account, setToken, setAccount}) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(account==="") return;
        var res = await mediChain.methods.patientInfo(account).call()
        if(res.exists){
            setToken('1');
            localStorage.setItem('token', '1');
            localStorage.setItem('account', account);
            return navigate('/dashboard')
        }
        res = await mediChain.methods.doctorInfo(account).call()
        if(res.exists){
            setToken('2');
            localStorage.setItem('token', '2');
            localStorage.setItem('account', account);
            return navigate('/dashboard')
        }
        res = await mediChain.methods.insurerInfo(account).call()
        if(res.exists){
            setToken('3');
            localStorage.setItem('token', '3');
            localStorage.setItem('account', account);
            return navigate('/dashboard')
        }
        localStorage.removeItem('token')
        localStorage.removeItem('account')
        setToken('');
        setAccount('');
    }

    useEffect(() => {
        if(mediChain){   
            var t = localStorage.getItem('token')
            var a = localStorage.getItem('account')
            t = t ? t : ""
            a = a ? a : ""
            if((t!=="" || a!=="") && (a===account || account==='')){
                if(t==="1"){
                    mediChain.methods.patientInfo(a).call().then((res) => {
                        if(res.exists){
                            setToken(t);
                            setAccount(a);            
                            return navigate('/dashboard')
                        }else{
                            localStorage.removeItem('token')
                            localStorage.removeItem('account')
                            setToken('');
                            setAccount('');
                        }
                    })
                }else if(t==="2"){
                    mediChain.methods.doctorInfo(a).call().then((res) => {
                        if(res.exists){
                            setToken(t);
                            setAccount(a);
                            return navigate('/dashboard')
                        }else{
                            localStorage.removeItem('token')
                            localStorage.removeItem('account')
                            setToken('');
                            setAccount('');
                        }
                    })
                }else if(t==="3"){
                    mediChain.methods.insurerInfo(a).call().then((res) => {
                        if(res.exists){
                            setToken(t);
                            setAccount(a);
                            return navigate('/dashboard')
                        }else{
                            localStorage.removeItem('token')
                            localStorage.removeItem('account')
                            setToken('');
                            setAccount('');
                        }
                    })
                }
            }
        }
    }, [mediChain])

    return (
        <div className="login-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>
            <div className="login-box" style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '450px',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#2c3e50',
                    marginBottom: '1.5rem',
                    fontWeight: '600',
                    fontSize: '1.8rem'
                }}>Login</h2>
                
                <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <Form.Group className="mb-4" controlId="formWallet">
                        <Form.Label style={{
                            display: 'block',
                            textAlign: 'left',
                            marginBottom: '0.5rem',
                            fontWeight: '500',
                            color: '#34495e'
                        }}>Connect Wallet</Form.Label>
                        { account === "" ?
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
                                Connect to Metamask
                            </Button>
                            : 
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
                        }
                    </Form.Group>
                    
                    <Button 
                        variant="primary" 
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
                    >
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login