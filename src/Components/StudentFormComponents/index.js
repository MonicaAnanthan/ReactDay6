import React, { useState, useRef, useEffect } from "react";

const StudentFormComponent = ({ handleFormSubmit, selectedIndex, formData }) => {
  const [formValues, setFormValues] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (formData) {
      setFormValues(formData);
      setSelectedFile(formData.submitTask || null);
    }
  }, [formData]);

  const handleInputChange = (e) => {
    const inputName = e.target.getAttribute("name");
    const inputValue = inputName === "submitTask" ? e.target.files[0] : e.target.value;

    if (inputName === "submitTask") {
      setSelectedFile(inputValue);
    }

    setFormValues((prevData) => ({
      ...prevData,
      [inputName]: inputValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormValues = { ...formValues };

    handleFormSubmit(updatedFormValues);
    setFormValues({});
    setSelectedFile(null);
    formRef.current.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <label className="form-label">Batch Name</label>
          <input
            type="text"
            name="batchName"
            value={formValues.batchName || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            name="taskName"
            value={formValues.taskName || ""}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Submit Task</label>
          <input
            type="file"
            name="submitTask"
            onChange={handleInputChange}
            className="form-control"
          />
          {selectedFile && (
            <p>Current File: {selectedFile.name}</p>
          )}
        </div>
        <button className="btn btn-primary w-100">
          {selectedIndex !== null ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default StudentFormComponent;
