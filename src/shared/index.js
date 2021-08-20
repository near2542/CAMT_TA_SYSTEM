import axios from './axios'
// export type user = {
//     id:string | null,
//     auth : boolean
//     email : string | null
//     role : string | null
//     // access_token : string | null
//     // expired_in :string | null
// }

// export type authUser = {
//     email : string | null
//     password : string | null
// }

// export type courses = {
//     id : string
// }

// export enum major  {
//     NONE,
//     MMIT,
//     ANI,
//     SE,
//     DII,
//     DG,
// }

// export enum role{
//     NONE,
//     TA,
//     Admin,
//     Teacher

// }

// export enum TAtype {
//     NONE=0,
//     internal=1,
//     external=2,
// }

// export type RegisterUser = {
//     TA_type : TAtype 
//     email : string 
//     password : string 
//     confirm_password : string 
//     firstname : string 
//     lastname : string 
//     student_id? : string 
//     tel: string 
//     major : major
//     line? : string 
//     facebook? : string 
//     portfolio? : string 
//     role : role

// }

// export type formErrorHandling = {
//     status:boolean,
//     message:string,
// }

// export type RegisterFormValidate = {
//     TA_type : boolean
//     email : formErrorHandling
//     password : formErrorHandling
//     confirm_password : formErrorHandling
//     firstname : formErrorHandling
//     lastname : formErrorHandling
//     student_id? : formErrorHandling
//     tel: formErrorHandling
//     major :formErrorHandling
//     line? : boolean
//     facebook? : boolean
//     portfolio? : boolean
//     role : boolean

// }

export const role = {
    '1': 'Admin',
    '2': 'Student TA',
    '3': 'External TA',
    '4': 'Teacher',
}



export {axios};