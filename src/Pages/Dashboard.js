import React from "react";
import {useNavigate} from 'react-router-dom';
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import teacherImg from "../assets/classroom.png";
import studentImg from "../assets/group.png";

export default function Dashboard({ userType, currentPage }) {

    const navigate = useNavigate();

    return (
        <div>
            <Header userType={userType} currentPage={currentPage} />
            <div className="main-wrap">
                <Sidebar />
                <div className="page-wrap">
                    <div className="container">
                        <div className="row col-md-9 dash-wrap">
                            <div className="col-12 col-md-6">
                                <div className="card" onClick={() => navigate('/teacherpage')}>
                                    <div className="card-body">
                                        <img src={teacherImg} className="card-icon"  />
                                        <h3>Teacher</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="card" onClick={() => navigate('/studentpage')}>
                                    <div className="card-body">
                                        <img src={studentImg} className="card-icon"  />
                                        <h3>Student</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}