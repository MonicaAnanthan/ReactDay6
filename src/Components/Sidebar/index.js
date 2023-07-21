import React from "react";
import {useNavigate} from 'react-router-dom';
import sideLogo from '../../assets/teacher.png'

export default function Sidebar() {

    const navigate = useNavigate();

    return (
        <div className="side-bar">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <img className="sidebar-logo" src={sideLogo} />
                </a>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {/* <li className="nav-item">
                                    <a href="#" className="nav-link align-middle px-0">
                                        <i className="fs-4 bi-house"></i> <span className="ms-1 d-none d-sm-inline">Home</span>
                                    </a>
                                </li> */}
                    <li className="nav-item" onClick={ () => navigate ('/') }>
                        <a href="#" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="fs-4 bi-speedometer2"></i> <span className="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}