$('title').html(get_current_organization_title() + "Selling Items");
$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Item').addClass('active-link');

$("#tab-main").tabs();


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

LoadBrand();
LoadItemType();
LoadSupplierNameList();
LoadList('first');

var link = "sellingitems?UserId=" + get_current_user_id();
var fileUploader = $("#excel_fileUpload").dxFileUploader({
    multiple: false,
    allowedFileExtensions: [".xlsx"],
    accept: "*",
    value: [],
    uploadUrl: link, 
    uploadMode: "instantly",
    onValueChanged: function (e) {
        var files = e.value;
        if (files.length > 0) {
            //    $("#selected-files .selected-item").remove();
            $.each(files, function (i, file) {
                var file_name = file.name.split('.')[0] + "_" + get_current_user_id() + "." +  file.name.split('.')[1];
                $("#hf_uploadFileName").val(file_name);
                //        var $selectedItem = $("<div />").addClass("selected-item");
                //        $selectedItem.append(
                //            $("<span />").html("Name: " + file.name + "<br/>"),
                //            $("<span />").html("Size:" + file.size + " bytes" + ","),
                //            $("<span />").html("Type : " + file.type + "<br/>"),
                //            //$("<span />").html("Last Modified Date: " + file.lastModifiedDate)
                //        );
                //        $selectedItem.appendTo($("#selected-files"));
                //    });
                //    $("#selected-files").show();
                //}
                //else
                //    $("#selected-files").hide();

                //$('#myform').submit();


            });
        }
    }
}).dxFileUploader("instance");

function ImportExcel() {
    $('#panel_list_background').loading();
    //var fName = fileName.split('.')[0] + "_" + get_current_user_id() + "." + fileName.split('.')[1];
    Pace.start();
    $.ajax({


        url: baseUrl() + "WebServices/WebService_Items.asmx/ImportItemFromExcel",
        data: "{ " +
            "'filename':'" + $("#hf_uploadFileName").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    ShowErrorBoxMessage(data.d.toString().split('~')[1]);
                    LoadList('first');
                    $("#hf_uploadFileName").val("");

                }
                else {
                    alert("Oops. " + data.d.toString().split('~')[1]);
                    location.reload();
                }
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
        }
    });
}

$("#btn_Import").dxButton({
    icon: "upload",
    type: "success",
    text: "Import Excel",
    onClick: function (e) {
        ImportExcel();
        $("#excel_fileUpload").dxFileUploader("instance").reset();
    }
});

$("#btn_Cancel").dxButton({
    icon: "close",
    text: "Cancel",
    onClick: function (e) {
        if ($("#hf_uploadFileName").val() != "" || $("#hf_uploadFileName").val() != null)
        {
            DeleteExcelFile();
            $("#excel_fileUpload").dxFileUploader("instance").reset();
        }
        
    }
});

function DeleteExcelFile() {
    
        Pace.start();
        $.ajax({


            url: baseUrl() + "WebServices/WebService_Items.asmx/DeleteExcelFile",
            data: "{ " +
                "'filename':'" + $("#hf_uploadFileName").val() + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    if (data.d.toString().split('~')[0] == "Success") {
                        ShowBoxMessage("Success");
                        $("#hf_uploadFileName").val("");
                     
                    }
                    else {
                        ShowErrorBoxMessage("Oops. " + data.d.toString().split('~')[1]);
                    }
                   
                    LoadList('first');
                   
                }
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
               
            }
        });
    }


$('#tb_search_text').keyup(function (e) {
    LoadList('search');
});

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    LoadList('search');
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    LoadList('search');
}


function LoadBrand() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Brand.asmx/GetAllBrandJson",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#dd_brand").dxLookup({
                    items: result,
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.BrandName;
                    },
                    placeholder: "Select Brand",
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                    }
                     
                });

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
////#region Load list 

function LoadSupplierNameList() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Supplier.asmx/GetAllSupplierJson",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#dd_supplier").dxLookup({
                    items: result,
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.SupplierName;
                    },
                    placeholder: "Select Supplier",
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                     
                    }
                });
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

function LoadList(status) {
    $('#panel_list_background').loading();
    var sh_item_type = ""; var sh_brand = ""; var sh_supplier = "";

    if (status == "search") {
        var sh_item_type_list = $("#ddl_sh_item_type_id").dxLookup("instance").option('value');        
        sh_item_type = sh_item_type_list === null ? "" : sh_item_type_list.ItemTypeID;

        var sh_brand_list = $("#dd_brand").dxLookup("instance").option('value');
        sh_brand = sh_brand_list === null ? "" : sh_brand_list.BrandID;
        var sh_supplier_list = $("#dd_supplier").dxLookup("instance").option('value');
        sh_supplier = sh_supplier_list === null ? "" : sh_supplier_list.SupplierID;
    }
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Items.asmx/GetAllSellingItemsWithPagination",

        data: JSON.stringify({
            search_text: $('#tb_search_text').val(),
            search_item: $('#tb_sh_text').val(),
            sh_item_type: sh_item_type,
            sh_brand: sh_brand,
            sh_supplier: sh_supplier,
            RequestID: get_current_user_id(),
            PageNoString: $('#hf_current_page').val()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                generate_list(data.d);
                $('#panel_list_background').loading('stop');
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
        }
    });

}

//#endregion

function generate_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var label_class;
    var item_info;
    var status_label;
    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('.tb_current_page').val(paginationInfos[2]);
            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page').val(paginationInfos[2]);
            $('.btn_pagination_next').hide();
            $('.btn_pagination_previous').hide();


            if (paginationInfos[0] == "0") {
                $('#img_no_data').show();
            } else {
                $('#img_no_data').hide();
            }


            if (paginationInfos[4] == 'y') {
                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('.btn_pagination_next').show();
            }
            if (paginationInfos[3] == 'y') {
                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('.btn_pagination_previous').show();
            }
        } else {
            the_template = $('#template_row').html();

            if (records[key]['NotAvaliable'] == true) {
                label_class = "not-available";
                status_label = "မရရွိေသးပါ";
                item_info = "not-available";
            }
            else {
                label_class = "available";
                status_label = "ရရှိနိုင်";
                item_info = "";
            }

            // var src = records[key]['ImagePath'];
            var src = "/PortalAdministration/img/Item_Images/" + records[key]['ItemImage'];
            var itemprice = parseInt(records[key]['ItemPrice']);
            var currency = records[key]['Currency'] == "***" ? "MMK" : records[key]['Currency'];


            allCardsCode += the_template.replace()
                .replace("[ItemID]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID]", records[key]['ItemID'])//[ItemID
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemType]", records[key]['ItemTypeName'])
                .replace("[ItemName]", records[key]['ItemName'])
                .replace("[ItemImage]", src)
                .replace("[ItemPrice]", itemprice == null ? "" : NumberWithCommas(itemprice) + currency)            
                .replace("[item-info]", item_info)
                .replace("[Remark]", records[key]['Remark'])
                .replace("[Brand]", records[key]['Brand'] == null ? "" : records[key]['Brand'])
                .replace("[Supplier]", records[key]['Supplier'] == null ? "" : records[key]['Supplier']) 
                //.replace("[Supplier]", records[key]['Supplier']) 
            
                .replace("[row_number]", rowindex - 1);

           

        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }
  
    $('.list_count').html(rowindex - 1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);

    // $("#item_list_img").attr("onerror", "OnImageError(this);");
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

                $.each(data.d, function (key, val) {

                    if (data.d[key]['RefType'] == "Item") {

                        var src = "/PortalAdministration/img/Item_Images/" + data.d[key]['ImageName'];
                        return src;

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

function GetItem(id) {
    window.open('sellingitem?id=' + id, '_blank');
}


function clearSearch() {
    $('#tb_search_text').val('');
    LoadBrand();
    LoadItemType();
    LoadSupplierNameList();
    LoadList();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}
function search() {
    $('#tb_search_text').val();
    $('#tb_sh_text').val();
    $('#ddl_sh_item_type_id').val();
    LoadList('search');
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}


function LoadNew() {
    window.open('sellingitem?id=', '_blank');
}


//#region ItemTypeList

function LoadItemType() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllItemTypeJson",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#ddl_sh_item_type_id").dxLookup({
                    items: result,
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.TypeName;
                    },
                    placeholder: "Select Group",
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                       // $(".selected").show();
                      // alert( e.value.ItemTypeID);
                       // $("#selected-employee-notes").text(e.value.Notes);
                    }
                });
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

function OnImageError(source) {
    var src = [];
    src = source.src.split('/');

    if (src[source.src.split('/').length - 1] != "[ItemImage]") {
        source.src = "/PortalAdministration/img/bg-img/default_item.jpg";
    }

    return true;
} 
function InsertOrgId() {
    $("[id$=tb_orgid]").val(get_current_user_org_id());
}
//$('#rate2').rating({
//    size: 40,                      //this option defines the size of the star
//    primaryColor: "#999",         //this color code defines the primary color of stars
//    hoverColor: "#0066ff",        //this color code defines the hover state of stars    
//    count: 5                      //defines the number of stars you want in a rater       
//});




//$(document).on('click', '#reset', function () {
//    $('#rate2').rating('refresh');    //this option resets the rater and set to 0
//})

//$(document).on('click', '#vll', function () {
//    alert($('#rate2').rating('val')); //this option returns you the value of the rating done by the user
//})

//$(document).on('click', '#disable', function () {
//    $('#rate2').rating('disable'); //this option disables the rater
//})

