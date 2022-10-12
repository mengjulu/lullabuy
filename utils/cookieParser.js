const cookieSplit = (rawCookies, cookiesList = {}) => {
    if(!rawCookies) return cookiesList;
    const cookies = rawCookies.split(";");
    cookies.forEach((data) => {
        const cookie = data.split("=");
        cookiesList[cookie[0].trim()] = cookie[1];
    });

    return cookiesList;
};

module.exports = {

    getUserCookie: (req) => {
        const cookiesList = cookieSplit(req.headers.cookie);
        const tokenType = cookiesList.hasOwnProperty("jwtToken") ? "jwtToken" :
            cookiesList.hasOwnProperty("adminJwtToken") ? "adminJwtToken" : null;
        const token = tokenType ? cookiesList[tokenType] : null;

        return {
            tokenType: tokenType,
            token: token
        };
    },

    getCartCookie: (req) => {
        const cookiesList = cookieSplit(req.headers.cookie);
        const cartID = req.user ? req.user.id : cookiesList.hasOwnProperty("cartID") ? cookiesList["cartID"] : null;

        return cartID;
    }
}