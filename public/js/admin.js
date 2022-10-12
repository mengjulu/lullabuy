// Delete product
$(".deleteProductBtn").on("click", function (e) {
    const that = $(this);
    const productID = that.val();
    const thisProductCard = that.closest(".card");

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(result => {
        if (result.isConfirmed) {
            axios({
                url: `/admin/product/${productID}`,
                method: "delete"
            }).then(e => {
                Swal.fire({
                    icon: "success",
                    iconColor: "#868B8E",
                    title: "The product is deleted.",
                }).then(() => {
                    thisProductCard.remove();
                })
            })
        }
    }).catch(err => {
        Swal.fire("Oops! The product isn't found.");
    })
});

// Resend order confirmation letter
$(document).on("click", ".informOrderBtn", function (e) {
    const that = $(this);
    const orderNumber = that.val();

    Swal.fire({
        text: "Resend the order letter?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go ahead!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: "post",
                url: `/admin/order/${orderNumber}`
            }).then(e => {
                Swal.fire(
                    "OK!",
                    "Request received.",
                    "info"
                );
            });
        };
    });
    e.stopImmediatePropagation();
});


// Cancel order
$(".cancelOrderBtn").on("click", function (e) {
    const that = $(this);
    const orderNumber = that.val();
    const orderStatus = that.prev(".paymentStatus");
    const cancelBtn = `<button class="orderDisplayEdit btn btn-sm btn-outline-secondary deleteOrderBtn" value="${orderNumber}">
    Delete
</button>`;

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
                url: `/admin/order/${orderNumber}`
            }).then(e => {
                if (e.data.status) {
                    that.replaceWith(cancelBtn);
                    orderStatus.text("Canceled");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                };
            });
        }
    });

    e.stopImmediatePropagation();
});

// Delete order
$(document).on("click", ".deleteOrderBtn", function (e) {
    const that = $(this);
    const orderNumber = that.val();
    const thisOrder = that.closest(".orderDisplay");

    Swal.fire({
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                method: "delete",
                url: `/admin/order/${orderNumber}`
            }).then(e => {
                if (e.data.status) {
                    thisOrder.remove();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    })
                };
            });
        }

    });
    e.stopImmediatePropagation();
});

// Authorization permissions
$(".adminCheckBtn").on("click", function (e) {
    const that = $(this);
    const userID = that.val();
    axios({
        method: "patch",
        url: "/admin/user",
        data: {
            userID: userID
        }
    });
    e.stopImmediatePropagation();
});