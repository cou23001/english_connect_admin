import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Users from './pages/Users';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Edit from './pages/InstructorProfile';
import Instructors from './pages/Instructors';
import Layout from './components/Layout';
import Register from './pages/Register';
import Units from './pages/Units';
import Stakes from './pages/Stakes';
import EditStakes from './components/EditStakes';
import InstructorProfile from './pages/InstructorProfile';
import StudentProfile from './pages/StudentProfile';
import CreateStudent from './components/CreateStudent';
import CreateInstructor from './components/CreateInstructor';
import CreateUnit from './pages/CreateUnit';
import CreateStake from './pages/CreateStake';
import EditUnitInfo from './components/EditUnitInfo';
import EditUser from './components/EditUser';
import RegisterStudentForm from './components/RegisterStudentForm';
import UnitInfo from './pages/UnitInfo';
import Statistics from './pages/Statistics';
import Groups from './pages/Groups';
import GroupInfo from './pages/GroupInfo';
import CreateGroup from './pages/CreateGroup';
import MyProfile from './pages/MyProfile';
import MyAttendance from './pages/MyAttendance';
import { AuthProvider } from './context/authContext';


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: "users", element: <Users/>},
      {path: "users/:id", element: <EditUser/>},
      {path: "students", element: <Students/>},
      {path: "students/:id", element: <StudentProfile/>},
      {path: "createStudent/:id", element: <CreateStudent/>},
      {path: "registerStudentCourse", element: <RegisterStudentForm />},
      {path: "attendance", element: <Attendance/>},
      {path: "login", element: <Login/>},
      {path: "instructorProfile/:id", element: <InstructorProfile/>},
      {path: "editInstructor/:id", element: <Edit/>},
      {path: "instructors/", element: <Instructors/>},
      {path: "createInstructor", element: <CreateInstructor/>},
      {path: "register", element: <Register/>},
      {path: "units", element: <Units/>},
      {path: "createUnit", element: <CreateUnit/>},
      {path: "stakes", element: <Stakes/>},
      {path: "stakes/:id", element: <EditStakes/>},
      {path: "createStake", element: <CreateStake/>},
      {path: "editUnitInfo", element: <EditUnitInfo/>},
      {path: "unitInfo/:id", element: <UnitInfo/>},
      {path: "statistics", element: <Statistics/>},
      {path: "groups", element: <Groups/>},
      {path: "groupInfo/:id", element: <GroupInfo/>},
      {path: "createGroup", element: <CreateGroup/>},
      {path: "my-profile", element: <MyProfile /> },
      {path: "my-attendance", element: <MyAttendance /> },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>
);
