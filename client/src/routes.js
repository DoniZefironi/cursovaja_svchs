
import UserList from './components/UserList';
import Method from './components/Method';
import Subject from './components/Subject';
import Syllabus from './components/Syllabus';
import Main from './components/Main';
import Login from './components/Login';
import {
    USERLIST_ROUTE,
    METHOD_ROUTE,
    SUBJECT_ROUTE,
    SYLLABUS_ROUTE,
    MAIN_ROUTE,
    LOGIN_ROUTE
} from './utils/consts';

export const adminRoutes = [
    {
        path: USERLIST_ROUTE,
        Component: UserList
    }
];

export const authRoutes = [
    {
        path: METHOD_ROUTE,
        Component: Method
    },
    {
        path: SUBJECT_ROUTE,
        Component: Subject
    },
    {
        path: SYLLABUS_ROUTE,
        Component: Syllabus
    },
    {
        path: MAIN_ROUTE,
        Component: Main
    }
];

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    }
];
