import React, { useEffect, useState } from "react";
import StudentFormComponent from "../Components/StudentFormComponents";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import StudentTableComponent from "../Components/StudentTableComponent";
import { v4 as uuidv4 } from 'uuid';

const StudentPage = ({ userType }) => {
    const [tableData, setTableData] = useState([]);
    const [currentPage, setCurrentPage] = useState("form");
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("studentTableData");
        if (storedData) {
            setTableData(JSON.parse(storedData));
        }
    }, []);

    const handleFormSubmit = (formData, file) => {
        const updatedTableData = [...tableData];
        const fileId = uuidv4(); // Generate a unique identifier for the file

        if (file) {
            // If a file was uploaded, save its metadata (e.g., name and type) and the file content (as Base64) in local storage
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileData = reader.result; // This will be the Base64 representation of the file
                const updatedRow = {
                    ...formData,
                    fileId,
                    fileName: file.name,
                    fileType: file.type,
                    fileData: fileData,
                };

                if (selectedIndex !== null) {
                    // Update existing row
                    updatedTableData[selectedIndex] = updatedRow;
                } else {
                    // Add new row
                    updatedTableData.push(updatedRow);
                }

                setTableData(updatedTableData);
                localStorage.setItem("studentTableData", JSON.stringify(updatedTableData));
            };

            reader.readAsDataURL(file);
        } else {
            // Add new row
            const newRow = {
                ...formData,
                fileId,
            };
            updatedTableData.push(newRow);
        }

        setTableData(updatedTableData);
        localStorage.setItem("studentTableData", JSON.stringify(updatedTableData));

        // Store the form data and file identifier in local storage
        localStorage.setItem("formData", JSON.stringify(formData));

        setSelectedIndex(null);
    };

    const handleDownload = (fileId) => {
        // Find the item with the given fileId in the tableData array
        const item = tableData.find((item) => item.fileId === fileId);

        if (item && item.fileData) {
            // Create a temporary anchor element to trigger the file download
            const downloadLink = document.createElement("a");
            downloadLink.href = item.fileData;
            downloadLink.download = item.fileName || "file";
            downloadLink.click();
        } else {
            // Handle the case when the file data is missing or not available
            console.log("File not available for download.");
        }
    };

    const handleDelete = (index) => {
        const updatedTableData = [...tableData];
        updatedTableData.splice(index, 1);
        setTableData(updatedTableData);
        localStorage.setItem("studentTableData", JSON.stringify(updatedTableData));
    };

    const handleEdit = (index) => {
        setSelectedIndex(index);
        setCurrentPage("form");
    };

    return (
        <div>
            <Header userType={userType}/>
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
                                        <StudentFormComponent
                                            handleFormSubmit={handleFormSubmit}
                                            selectedIndex={selectedIndex}
                                            formData={selectedIndex !== null ? tableData[selectedIndex] : null}
                                        />
                                    ) : (
                                        <StudentTableComponent
                                            data={tableData}
                                            onEdit={handleEdit}
                                            onDelete={handleDelete}
                                            onDownload={handleDownload}
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



export default StudentPage;