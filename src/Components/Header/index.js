import React from "react";
import { Link } from "react-router-dom";

export default function Header({ userType, currentPage  }) {

    const getDashboardText = () => {
        if (currentPage === "home") {
          return "Student Teacher Dashboard";
        } else if (userType !== "teacher") {
          return "Student Dashboard";
        } else if (userType === "teacher") {
          return "Teacher Dashboard";
        } else {
          return "Dashboard"; // Fallback for unknown user types or pages
        }
      };
    
    return (
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid">
                <Link class="navbar-brand d-flex" to="/">
                    <h5>{getDashboardText()}</h5>
                </Link>
            </div>
        </nav>
    );
}