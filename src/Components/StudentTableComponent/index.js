import React, { useEffect, useState } from "react";

const StudentTableComponent = ({ data, onEdit, onDelete, onDownload }) => {
    const handleDownload = (fileId) => {
        // Retrieve the file content from local storage using the fileId as the key
        const fileData = localStorage.getItem(fileId);
        if (fileData) {
            const { fileName, fileContent } = JSON.parse(fileData);

            // Convert the Base64 content back to a Blob
            const byteCharacters = atob(fileContent);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                const slice = byteCharacters.slice(offset, offset + 512);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: "application/octet-stream" });

            // Create a download link and trigger the download
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = fileName;
            downloadLink.click();
        }
    };

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Batch Name</th>
                        <th>Task Name</th>
                        <th>Task Document</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.batchName}</td>
                            <td>{item.taskName}</td>
                            <td>
                                {item.fileId && item.submitTask ? (
                                    <div>
                                        <span>{item.submitTask.name}</span>
                                        <button
                                            className="btn btn-link"
                                            onClick={() => onDownload(item.fileId)}
                                        >
                                            Download
                                        </button>
                                    </div>
                                ) : (
                                    "No files submitted"
                                )}
                            </td>
                            <td>
                                <button onClick={() => onEdit(index)} className="btn btn-success">
                                    Edit
                                </button>
                                <button onClick={() => onDelete(index)} className="btn btn-danger ms-2">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTableComponent;
