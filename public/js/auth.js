
// Sign up
$(".signUpBtn").on("click", function (e) {
    const account = $("#account").val();
    const password = $("#password").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const number = $("#number").val();

    axios({
        url: `/signup`,
        method: `post`,
        data: {
            account: account,
            password: password,
            firstName: firstName,
            lastName: lastName,
            number: number
        }
    }).then(() => {
        window.location.href = "/";
    }).catch(err => {
        const res = err.response.data;
        if (res.status == false) {
            const message = res.message;
            const alert = $(".authAlertMessage");
            alert.text(message);
            alert.show();
        } else {
            window.location.href = "/error";
        }
    })
});

// Sign in
$(".signInBtn").on("click", function (e) {
    const account = $("#account").val();
    const password = $("#password").val();

    axios({
        url: `/signin`,
        method: `post`,
        data: {
            account: account,
            password: password
        }
    }).then(() => {
        window.location.href = "/";
    }).catch(err => {
        const res = err.response.data;
        if (res.status == false) {
            const message = res.message;
            const alert = $(".authAlertMessage");
            alert.text(message);
            alert.show();
        } else {
            window.location.href = "/error";
        }
    })
});
