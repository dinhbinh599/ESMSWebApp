import Register from "./screen/create-user/Register"
import ProjectDetail from "./screen/project/ProjectDetail"
import ListCandidate from "./screen/confirm/ListCandidate"
import ConfirmPage from "./screen/confirm/ConfirmPage"
import Dashboard from "./screen/dashboard/Dashboard"
import Project from "./screen/project/Project"
import Profile from "./screen/profile/Profile"
import Position from "./screen/position/Position"
import CreatePosition from "./screen/position/CreatePosition"
import Skill from "./screen/skill/Skill"
import CreateSkills from "./screen/skill/CreateSkills"
import Certification from "./screen/certification/Certification"
import CreateCertification from "./screen/certification/CreateCertification"
import EmpList from "./screen/Employees/EmpList"
import PositionAssign from "./screen/create-user/PositionAssign"
import AddEmployee from "./screen/add-employee/AddEmployee"
import ConfirmAddEmployee from "./screen/confirm-add-employee/ConfirmAddEmployee"


const route = [
    {
        path: "/",
        exact: true,
        main: () => <Dashboard />,
    },
    {
        path: "/project",
        exact: true,
        main: () => <Project />,
    },
    {
        path: "/project/detail/:id",
        exact: true,
        main: ({ match }) => <ProjectDetail match={match} />,
    },
    {
        path: "/project/add-employees/:id",
        exact: true,
        main: ({ match }) => < AddEmployee match={match} />,
    },
    {
        path: "/project/confirm-add-employees/:id",
        exact: true,
        main: ({ match }) => < ConfirmAddEmployee match={match} />,
    },
    {
        path: "/project/confirm-candidate/:id",
        exact: true,
        main: ({ match }) => <ListCandidate match={match} />,
    },
    {
        path: "/project/confirm-accept-candidate/:id",
        exact: true,
        main: ({ match }) => <ConfirmPage match={match} />
    },
    {
        path: "/employee",
        exact: true,
        main: () => <EmpList />,
    },
    {
        path: "/employee/profile/:id",
        exact: true,
        main: ({ match }) => <Profile match={match} />,
    },
    {
        path: "/employee/update-profile/:id",
        exact: true,
        main: ({ match }) => <Register match={match} />,
    },
    {
        path: "/employee/update-position/:id",
        exact: true,
        main: () => <PositionAssign />,
    },
    {
        path: "/employee/register",
        exact: true,
        main: () => <Register />,
    },
    {
        path: "/employee/position-assign",
        exact: true,
        main: () => <PositionAssign />,
    },
    {
        path: "/position",
        exact: true,
        main: () => <Position />,
    },
    {
        path: "/position/create",
        exact: true,
        main: () => <CreatePosition />,
    },
    {
        path: "/position/update/:id",
        exact: true,
        main: ({ match }) => <CreatePosition match={match} />,
    },
    {
        path: "/skill",
        exact: true,
        main: () => <Skill />,
    },
    {
        path: "/skill/create",
        exact: true,
        main: () => <CreateSkills />,
    },
    {
        path: "/skill/update/:id",
        exact: true,
        main: ({ match }) => <CreateSkills match={match} />,
    },
    {
        path: "/certification",
        exact: true,
        main: () => <Certification />,
    },
    {
        path: "/certification/create",
        exact: true,
        main: () => <CreateCertification />,
    },
    {
        path: "/certification/update/:id",
        exact: true,
        main: ({ match }) => <CreateCertification match={match} />,
    },
    {
        path: "/profile",
        exact: true,
        main: () => <Profile empID={JSON.parse(localStorage.getItem("EMP"))} />,
    },
];

export default route