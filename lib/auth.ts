export const AUTH_STORAGE_KEY = 'elysium_user';
export const AUTH_CHANGE_EVENT = 'elysium-auth-change';
export const USER = 'user';

export function notifyAuthChange() {
    window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}
