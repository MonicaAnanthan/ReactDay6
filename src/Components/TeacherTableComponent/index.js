import React, { useEffect, useState } from "react";

const TeacherTableComponent = ({ data, onEdit, onDelete }) => {

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
              <td>{item.taskDescription}</td>
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

export default TeacherTableComponent;
