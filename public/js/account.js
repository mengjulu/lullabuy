const sanitizer = (text) => {
    return text.replace(/[<>\\/&%#"'\s]/g, "");
};

// Edit personal settings
$(document).on("click", ".editBtn", function (e) {
    const firstName = $("#firstName");
    const lastName = $("#lastName");
    const number = $("#number");
    const address = $("#address");

    firstName.replaceWith(`<input id="firstName" class="form-control" value=${firstName.text()}></input>`);
    lastName.replaceWith(`<input id="lastName" class="form-control" value=${lastName.text()}></input>`);
    number.replaceWith(`<input id="number" class="form-control" value=${number.text()}></input>`);
    address.replaceWith(`<input id="address" class="form-control" value=${address.text()}></input>`);
    $(".editBtn").replaceWith(`<button class="saveBtn btn btn-outline-secondary">SAVE</button>`);
});

$(document).on("click", ".saveBtn", function (e) {
    const firstName = $("#firstName");
    const lastName = $("#lastName");
    const number = $("#number");
    const address = $("#address");
    const alert = $(".authAlertMessage");

    axios({
        url: `/account/settings`,
        method: `put`,
        data: {
            firstName: sanitizer(firstName.val()),
            lastName: sanitizer(lastName.val()),
            number: number.val(),
            address: sanitizer(address.val())
        }
    }).then(e => {
        firstName.replaceWith(`<p id="firstName" class="infoText">${sanitizer(firstName.val())}</p>`);
        lastName.replaceWith(`<p id="lastName" class="infoText">${sanitizer(lastName.val())}</p>`);
        number.replaceWith(`<p id="number" class="infoText">${number.val()}</p>`);
        address.replaceWith(`<p id="address" class="infoText">${sanitizer(address.val())}</p>`);
        alert.hide();
        $(".saveBtn").replaceWith(`<button class="editBtn btn btn-outline-secondary">EDIT</button>`);
    }).catch(err => {
        const message = err.response.data.message;
        alert.text(message);
        alert.show();
    })
});

// Edit password
$(".savePasswordBtn").on("click", function (e) {
    const currentPwd = $("#currentPwd");
    const newPwd = $("#newPwd");
    const alert = $(".authAlertMessage");
    alert.hide();
    axios({
        url: `/account/settings/password`,
        method: `patch`,
        data: {
            currentPwd: currentPwd.val(),
            newPwd: newPwd.val()
        }
    }).then(e => {
        const message = e.data.message;
        alert.text(message);
        alert.show();
        currentPwd.val("");
        newPwd.val("");
    }).catch(err => {
        const message = err.response.data.message;
        alert.text(message);
        alert.show();
    });

});

// Cancel order
$(".cancelOrderBtn").on("click", function (e) {
    const that = $(this);
    const orderNumber = that.val();
    const orderEdit = that.closest(".orderEdit");
    Swal.fire({
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: "patch",
                url: `/account/order/${orderNumber}`
            }).then(e => {
                orderEdit.replaceWith(`<span class="orderDisplayItem"> Canceled </span>`);
            });
        }
    }).catch(err => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
        })
    });
    e.stopImmediatePropagation();
});