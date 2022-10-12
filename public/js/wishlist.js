// Add product to wishlist/ remove product from wishlist
$(".wishListHeart").on("click", function (e) {
    const that = $(this);
    const productID = this.value;
    const wishListHeartIcon = that.find(".wishListHeartIcon");
    axios({
        url: "/account/wishlist",
        method: "put",
        data: {
            productID: productID
        }
    }).then(e => {
        const imgUrl = e.data.status ? "/static/image/icon/full-heart.svg" : "/static/image/icon/empty-heart.svg"
        wishListHeartIcon.attr("src", `${imgUrl}`);
    });

    e.stopImmediatePropagation();
});