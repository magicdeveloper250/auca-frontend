import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
 
import { ErrorContextProvider } from './contexts/ErrorContext';
import { ToastProvider } from './contexts/ToastContext';
import MyToast from './components/Toast';
import { AuthProvider } from './contexts/userSessionContext';
import LoginRequiredLayout from './Layouts/LoginRequiredLayout';
import RefreshLayout from './Layouts/RefreshLayout';
import Logout from './Layouts/LogoutLayout';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import AdminPage from './pages/admin';
import { CoursesPage } from './pages/courses';
import { DepartmentsPage } from './pages/departments';
import { ExamsPage } from './pages/exams';
import { SchedulesPage } from './pages/schedules';
import { SemestersPage } from './pages/semesters';
import { AdminsPage } from './pages/admins';
import { StudentsPage } from './pages/students';
import { AllocationsPage } from './pages/allocations';
import { OccupanciesPage } from './pages/occupancies';

const App = () => {
  return (
  <BrowserRouter>
    <ErrorContextProvider>
        <ToastProvider>
              <MyToast />
              <AuthProvider>
                 
                    <Routes>
                      
                          <Route path='/' element={<HomePage/>} />
                          <Route path='/login' element={<LoginPage/>} />
                           
                      <Route element={<RefreshLayout/>}>
                          <Route element={<LoginRequiredLayout/>}>
                            
                                <Route
                                    path="/admin"
                                     element={<AdminPage />}
                                >
                                  
                                  <Route
                                      element={<CoursesPage/>}
                                      index
                                  />
                                  <Route
                                      path="courses"
                                         element={<CoursesPage/>}
                                  />
                                   <Route
                                      path="departments"
                                         element={<DepartmentsPage/>}
                                  />
                                   <Route
                                      path="allocations"
                                         element={<AllocationsPage/>}
                                  />
                                   <Route
                                      path="exams"
                                         element={<ExamsPage/>}
                                  />
                                    <Route
                                      path="schedules"
                                         element={<SchedulesPage/>}
                                  />
                                    <Route
                                      path="occupancies"
                                         element={<OccupanciesPage/>}
                                  />


                                     <Route
                                      path="semesters"
                                         element={<SemestersPage/>}
                                  />
                                    <Route
                                      path="admins"
                                         element={<AdminsPage/>}
                                  />
                                    <Route
                                      path="students"
                                         element={<StudentsPage/>}
                                  />
                                  <Route
                                      path="messages/:id"
                                      element={<h1>Message</h1>}
                                  />
                                </Route>
                              </Route>
                            
                            <Route path='/logout' element={<Logout/>}/>
                          </Route>
                          <Route path='*' element={<h1>Not Found</h1>}/>
                    </Routes>
              </AuthProvider>
        </ToastProvider>
    </ErrorContextProvider>
  </BrowserRouter>
    
  )
}

export default App