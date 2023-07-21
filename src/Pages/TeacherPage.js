import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import TeacherFormComponent from "../Components/TeacherFormComponents";
import TeacherTableComponent from "../Components/TeacherTableComponent";

const TeacherPage = () => {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState("form");
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("teacherTableData");
        if (storedData) {
            setTableData(JSON.parse(storedData));
        }
    }, []);

    const handleFormSubmit = (formData) => {
        // Create a copy of the existing tableData array
        const updatedTableData = [...tableData];
      
        // If selectedIndex is not null, it means this is an update operation
        if (selectedIndex !== null) {
          // Update the existing entry in the updatedTableData array
          updatedTableData[selectedIndex] = formData;
        } else {
          // Otherwise, it's a new submission, so add the formData to the updatedTableData array
          updatedTableData.push(formData);
        }
      
        // Update the state with the new tableData and save it to localStorage
        setTableData(updatedTableData);
        localStorage.setItem("teacherTableData", JSON.stringify(updatedTableData));
      
        // Store the form data and file identifier in local storage with a unique key for teacher data
        localStorage.setItem("teacherFormData", JSON.stringify(formData));
      
        // Clear the selectedIndex after form submission
        setSelectedIndex(null);
      };

    const handleDelete = (index) => {
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1);
        setTableData(updatedTableData);
        localStorage.setItem("teacherTableData", JSON.stringify(updatedTableData));
    };

    const handleEdit = (index) => {
        setSelectedIndex(index);
        setCurrentPage("form");
    };

    const userType = "teacher"; 

    return (
        <div>
            <Header userType={userType} />
            <div className="main-wrap">
                <Sidebar />
                <div className="page-wrap">
                    <div className="container">
                        <div className="col-md-9">
                            <div className="card">
                                <div className="card-body">
                                    <div className="page-buttons d-flex justify-content-end mb-2">
                                        <button className="btn btn-primary" onClick={() => setCurrentPage("form")}>Form</button>
                                        <button className="btn btn-primary ms-2" onClick={() => setCurrentPage("table")}>Table</button>
                                    </div>
                                    {currentPage === "form" ? (
                                        <TeacherFormComponent
                                            handleFormSubmit={handleFormSubmit}
                                            selectedIndex={selectedIndex}
                                            formData={selectedIndex !== null ? tableData[selectedIndex] : null}
                                        />
                                    ) : (
                                        <TeacherTableComponent
                                            data={tableData}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                        />
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default TeacherPage;