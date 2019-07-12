$('title').html(get_current_organization_title() + "Selling Item");
$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Item').addClass('active-link');

$("#tab-main").tabs();
default_currency_id = "";
LoadItemType();
LoadSupplierNameList();
LoadBrand();

$("#demo-gallery").unitegallery({
    tile_enable_shadow: false
});


$("#tb_item_no").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '32') {
        alert("Oops. Item number should not contain space");
        return false;
    }
});

function LoadRefresh()
{
    GetItem(GetURLData('id'));
}

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetItem(GetURLData('id'));
}
else {
    LoadNew();
}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    } else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

function RefreshItem() { GetItem(GetURLData('id')); }
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


//#region New Record
function LoadNew() {
    Pace.start();

    $("#tab_detail_header").html('Create New Item');
    $("#tb_id").val('');
    $('#tb_item_no').val('');
    $('#tb_item_name').val('');
    $('#hf_itemgroupid').val('');
    $('#dd_itemtype').val('').trigger("chosen:updated");
    $('#hf_supplierid').val('');
    $('#dd_supplier').val('').trigger("chosen:updated");
    $('#hf_brandid').val('');
    $('#dd_brand').val('').trigger("chosen:updated");
    $('#hf_currencyid').val(default_currency_id);
    //$('#ddl_currency').val('').trigger("chosen:updated");
    $('#ddl_currency').val(default_currency_id).trigger("chosen:updated");
    $("#tb_price1").val('');
    $("#tb_price2").val('');
    $("#tb_price3").val('');
    $("#tb_remark").val('');
    $("#tb_shortcode1").val('');
    $("#tb_shortcode2").val('');
    $('#tb_warning_level').val('');
    $('#tb_orderseq').val('');
    $('#tb_ShortDescription').val('');

    $('#tb_packagelv1_name').val('');
    $('#tb_packagelv1_qty').val('');
    $('#tb_packagelv1_price').val('');
    $('#tb_packagelv2_name').val('');
    $('#tb_packagelv2_qty').val('');
    $('#tb_packagelv2_price').val('');

    $('#tb_packagelv3_name').val('');
    $('#tb_packagelv3_qty').val('');
    $('#tb_packagelv3_price').val('');
    $('#tb_uom').val('');
    $("#ch_not_avaliable").prop("checked", false);
    if ($('#tb_item_no').val() != "") {
        $("#item_image_zone").css("display", "block");
        $("#item_barcode_zone").css("display", "block");

    }
    else {

        $("#item_image_zone").css("display", "none");
        $("#item_barcode_zone").css("display", "none");
    }
    $("#tb_item_name").focus();

    new_Attachment();
    window.history.replaceState({}, document.title, "/" + "portal/sellingitem?id=");
}
//#endregion
function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $('#tb_item_no').val() + '&UserId=' + get_current_user_id() + '&refType=ecommerceItem', '_blank');
}

//#region ItemTypeList

function LoadItemType() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllItemType",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                //generate_item_type_list(data.d);
                $("#dd_itemtype").empty();
                $("#ddl_sh_item_type_id").empty();
                $("#dd_itemtype").append("<option value=''>" + "Choose Item Group" + "</option>");
                $("#ddl_sh_item_type_id").append("<option value=''>" + "Choose Item Group" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#dd_itemtype").append("<option value=" + data.d[key]['ItemTypeID'] + ">" + data.d[key]['Title'] + "</option>")
                    $("#ddl_sh_item_type_id").append("<option value=" + data.d[key]['ItemTypeID'] + ">" + data.d[key]['Title'] + "</option>")
                })
                $("#dd_itemtype").chosen().change();
                $("#dd_itemtype").css({ "width": "100%" });
                if ($('#hf_itemgroupid').val() != "") {
                    $('#dd_itemtype').val($('#hf_itemgroupid').val()).trigger("chosen:Updated");
                }
                else {
                    $('#hf_itemgroupid').val("");
                    $('#dd_itemtype').val("").trigger("chosen:updated");
                }
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}
//#endregion

//function LoadItemType() {
//    Pace.start();
//    $.ajax({

//        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllItemTypeJson",
//        data: JSON.stringify({
//            search_text: "",
//            RequestID: get_current_user_id()
//        }),
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data.d != null) {
//                var result = JSON.parse(data.d);
//                $("#dd_itemtype").dxLookup({
//                    items: result,
//                    showClearButton: true,
//                    valueExpr: 'ItemTypeID',
//                    displayExpr: function (item) {
//                        if (!item) {
//                            return "";
//                        }

//                        return item.TypeName;
//                    },
//                    placeholder: "Select Item Type",

//                    showPopupTitle: false,
//                    onValueChanged: function (e) {                      


//                    }


//                });
              
//            }
//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

//        }
//    });


//}

//#region SupplierName

function LoadSupplierNameList() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Supplier.asmx/GetAllSupplier",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#dd_supplier").empty();
                $("#dd_supplier").append("<option value=''>" + "Choose Supplier" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#dd_supplier").append("<option value=" + data.d[key]['SupplierID'] + ">" + data.d[key]['SupplierName'] + "</option>")
                })
                $("#dd_supplier").chosen().change();
                $("#dd_supplier").css({ "width": "100%" });
                if ($('#hf_supplierid').val() != "") {
                    $('#dd_supplier').val($('#hf_supplierid').val()).trigger("chosen:Updated");
                }
                else {
                    $("#hf_supplierid").val("");
                    $("#dd_supplier").val("").trigger("chosen:updated");
                }
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}
//#endregion

//#region BrandList

function LoadBrand() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Brand.asmx/GetAllBrand",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#dd_brand").empty();
                $("#dd_brand").append("<option value=''>" + "Choose Brand" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#dd_brand").append("<option value=" + data.d[key]['BrandID'] + ">" + data.d[key]['BrandName'] + "</option>")
                });
                $("#dd_brand").chosen().change();
                $("#dd_brand").css({ "width": "100%" });
                if ($('#hf_brandid').val() != "") {
                    $('#dd_brand').val($('#hf_brandid').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_brandid").val("");
                    $("#dd_brand").val("").trigger("chosen:updated");
                }


            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}
//#endregion

//#region CurrencyList

LoadCurrency();
function LoadCurrency() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetAllCurrency",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_currency").empty();
                $("#ddl_currency").append("<option value=''>" + "Choose Currency" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_currency").append("<option value=" + data.d[key]['CurrencyID'] + ">" + data.d[key]['CurrencyCode'] + "</option>")
                    if (data.d[key]['DefaultCurrency'] == true && default_currency_id == "") {
                        default_currency_id = data.d[key]['CurrencyID'];
                        // $('#hf_currencyid').val(default_currency_id);
                    }
                });
                $("#ddl_currency").chosen().change();
                $("#ddl_currency").css({ "width": "100%" });

                if ($('#hf_currencyid').val() != "") {
                    $('#ddl_currency').val($('#hf_currencyid').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_currencyid").val("");
                    $("#ddl_currency").val(default_currency_id).trigger("chosen:updated");
                }


            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}
//#endregion



function GetItem(id) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Items.asmx/GetItem",
        data: "{ " +
            "'item_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#item_name_sp").html(data.d["ItemName"]);

                $("#tb_id").val(data.d["ItemID"]);

                $("#tab_detail_header").html(data.d["ItemNo"]);

                $('#tb_item_no').val(data.d['ItemNo']);
                $('#tb_item_name').val(data.d['ItemName']);

                $('#hf_itemgroupid').val(data.d['ItemTypeID']);
                var item_typeid = data.d['ItemTypeID'];
                $('#dd_itemtype').val(item_typeid).trigger("chosen:updated");
                //$("#dd_itemtype").dxLookup('instance').option('value', item_typeid);

                $('#hf_brandid').val(data.d['BrandID']);
                var brand_id = data.d['BrandID'];
                $('#dd_brand').val(brand_id).trigger("chosen:updated");

                $('#hf_supplierid').val(data.d['SupplierID']);
                var supplier_id = data.d['SupplierID'];
                $('#dd_supplier').val(supplier_id).trigger("chosen:updated");

                $('#hf_currencyid').val(data.d['CurrencyID']);
                var currency_id = data.d['CurrencyID'];
                $('#ddl_currency').val(currency_id).trigger("chosen:updated");

                $("#tb_price1").val(data.d['ItemPrice']);
                $("#tb_price2").val(data.d['ItemPrice2']);
                $("#tb_price3").val(data.d['ItemPrice3']);
                $("#tb_remark").val(data.d['Remark']);
                $("#tb_ShortDescription").val(data.d['EcommerceShortDescription']);
                $("#tb_shortcode1").val(data.d['ShortCode1']);
                $("#tb_shortcode2").val(data.d['ShortCode2']);
                $('#tb_warning_level').val(data.d['WarningLevelQuantity']);
                $('#tb_orderseq').val(data.d['OrderQtySequence']);
                $('#tb_packagelv1_name').val(data.d['PackageLevel1Name']);
                $('#tb_packagelv1_qty').val(data.d['PackageLevel1Qty']);
                $('#tb_packagelv1_price').val(data.d['PackageLevel1SellPrice']);
                $('#tb_packagelv2_name').val(data.d['PackageLevel2Name']);
                $('#tb_packagelv2_qty').val(data.d['PackageLevel2Qty']);
                $('#tb_packagelv2_price').val(data.d['PackageLevel2SellPrice']);

                $('#tb_packagelv3_name').val(data.d['PackageLevel3Name']);
                $('#tb_packagelv3_qty').val(data.d['PackageLevel3Qty']);
                $('#tb_packagelv3_price').val(data.d['PackageLevel3SellPrice']);
                $('#tb_uom').val(data.d['UOM']);
                $('#tb_moq').val(data.d['MOQ']);

                //Attachment-----------------------------------------
                request_attachment_id = data.d["ItemID"];
                request_attachment_type = "EcommerceItem";
                request_attachment_no = data.d["ItemNo"];
                Load_Attachment();
                // ---------------------------------------------------

                getImage(id);
                if (data.d['NotAvaliable'] == true)
                    $("#ch_not_avaliable").prop("checked", true);
                else
                    $("#ch_not_avaliable").prop("checked", false);

                if (data.d['IsEcommerce'] == true) {
                    $("#chk_Ecommerce").prop("checked", true);
                    $("#ecommerce_item").css("display", "block");
                }
                else {
                    $("#chk_Ecommerce").prop("checked", false);
                    $("#ecommerce_item").css("display", "none");
                }

                $("#demo-summernote-edit").summernote("code", data.d['EcommerceDescription']);
                ShowSuccessMessage("Loaded.");


            }
            else {
                ShowBoxMessage("Oops, we can't find the record.");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function getImage(id) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/GetImage",
        data: "{ " +
            "'refID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#item_image_zone").css("display", "block");
                $("#image_item").css("display", "none");
                $("#Image_drop_zone").css("display", "block");

                $("#item_barcode_zone").css("display", "block");
                $("#barcode_item_image").css("display", "none");
                $("#barcode_drop_zone").css("display", "block");
                $.each(data.d, function (key, val) {

                    if (data.d[key]['RefType'] == "Item") {
                        $("#tb_imageid").val(data.d[key]['ImageID']);
                        var src = "/PortalAdministration/img/Item_Images/" + data.d[key]['ImageName'];
                        $("#item_image_zone").css("display", "block");
                        $("#image_item").css("display", "block");
                        $("#Image_drop_zone").css("display", "none");
                        $("#bind_item_image_src").attr("src", src);

                    }
                    if (data.d[key]['RefType'] == "Barcode") {

                        var BarcodeImageSrc = "/PortalAdministration/img/Item_Barcode/" + data.d[key]['ImageName'];
                        $("#tb_bcimageid").val(data.d[key]['ImageID']);
                        $("#barcode_item_image").css("display", "block");
                        $("#barcode_drop_zone").css("display", "none");
                        $("#bind_barcode_image_src").attr("src", BarcodeImageSrc);
                    }
                });

            }
            else {
                ShowBoxMessage("Oops, we can't find the record.");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function SaveRecordValidation() {

    var message = '';
    if ($('#tb_item_name').val() == '' || $('#tb_item_name').val() == null) {
        message = "Fill Item Name ";
    }
    else if ($('#dd_itemtype').val() == '' || $('#dd_itemtype').val() == null) {
        message = "Choose Item Type ";
    }

    else if ($('#tb_price1').val() == '' || $('#tb_price1').val() == null) {
        message = "Fill Basic Price ";
        //$('#tb_price1').val("0");

    }
    //else if ($('#tb_price3').val() == '' || $('#tb_price2').val() == null) {
    //    message = "Fill Partner Price ";
    //    $('#tb_price2').val("0");

    //}
    //else if ($('#tb_price3').val() == '' || $('#tb_price3').val() == null) {
    //    message = "Fill Special Price ";
    //    $('#tb_price3').val("0");
    //}
    else if ($('#tb_warning_level').val() == '' || $('#tb_warning_level').val() == null) {
        $('#tb_warning_level').val("10");
        // message = "Fill Warning Level";
    }
    //else if ($('#tb_orderseq').val() == '' || $('#tb_orderseq').val() == null) {
    //    message = "Fill Order Sequence";
    //    $('#tb_orderseq').val("0");
    //}

    return message;
}

function SaveItem() {
    var message = SaveRecordValidation();
    if (message != '' && message != null) {
        LogJSError(message);
        return;

    }


    $.ajax({
        url: baseUrl() + "WebServices/WebService_Items.asmx/SaveItem",

        data: JSON.stringify({
            item: {
                ItemID: $("#tb_id").val(),
                ItemNo: $('#tb_item_no').val(),
                ItemName: $('#tb_item_name').val(),
                //ItemTypeID: $("#dd_itemtype").dxLookup("instance").option('value'), //$('#dd_itemtype').val(), 
                ItemTypeID: $('#dd_itemtype').val(),
                SupplierID: $('#dd_supplier').val(),
                BrandID: $('#dd_brand').val(),
                ItemPrice: $("#tb_price1").val(),
                ItemPrice2: $("#tb_price2").val(),
                ItemPrice3: $("#tb_price3").val(),
                Remark: $("#tb_remark").val(),
                ShortCode1:"",
                ShortCode2: "",
                WarningLevelQuantity: $('#tb_warning_level').val(),
                OrderQtySequence: $('#tb_orderseq').val(),
                PackageLevel1Name: $('#tb_packagelv1_name').val(),
                PackageLevel1Qty: $('#tb_packagelv1_qty').val(),
                PackageLevel1SellPrice: $('#tb_packagelv1_price').val(),
                PackageLevel2Name: $('#tb_packagelv2_name').val(),
                PackageLevel2Qty: $('#tb_packagelv2_qty').val(),
                PackageLevel2SellPrice: $('#tb_packagelv2_price').val(),

                PackageLevel3Name: $('#tb_packagelv3_name').val(),
                PackageLevel3Qty: $('#tb_packagelv3_qty').val(),
                PackageLevel3SellPrice: $('#tb_packagelv3_price').val(),
                NotAvaliable: $("#ch_not_avaliable").is(":checked"),
                UOM: $("#tb_uom").val(),
                EcommerceDescription: "",
                IsEcommerce: $("#chk_Ecommerce").is(":checked"),
                EcommerceShortDescription: $("#tb_ShortDescription").val(),
                MOQ: $("#tb_moq").val(),
                CurrencyID: $("#ddl_currency").val(),
            },
            RequestID: get_current_user_id()

        }),
        //dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $('#tb_item_no').val(data.d.toString().split('~')[2]);
                $("#tb_id").val(data.d.toString().split('~')[1]);
                if ($('#tb_item_no').val() != "") {
                    $("#item_image_zone").css("display", "block");
                    $("#image_item").css("display", "none");
                    $("#Image_drop_zone").css("display", "block");
                    $("#item_barcode_zone").css("display", "block");
                    $("#barcode_item_image").css("display", "none");
                    $("#barcode_drop_zone").css("display", "block");
                }
                GetItem(data.d.toString().split('~')[1]);
                ShowSuccessMessage("Saved.");
                window.history.replaceState({}, document.title, "/" + "portal/sellingitem?id=" + $("#tb_id").val());
                scrollToDiv('#tab-main');

            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//#endregion

function deleteImage() {
    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteItemImage");
    }
}
function DeleteItemImage() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImage",

        data: JSON.stringify({
            imageID: $("#tb_imageid").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                $("#item_image_zone").css("display", "block");
                $("#item_drop_zone").css("display", "block");
                $("#bind_item_image").css("display", "none");
                GetItem($("#tb_id").val());
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });

}
function deleteBarcode() {
    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteItemBarcode");
    }
}

function DeleteItemBarcode() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImage",

        data: JSON.stringify({
            imageID: $("#tb_bcimageid").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                GetItem($("#tb_id").val());
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });

}

function DeleteRecordConfirmation() {

    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteItem");
    }
}


//#region Delete Item
function DeleteItem() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Items.asmx/DeleteItem",

        data: JSON.stringify({
            item_id: $("#tb_id").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                LoadNew();
                LoadList();
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });

}
//#endregion
function changeItemImage() {
    $("#item_drop_zone").css("display", "block");
    $("#bind_item_image").css("display", "none");
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=item', '_blank');
    GetItem($("#tb_id").val());
}

function changeItemBarcode() {

    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=barcode', '_blank');

}

function CancelUploadItemImage() {
    $("#item_drop_zone").css("display", "none");
    $("#bind_item_image").css("display", "block");
    $("#bind_item_image_src").attr("src", src.substr(1));
}

//function UploadItemImage() {

//var Children = document.getElementsByClassName("dz-image");
//var img_src = Children[0]["childNodes"][0]["attributes"][2]["nodeValue"];

//// Split the base64 string in data and contentType
//var block = img_src.split(";");
//// Get the content type of the image
//var contentType = block[0].split(":")[1];// In this case "image/gif"
//// get the real base64 content of the file
//var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

//// Convert it to a blob to upload
//var blob = b64toBlob(realData, contentType);

// Create a FormData and append the file with "image" as parameter name
//var formDataToUpload = new FormData();
//formDataToUpload.append("image", blob);
//formDataToUpload.append("ItemNo", $("#tb_item_no").val()); 
//formDataToUpload.append("ItemID", $("#tb_id").val()); 
//formDataToUpload.append("UserID", get_current_user_id()); 

//for (i = 0; i < fileArray.length; i++) {
//    var filename = "UploadedFile" + i;
//    filedata.append(filename, fileArray[i][0]);
//}
//filedata.append("NewsNo", $("#tb_NewsNo").val())
//fileArray = [];
//Loading_Show();
//       var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'items', true);
//   xhr.send(formDataToUpload);
//       xhr.onreadystatechange = function () {
//           if (xhr.readyState == 4 && xhr.status == 200) {
//               GetItem($("#tb_id").val());
//               ShowSuccessMessage("Successfully upload.");
//               LoadList();

//           }
//           else if (xhr.status == 404) {            
//               ShowErrorBoxMessage("File cannot upload!");
//           }
//       }

//}


function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

var fileArray = [];
function readURL(input) {

    var val = input.value; // using $('fileupload').val();
    var fileName = val.substr(val.lastIndexOf("\\") + 1, val.length);
    if (fileName.substr(fileName.lastIndexOf(".") + 1, fileName.length) == "jpg" && "JPG" && "JPEG" && "jpeg" && "png" && "PNG") {
        $("#filename").val(fileName);
        var files = $("#f_UploadFile").get(0).files;
        if (files.length > 0) {
            // filedata.append("UploadedFiles[]", files[0]);
            fileArray.push(files);
        }
    }
    else {
        ShowErrorBoxMessage("File Input mismatch!");
    }

}

//$(".each_item_image").dropzone({
//    //url: 'items',
//    //autoProcessQueue: false,
//    addRemoveLinks: true,
//    maxFiles: 1,
//    init: function () {
//        var myDropzone = this;
//        myDropzone.on('maxfilesexceeded', function (file) {
//            this.removeAllFiles();
//            this.addFile(file);
//        });
//    }

//});


function UploadItemImage1() {
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=item', '_blank');
}

function UploadItemBarcode() {
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=barcode', '_blank');
}

// SUMMERNOTE CLICK TO EDIT
// =================================================================
// Require Summernote
// http://hackerwins.github.io/summernote/
// =================================================================
$('#demo-edit-text').on('click', function () {
    $('#demo-summernote-edit').summernote({ focus: true });
});


$('#demo-save-text').on('click', function () {
    $('#demo-summernote-edit').summernote('destroy');
});

// checkbox change
$('#chk_Ecommerce').on('change', function () {
    if ($('#chk_Ecommerce').is(':checked'))//ture
    {
        $("#ecommerce_item").css("display", "block");
    }
    else {
        $("#ecommerce_item").css("display", "none");
    }

});
