class ManageCookies{
    static createCookie(name, value, hours) {
    let expires = "";
    
    if (hours) {
        const date = new Date();
        date.setTime(date.getTime() + hours * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    
    document.cookie = name + "=" + value + expires + "; path=/";
    }
}

export default ManageCookies;