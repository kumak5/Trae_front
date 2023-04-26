import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Paths } from './constants/paths';
import { useAppSelector } from './helpers/hooks/useAppSelector';
import { Roles } from './store/slices/auth/types';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import FullPageLoader from './components/FullPageLoader';

const EmployeeLogin = lazy(() => import('./pages/EmployeeLogin'));
const EmployeeMain = lazy(() => import('./pages/EmployeeMain'));
const EmployeeProjects = lazy(() => import('./pages/EmployeeProjects'));
const EmployeeProjectStages = lazy(
  () => import('./pages/EmployeeProjectStages')
);
const EmployeeStagesInWork = lazy(() => import('./pages/EmployeeStagesInWork'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Constructors = lazy(() => import('./pages/Constructors'));
const CreateConstructor = lazy(() => import('./pages/CreateConstructor'));
const UpdateUser = lazy(() => import('./pages/UpdateUser'));
const Employees = lazy(() => import('./pages/Employees'));
const CreateEmployee = lazy(() => import('./pages/CreateEmployee'));
const WorkTypes = lazy(() => import('./pages/WorkTypes'));
const UpdateWorkType = lazy(() => import('./pages/UpdateWorkType'));
const CreateWorkType = lazy(() => import('./pages/CreateWorkType'));
const UpdateEmployee = lazy(() => import('./pages/UpdateEmployee'));
const PersonalCabinet = lazy(() => import('./pages/PersonalCabinet'));
const PersonalCabinetEditing = lazy(
  () => import('./pages/PersonalCabinetEditing')
);
const PersonalCabinetChangePassword = lazy(
  () => import('./pages/PersonalCabinetChangePassword')
);
const CreateProject = lazy(() => import('./pages/CreateProject'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ProjectStage = lazy(() => import('./pages/ProjectStage'));

const App = () => {
  const { isLoggedIn } = useAppSelector((store) => store.employee);
  const { permission } = useAppSelector((store) => store.auth);

  return (
    <Layout>
      <Suspense fallback={<FullPageLoader />}>
        <Routes>
          <Route path={Paths.LOGIN} element={<Login />} />
          <Route path="*" element={<Navigate to={Paths.LOGIN} replace />} />

          {/* All users */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={
                  permission === Roles.ADMIN ||
                  permission === Roles.CONSTRUCTOR ||
                  permission === Roles.EMPLOYEE
                }
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route
              path={Paths.PERSONAL_CABINET}
              element={<PersonalCabinet />}
            />
            <Route
              path={Paths.PERSONAL_CABINET_EDITING}
              element={<PersonalCabinetEditing />}
            />
            <Route
              path={Paths.PERSONAL_CABINET_CHANGE_PASSWORD}
              element={<PersonalCabinetChangePassword />}
            />
          </Route>

          {/* Admin routes */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={permission === Roles.ADMIN}
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.DASHBOARD} element={<Dashboard />} />
            <Route path={Paths.PROJECTS} element={<Projects />} />
            <Route path={Paths.PROJECTS_CREATE} element={<CreateProject />} />
            <Route path={Paths.PROJECT_DETAILS} element={<ProjectDetails />} />
            <Route path={Paths.PROJECT_STAGE} element={<ProjectStage />} />
            <Route path={Paths.CONSTRUCTORS} element={<Constructors />} />
            <Route
              path={Paths.CONSTRUCTORS_CREATE}
              element={<CreateConstructor />}
            />
            <Route path={Paths.CONSTRUCTORS_EDITING} element={<UpdateUser />} />
            <Route path={Paths.EMPLOYEES} element={<Employees />} />
            <Route path={Paths.EMPLOYEES_CREATE} element={<CreateEmployee />} />
            <Route
              path={Paths.EMPLOYEES_EDITING}
              element={<UpdateEmployee />}
            />
            <Route path={Paths.WORK_TYPES} element={<WorkTypes />} />
            <Route
              path={Paths.WORK_TYPES_EDITING}
              element={<UpdateWorkType />}
            />
            <Route
              path={Paths.WORK_TYPES_CREATE}
              element={<CreateWorkType />}
            />
          </Route>

          {/* Employee routes */}
          <Route
            element={
              <ProtectedRoute
                isAllowed={permission === Roles.EMPLOYEE}
                redirectPath={Paths.LOGIN}
              />
            }
          >
            <Route path={Paths.EMPLOYEE_LOGIN} element={<EmployeeLogin />} />
            <Route
              element={
                <ProtectedRoute
                  isAllowed={isLoggedIn}
                  redirectPath={Paths.EMPLOYEE_LOGIN}
                />
              }
            >
              <Route path={Paths.EMPLOYEE_MAIN} element={<EmployeeMain />} />
              <Route
                path={Paths.EMPLOYEE_PROJECTS}
                element={<EmployeeProjects />}
              />
              <Route
                path={Paths.EMPLOYEE_PROJECT_STAGES}
                element={<EmployeeProjectStages />}
              />
              <Route
                path={Paths.EMPLOYEE_STAGES_IN_WORK}
                element={<EmployeeStagesInWork />}
              />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
