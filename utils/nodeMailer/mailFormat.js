exports.createMailHtml = (order, orderSum, productDetails, orderUrl) => {
    let productDetail = "";

    productDetails.forEach(p => productDetail += `<table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-6"
    role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
    <tbody>
        <tr>
            <td>
                <table align="center" border="0" cellpadding="0" cellspacing="0"
                    class="row-content stack" role="presentation"
                    style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:680px"
                    width="680">
                    <tbody>
                        <tr>
                            <td class="column column-1"
                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                width="58.333333333333336%">
                                <table border="0" cellpadding="0" cellspacing="0"
                                    class="text_block block-2" role="presentation"
                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                    width="100%">
                                    <tr>
                                        <td class="pad"
                                            style="padding-bottom:45px;padding-left:30px;padding-right:10px;padding-top:45px">
                                            <div style="font-family:sans-serif">
                                                <div class="txtTinyMce-wrapper"
                                                    style="font-size:12px;mso-line-height-alt:14.399999999999999px;color:#232323;line-height:1
.2;font-family:'Droid Serif',Georgia,Times,'Times New Roman',serif">
                                                    <p style="margin:0;font-size:12px"><span
                                                            style="font-size:17px;">${p.name}</span></p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class="column column-2"
                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;b
order-right:0;border-bottom:0;border-left:0"
                                width="16.666666666666668%">
                                <table border="0" cellpadding="0" cellspacing="0"
                                    class="paragraph_block block-2" role="presentation"
                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                    width="100%">
                                    <tr>
                                        <td class="pad"
                                            style="padding-top:45px;padding-right:40px;padding-bottom:45px;padding-left:40px">
                                            <div
                                                style="color:#000;font-size:14px;font-family:'Droid Serif',Georgia,Times,'Times New Roman',ser
if;font-weight:400;line-height:150%;text-align:right;direction:ltr;letter-spacing:0;mso-line-height-alt:21px">
                                                <p style="margin:0">${p.orderProduct.quantity}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td class="column column-3"
                                style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-align:top;border-top:0;b
order-right:0;border-bottom:0;border-left:0"
                                width="25%">
                                <table border="0" cellpadding="0" cellspacing="0"
                                    class="paragraph_block block-2" role="presentation"
                                    style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                    width="100%">
                                    <tr>
                                        <td class="pad"
                                            style="padding-top:45px;padding-right:40px;padding-bottom:45px;padding-left:40px">
                                            <div
                                                style="color:#000;font-size:14px;font-family:'Droid Serif',Georgia,Times,'Times New Roman',ser
if;font-weight:400;line-height:120%;text-align:right;direction:ltr;letter-spacing:0;mso-line-height-alt:16.8px">
                                                <p style="margin:0">$ ${(p.price * p.orderProduct.quantity).toLocaleString()}</p>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </td>
        </tr>
    </tbody>
</table>`);

    let html = `<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--
>
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style>
        * {
            box-sizing: border-box
        }

        body {
            margin: 0;
            padding: 0
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0;
            overflow: hidden
        }

        @media (max-width:700px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important
            }

            .icons-inner {
                text-align: center
            }

            .icons-inner td {
                margin: 0 auto
            }

            .image_block img.big,
            .row-content {
                width: 100% !important
            }

            .mobile_hide {
                display: none
            }

            .stack .column {
                width: 100%;
                display: block
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important
            }
        }
    </style>
</head>

<body style="margin:0;background-color:#fff;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none">
    <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff" width="100%">
        <tbody>
            <tr>
                <td>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"
                        width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="image_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="width:100%;padding-right:0;padding-left:0;padding-top:45px">
                                                                <div align="center" class="alignment"
                                                                    style="line-height:10px"><a
                                                                        style="outline:none" tabindex="-1"
                                                                        target="_blank"><img alt="Logo" class="big"
                                                                            src="cid:logo"
                                                                            style="display:block;height:auto;border:0;width:374px;max-width:10
0%"
                                                                            title="Logo" width="374" /></a></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div
                                                                    style="color:#000;font-size:14px;font-family:'Droid Serif',Georgia,Times,'
Times New Roman',serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0;mso-line-height-alt:16.8px">
                                                                    <p style="margin:0"><span
                                                                            style="color: #c4baba;">Good nite, sleep
                                                                            tight!</span></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-5" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:15px;padding-left:10px;padding-right:10px;padding-top:30
px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:14px;mso-line-height-alt:16.8px;color:#3b5e72;line-he
ight:1.2;font-family:'Droid Serif',Georgia,Times,'Times New Roman',serif">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:center">
                                                                            <strong><span style="font-size:38px;">Thank
                                                                                    you for your order!
                                                                                    🥳</span></strong></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-8" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:100
px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;font-family:'Droid Serif',Georgia,Times,'Times N
ew Roman',serif;mso-line-height-alt:21.6px;color:#33563c;line-height:1.8">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left;mso-line-height-alt
:36px">
                                                                            <span
                                                                                style="color:#000000;font-size:20px;"><strong><span
                                                                                        style="">Order
                                                                                        Detail:</span></strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="divider_block block-9" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div align="center" class="alignment">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0;mso-table-rspace:0"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size:1px;line-height:1px;border-top:1px solid #bbb
">
                                                                                <span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="58.333333333333336%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15p
x">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;font-family:'Droid Serif',Georgia,Times,'Times N
ew Roman',serif;mso-line-height-alt:21.6px;color:#33563c;line-height:1.8">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left">
                                                                            <span style="color:#000000;"><strong><span
                                                                                        style="font-size:16px;">Order
                                                                                        number:</span></strong></span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-3" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:30
px">
                                                                <div
                                                                    style="color:#000;font-size:14px;font-family:'Droid Serif',Georgia,Times,'
Times New Roman',serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:16.8px">
                                                                    <a href="${orderUrl}" style="margin:0">${order.orderNumber}</a>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-4" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:15px;padding-left:30px;padding-right:30px;padding-top:10
px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;font-family:'Droid Serif',Georgia,Times,'Times N
ew Roman',serif;mso-line-height-alt:21.6px;color:#33563c;line-height:1.8">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left;mso-line-height-alt
:28.8px">
                                                                            <span
                                                                                style="font-size:16px;color:#000000;"><strong><span
                                                                                        style="">Address:</span></strong></span>
                                                                        </p>
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left;mso-line-height-alt
:28.8px">
                                                                            <span
                                                                                style="font-size:16px;color:#000000;"><span
                                                                                    style="">${order.address}</span></span>
                                                                                    </p>
                                                                                    <p
                                                                                    style="margin:0;font-size:14px;text-align:left;mso-line-he
ight-alt:28.8px">
                                                                                    <span
                                                                                        style="font-size:16px;color:#000000;"><span
                                                                                            style="">${order.number}</span></span>
                                                                                            </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="41.666666666666664%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:5px;padding-left:30px;padding-right:30px;padding-top:15p
x">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;font-family:'Droid Serif',Georgia,Times,'Times N
ew Roman',serif;mso-line-height-alt:21.6px;color:#000;line-height:1.8">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left">
                                                                            <strong><span
                                                                                    style="font-size:16px;">Payment:</span></strong>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-3" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-left:30px;padding-right:30px;padding-top:10px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;font-family:'Droid Serif',Georgia,Times,'Times N
ew Roman',serif;mso-line-height-alt:21.6px;color:#d19fc2;line-height:1.8">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:left;mso-line-height-alt
:46.800000000000004px">
                                                                            <span
                                                                                style="font-size:26px;color:#000000;"><strong>$
                                                                                    ${orderSum.toLocaleString()}</strong></span></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-4"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;border-radius:0;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="58.333333333333336%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:30
px">
                                                                <div
                                                                    style="color:#000;font-size:18px;font-family:'Droid Serif',Georgia,Times,'
Times New Roman',serif;font-weight:400;line-height:120%;text-align:left;direction:ltr;letter-spacing:0;mso-line-height-alt:21.599999999999998p
x">
                                                                    <p style="margin:0"><strong>Product</strong></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="16.666666666666668%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10
px">
                                                                <div
                                                                    style="color:#000;font-size:18px;font-family:'Droid Serif',Georgia,Times,'
Times New Roman',serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0;mso-line-height-alt:21.59999999999999
8px">
                                                                    <p style="margin:0"><strong>Qty</strong></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-3"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="25%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="paragraph_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-top:15px;padding-right:10px;padding-bottom:15px;padding-left:10
px">
                                                                <div
                                                                    style="color:#000;font-size:18px;font-family:'Droid Serif',Georgia,Times,'
Times New Roman',serif;font-weight:400;line-height:120%;text-align:center;direction:ltr;letter-spacing:0;mso-line-height-alt:21.59999999999999
8px">
                                                                    <p style="margin:0"><strong>Subtotal</strong></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-5"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="divider_block block-1" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div align="center" class="alignment">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0;mso-table-rspace:0"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size:1px;line-height:1px;border-top:1px solid #bbb
">
                                                                                <span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    ${productDetail}
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-8"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;padding-top:5px;padding-bottom:5px;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <table border="0" cellpadding="10" cellspacing="0"
                                                        class="divider_block block-1" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                                                        <tr>
                                                            <td class="pad">
                                                                <div align="center" class="alignment">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0;mso-table-rspace:0"
                                                                        width="100%">
                                                                        <tr>
                                                                            <td class="divider_inner"
                                                                                style="font-size:1px;line-height:1px;border-top:1px solid #bbb
">
                                                                                <span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-9"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="66.66666666666667%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:25px;padding-left:30px;padding-right:30px;padding-top:25
px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;mso-line-height-alt:14.399999999999999px;color:#
232323;line-height:1.2;font-family:'Droid Serif',Georgia,Times,'Times New Roman',serif">
                                                                        <p style="margin:0;font-size:14px"><strong><span
                                                                                    style="font-size:18px;">Order
                                                                                    Total</span></strong></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td class="column column-2"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="33.333333333333336%">
                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                        class="text_block block-2" role="presentation"
                                                        style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"
                                                        width="100%">
                                                        <tr>
                                                            <td class="pad"
                                                                style="padding-bottom:25px;padding-left:40px;padding-right:40px;padding-top:25
px">
                                                                <div style="font-family:sans-serif">
                                                                    <div class="txtTinyMce-wrapper"
                                                                        style="font-size:12px;mso-line-height-alt:14.399999999999999px;color:#
d19fc2;line-height:1.2;font-family:'Droid Serif',Georgia,Times,'Times New Roman',serif">
                                                                        <p
                                                                            style="margin:0;font-size:14px;text-align:right">
                                                                            <strong><span
                                                                                    style="font-size:18px;color:#000000;">$
                                                                                    ${orderSum.toLocaleString()}</span></strong></p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-11"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#3b5e72"
                        width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1"
                                                    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;vertical-alig
n:top;border-top:0;border-right:0;border-bottom:0;border-left:0"
                                                    width="100%">
                                                    <div class="spacer_block"
                                                        style="height:60px;line-height:60px;font-size:1px"> </div>
                                                    <div class="spacer_block mobile_hide"
                                                        style="height:20px;line-height:20px;font-size:1px"> </div>
                                                    <div class="spacer_block"
                                                        style="height:5px;line-height:5px;font-size:1px"> </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-12"
                        role="presentation" style="mso-table-lspace:0;mso-table-rspace:0" width="100%">
                        <tbody>
                            <tr>
                                <td>
                                    <table align="center" border="0" cellpadding="0" cellspacing="0"
                                        class="row-content stack" role="presentation"
                                        style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:680px"
                                        width="680">
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>`;

    return html;
};
