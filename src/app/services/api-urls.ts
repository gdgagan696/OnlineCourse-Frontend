export class ApiUrl{

    static authenticate:string= 'users/authenticate';
    static signUp:string= 'users/createUser';
    static userInfo:string= 'users/getUser';
    static updatePassword:string= 'users/changePassword';
    static updateInfo:string= 'users/updateInfo';
    static allCourses:string='course/getCourses';
    static addNewCourse:string='course/addCourse';
    static editCourse:string='course/updateCourse';
    static deleteCourse:string='course/deleteCourse/';
    static allEnrollCourses:string='user/getCourses';
    static enrollNewCourse:string='user/addCourse/';
    static deleteEnrollCourse:string='user/deleteCourse/';
}