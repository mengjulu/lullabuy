// Add to cart
$(".cartBtn").on("click", function (e) {
    const productID = this.value;
    axios({
        url: "/cart",
        method: "post",
        data: {
            productID: productID
        }
    }).then(e => {
        const status = e.data.status;
        const stock = e.data.stock;
        const cartNum = e.data.cartNum;

        // Edit the cart number on navbar if add successfully,
        // or display a stock warning.
        status ? $(".cartNum").text(cartNum) :
            swal.fire({
                title: "Sorry... :(",
                text: `Only ${stock} left.`,
                icon: "error"
            })
    })
});

// Edit the amount of product in cart
$(".editAmountBtn").on("click", function (e) {
    const that = $(this);
    const card = that.closest(".card");
    const productAmountBox = card.find(".productAmount");
    const productAmount = card.find(".productAmount").text().replace(/\$|\,/g, "");
    const productPrice = card.find(".productPrice").text().replace(/\$|\,/g, "");
    const orderAmount = $(".orderAmount").text().replace(/\$|\,/g, "");
    const cartQuantity = card.find(".cartQuantity");
    const productID = that.data("productid");
    const editAmount = this.value;

    // Ask user to delete remove product if the amount equals 1
    cartQuantity.text() < 2 && editAmount == -1 ?
        Swal.fire({
            title: "Want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yep, go ahead!"
        }).then(e => {
            if (e.isConfirmed) deleteProductRequest(card, orderAmount, productAmount, productID);
        }) : axios({
            method: "put",
            url: "/cart",
            data: {
                productID: productID,
                editAmount: editAmount
            }
        }).then(e => {
            let status = e.data.status;
            let stock = e.data.stock;
            // Updated quantity
            let productEditedQuantity = e.data.productEditedQuantity;
            let editedAmount = e.data.editedAmount;

            // Updated subtotal
            let newSum = status || (editedAmount != 0 && !status) ? Number(productAmount) + (Number(productPrice) * editedAmount) :
                Number(productAmount);
            // Updated total
            let newTotal = status || (editedAmount != 0 && !status) ? Number(orderAmount) + (Number(productPrice) * editedAmount) :
                Number(orderAmount);

            cartQuantity.text(productEditedQuantity);
            productAmountBox.text(`$${newSum.toLocaleString()}`);
            $(".orderAmount").text(`$${newTotal.toLocaleString()}`);

            if (!status) {
                swal.fire({
                    title: "Sorry... :(",
                    text: `Only ${stock} left.`,
                    icon: "error"
                });
            }
        });

    e.stopImmediatePropagation();
});

// Delete the amount of product in cart
$(".deleteCartBtn").on("click", function (e) {
    const productID = this.value;
    const that = $(this);
    const card = that.closest(".card");
    const deleteProductAmount = card.find(".productAmount").text().replace(/\$|\,/g, "");
    const orderAmount = $(".orderAmount").text().replace(/\$|\,/g, "");

    deleteProductRequest(card, orderAmount, deleteProductAmount, productID);
});


const deleteProductRequest = (card, orderAmount, productAmount, productID) => {
    axios({
        method: "delete",
        url: "/cart",
        data: {
            productID: productID
        }
    }).then(e => {
        if (e.data.deleteStatus) {
            // Remove the product if deleteStatus equals true
            let newTotal = Number(orderAmount) - Number(productAmount);
            if (newTotal === 0) {
                window.location.href = "/cart"
            } else {
                card.remove();
                $(".cartNum").text(e.data.cartNum);
                $(".orderAmount").text(`$${newTotal.toLocaleString()}`);
            }
        } else {
            // Display a warning if deleteStatus equals false
            Swal.fire({
                icon: "error",
                title: "Oops... Something went wrong!",
            });
        };
    });
}

// Checkout
$(".checkoutBtn").on("click", function (e) {
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let email = $("#email").val();
    let address = $("#address").val();
    let number = $("#number").val();
    let saveCheck = $("#saveCheck").is(":checked");

    axios({
        url: `/checkout`,
        method: "post",
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            number: number,
            address: address,
            saveCheck: saveCheck
        }
    }).then(e => {
        $(this).attr("disabled", "disabled");
        const orderNumber = e.data.orderNumber;
        // Redirect to third-party payment page
        window.location.href = `/payment/${orderNumber}`;

    }).catch(err => {
        const message = err.response.data.message;
        const alert = $(".shippingInfoAlertMessage");
        alert.text(message);
        alert.show();
    })
});