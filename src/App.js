import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Routes } from "react-router-dom";
import Dashboard from './Pages/Dashboard';
import StudentPage from './Pages/StudentPage';
import TeacherPage from './Pages/TeacherPage';

function App() {

  const userType = "teacher"; 
  const currentPage = "home";
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard  userType={userType} currentPage={currentPage}/>}></Route>
          <Route path='/studentpage' element={<StudentPage />}></Route>
          <Route path='/teacherpage' element={<TeacherPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
