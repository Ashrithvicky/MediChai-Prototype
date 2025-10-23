import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Web3 from 'web3';
import { Link } from 'react-router-dom';

const Insurer = ({ mediChain, account, ethValue }) => {
    const [insurer, setInsurer] = useState(null);
    const [patList, setPatList] = useState([]);
    const [policyList, setPolicyList] = useState([]);
    const [polName, setPolName] = useState('');
    const [polCoverValue, setPolCoverValue] = useState('');
    const [polDuration, setPolDuration] = useState('');
    const [polPremium, setPolPremium] = useState('');
    const [showRecord, setShowRecord] = useState(false);
    const [claimsIdList, setClaimsIdList] = useState([]);
    const [claimsList, setClaimsList] = useState([]);
    const [showRecordModal, setShowRecordModal] = useState(false);
    const [patientRecord, setPatientRecord] = useState(null);

    const getInsurerData = async () => {
        const insurer = await mediChain.methods.insurerInfo(account).call();
        setInsurer(insurer);
    }

    const getPolicyList = async () => {
        const pol = await mediChain.methods.getInsurerPolicyList(account).call();
        setPolicyList(pol);
    }

    const createPolicy = (e) => {
        e.preventDefault();
        mediChain.methods.createPolicy(polName, polCoverValue, polDuration, polPremium).send({ from: account })
            .on('transactionHash', (hash) => {
                return window.location.href = '/login';
            });
    }

    const handleCloseRecordModal = () => setShowRecordModal(false);
    const handleShowRecordModal = async (e, patient) => {
        let record = {};
        await fetch(`${process.env.REACT_APP_INFURA_DEDICATED_GATEWAY}/ipfs/${patient.record}`)
            .then(res => res.json())
            .then(data => record = data);
        setPatientRecord(record);
        setShowRecordModal(true);
    }
    
    const getPatientList = async () => {
        const pat = await mediChain.methods.getInsurerPatientList(account).call();
        let pt = [];
        for (let i = 0; i < pat.length; i++) {
            let patient = await mediChain.methods.patientInfo(pat[i]).call();
            pt = [...pt, patient];
        }
        setPatList(pt);
    }

    const getClaimsData = async () => {
        const claimsIdList = await mediChain.methods.getInsurerClaims(account).call();
        let cl = [];
        for (let i = claimsIdList.length - 1; i >= 0; i--) {
            let claim = await mediChain.methods.claims(claimsIdList[i]).call();
            let patient = await mediChain.methods.patientInfo(claim.patient).call();
            let doctor = await mediChain.methods.doctorInfo(claim.doctor).call();
            claim = { ...claim, id: claimsIdList[i], patientEmail: patient.email, doctorEmail: doctor.email, policyName: claim.policyName };
            cl = [...cl, claim];
        }
        setClaimsList(cl);
    }

    const approveClaim = async (e, claim) => {
        const value = claim.valueClaimed / ethValue;
        mediChain.methods.approveClaimsByInsurer(claim.id).send({ from: account, value: Web3.utils.toWei(value.toString(), 'Ether') })
            .on('transactionHash', (hash) => {
                return window.location.href = '/login';
            });
    }

    const rejectClaim = async (e, claim) => {
        mediChain.methods.rejectClaimsByInsurer(claim.id).send({ from: account })
            .on('transactionHash', (hash) => {
                return window.location.href = '/login';
            });
    }

    const handleShowRecord = (e, pat) => {
        const table = document.getElementById('records');
        const idx = e.target.parentNode.parentNode.rowIndex;
        if (!showRecord) {
            const row = table.insertRow(idx + 1);
            row.innerHTML = "Yo";
            setShowRecord(true);
        } else {
            table.deleteRow(idx + 1);
            setShowRecord(false);
        }
    }

    useEffect(() => {
        if (account === "") return window.location.href = '/login';
        if (!insurer) getInsurerData();
        if (policyList.length === 0) getPolicyList();
        if (patList.length === 0) getPatientList();
        if (claimsIdList.length === 0) getClaimsData();
    }, [insurer, patList, policyList, claimsIdList]);

    return (
        <div>
            {insurer ?
                <>
                    <div className='box'>
                        <h2>Doctor's Profile</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name: {insurer.name}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email: {insurer.email}</Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Address: {account}</Form.Label>
                            </Form.Group>
                        </Form>
                    </div>
                    <div className='box'>
                        <h2>Create New Patient Details</h2>
                        <Form>
                            <Form.Group className='mb-3'>
                                <Form.Label>Patient Name: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={polName}
                                    onChange={(e) => setPolName(e.target.value)}
                                    placeholder='Enter patient name'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Patient Age: </Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    value={polCoverValue} onChange={(e) => setPolCoverValue(e.target.value)}
                                    placeholder='Enter patient age'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Admitted Days: </Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    value={polPremium} onChange={(e) => setPolPremium(e.target.value)}
                                    placeholder='Enter number of days patient is admitted'
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <Form.Label>Diagnosis Stage: </Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    value={polDuration} onChange={(e) => setPolDuration(e.target.value)}
                                    placeholder='Enter patient diagnosis'
                                />
                            </Form.Group>
                            
                            <Button type="submit" variant="coolColor" onClick={createPolicy}>
                                Create Patient Details
                            </Button>
                        </Form>
                    </div>

                    <div className='box'>
                        <h2>List of Patients</h2>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Sr.&nbsp;No.</th>
                                    <th>Patient&nbsp;Name</th>
                                    <th>Patient&nbsp;Age</th>
                                    <th>Admitted&nbsp;Days</th>
                                    <th>Diagnosis Stage</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                            { policyList.length > 0 ?
                                policyList.map((pol, idx) => {
                                    return (
                                    <tr key={idx+1}>
                                        <td>{idx+1}</td>
                                        <td>{pol.name}</td>
                                        <td>{pol.coverValue}</td>
                                        <td> {pol.premium}</td>
                                        <td>{pol.timePeriod}</td>
                                    </tr>
                                    )
                                })
                                : <></>
                            }
                        </tbody>
                            
                        </Table>
                    </div>

                    
                </>
                :
                <div className="loading">
                    Loading...
                </div>
            }
        </div>
    );
};

export default Insurer;