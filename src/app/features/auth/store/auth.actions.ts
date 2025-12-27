import { createAction, props } from '@ngrx/store';
import {
    Login,
    LoginResponse,
    Register,
    MessageResponse,
    ChangePassword,
    ForgotPassword,
    ResetPassword
} from '../../../core/models/auth.model';

// CONECTARSE
export const login = createAction('[Auth] Login', props<{ data: Login }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ response: LoginResponse }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

// DESCONECTARSE
export const logout = createAction('[Auth] Logout');

// REGISTRARSE
export const register = createAction('[Auth] Register', props<{ data: Register }>());
export const registerSuccess = createAction('[Auth] Register Success', props<{ response: MessageResponse }>());
export const registerFailure = createAction('[Auth] Register Failure', props<{ error: string }>());

// CAMBIAR CONTRASEÑA
export const changePassword = createAction('[Auth] Change Password', props<{ data: ChangePassword }>());
export const changePasswordSuccess = createAction('[Auth] Change Password Success', props<{ response: MessageResponse }>());
export const changePasswordFailure = createAction('[Auth] Change Password Failure', props<{ error: string }>());

// RECUPERAR CONTRASEÑA
export const forgotPassword = createAction('[Auth] Forgot Password', props<{ data: ForgotPassword }>());
export const forgotPasswordSuccess = createAction('[Auth] Forgot Password Success', props<{ response: MessageResponse }>());
export const forgotPasswordFailure = createAction('[Auth] Forgot Password Failure', props<{ error: string }>());

// RESETEAR CONTRASEÑA
export const resetPassword = createAction('[Auth] Reset Password', props<{ data: ResetPassword }>());
export const resetPasswordSuccess = createAction('[Auth] Reset Password Success', props<{ response: MessageResponse }>());
export const resetPasswordFailure = createAction('[Auth] Reset Password Failure', props<{ error: string }>());

// LIMPIAR ERRORES
export const clearAuthFeedback = createAction('[Auth] Clear Feedback');
