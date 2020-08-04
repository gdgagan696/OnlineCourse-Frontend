import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static matchPassword(AC: AbstractControl) {
       let password = AC.get('newPassword').value; // to get value in input tag
       let confirmPassword = AC.get('rePassword').value; // to get value in input tag
       
        if(password !== confirmPassword) {
            
            AC.get('rePassword').setErrors( {matchPassword: true} );
            return {matchPassword: true};
        } else {
            
            return null
        }
    }
}