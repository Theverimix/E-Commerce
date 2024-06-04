import Cookies from 'js-cookie'

export async function userLogout() {
    Cookies.remove('token')
    return true
}
