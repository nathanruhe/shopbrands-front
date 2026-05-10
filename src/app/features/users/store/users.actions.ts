import { createAction, props } from '@ngrx/store';
import { 
    User, 
    UpdateProfile, 
    ChangePassword, 
    DeleteProfile, 
    MessageResponse 
} from '../../../core/models/user.model';

// PERFIL
export const loadProfile = createAction('[Users] Load Profile')
export const loadProfileSuccess = createAction('[Users] Load Profile Success', props<{ user: User }>());
export const loadProfileFailure = createAction('[Users] Load Profile Failure', props<{ error: string }>());

// EDITAR PERFIL
export const updateProfile = createAction('[Users] Update Profile', props<{ data: UpdateProfile }>());
export const updateProfileSuccess = createAction('[Users] Update Profile Success', props<{ user: User }>());
export const updateProfileFailure = createAction('[Users] Update Profile Failure', props<{ error: string }>());

// CAMBIAR CONTRASEÑA
export const changePassword = createAction('[Users] Change Password', props<{ data: ChangePassword }>());
export const changePasswordSuccess = createAction('[Users] Change Password Success', props<{ response: MessageResponse }>());
export const changePasswordFailure = createAction('[Users] Change Password Failure', props<{ error: string }>());

// ELIMINAR PERFIL
export const deleteProfile = createAction('[Users] Delete Profile');
export const deleteProfileSuccess = createAction('[Users] Delete Profile Success', props<{ response: DeleteProfile }>());
export const deleteProfileFailure = createAction('[Users] Delete Profile Failure', props<{ error: string }>());