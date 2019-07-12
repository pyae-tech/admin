$('title').html(get_current_organization_title() + "Item Group");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_ItemGroup').addClass('active-link');


$("#tab-main").tabs();

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


$('#tb_search_text').keyup(function (e) {
    Load_List();
});


// checkbox change
$('#cb_isparent').on('change', function () {
    if ($('#cb_isparent').is(':checked'))//ture
    {
        $("#choose_parent").css("display", "none");       
    }
    else
    {
        $("#choose_parent").css("display", "block");
    }
       

});


function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    Load_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_List();
}

//#region Listing
function clearSearch() {
    $('#tb_search_text').val('');
    $('#tb_search_itemgroup').val('');
    $('#hf_current_page').val("1");
   
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();
}

function search() {
    $('#tb_search_text').val();
    $('#tb_search_itemgroup').val();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();

}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    } else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

function LoadNew() {

    $("#tab_detail_header").html('Create New Item Group');
    $("#tb_id").val("");
    $("#cb_isparent").prop("checked", true);//checkbox
    if ($('#cb_isparent').is(':checked'))//ture
    {
        $("#choose_parent").css("display", "none");
    }
    $("#hf_ParentID").val("");
    $("#tb_ParentID").val("").trigger("chosen:updated");
    $("#hf_CategoryID").val("");
    $("#tb_categoryID").val("").trigger("chosen:updated");
    $("#tb_name").val("");
    $("#tb_seq").val("");
    $("#tb_remark").val("");

  
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_name").focus();

    if ($('#tb_id').val() != "") {
        $("#item_image_zone").css("display", "block");

    }
    else { 
        $("#item_image_zone").css("display", "none");
    }
}

Load_List();
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllItemTypeWithPagination",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_itemgroup':'" + $("#tb_search_itemgroup").val()  + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'pageNo':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');

        }
    });
}

function generate_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_row').html();



        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('.tb_current_page').val(paginationInfos[2]);
            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page').val(paginationInfos[2]);
            $('.btn_pagination_next').hide();
            $('.btn_pagination_previous').hide();
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
            var src = "/PortalAdministration/img/ItemType_Images/" + records[key]['ImageName'];

            allCardsCode += the_template.replace()
           //     .replace("[IsParent]", records[key]['IsParent'])//checkbox
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[Title]", records[key]['Title'])
                .replace("[ItemImage]", src)
                .replace("[Seq]", records[key]['Seq'])
                .replace("[Remark]", records[key]['Remark']);
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex-1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}

Load_Parent_List();
function Load_Parent_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllParentItemType",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_ParentID").empty();
                $("#tb_ParentID").append("<option value=''>" + "Choose Item Type" + "</option>");
              $.each(data.d, function (key, val) {
                    $("#tb_ParentID").append("<option value=" + data.d[key]['ItemTypeID'] + ">" + data.d[key]['TypeName'] + "</option>");
                })
                $("#tb_ParentID").chosen().change();
                $("#tb_ParentID_chosen").css({"width": "100%"});
                if ($('#hf_ParentID').val() != "") {
                    $('#tb_ParentID').val($('#hf_ParentID').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_ParentID').val("");
                    $('#tb_ParentID').val("").trigger("chosen:updated");
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

function GetItemType(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetItemType",
        data: "{ " +
            "'item_type_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                
                $("#tb_id").val(data.d["ItemTypeID"]);

                $("#tab_detail_header").html(data.d["TypeName"]);

                if (data.d['IsParent'] == true)               
                { //parent             
                    $("#cb_isparent").prop("checked", true);
                    $("#tb_ParentID").val(""); 
                    $("#choose_parent").css("display", "none");
                }
                else {   // child
                 
                    $("#cb_isparent").prop("checked", false);
                    $("#hf_ParentID").val(data.d["ParentID"]);
                    var parent_id = data.d["ParentID"];
                    $("#tb_ParentID").val(parent_id).trigger("chosen:updated");  
                    $("#choose_parent").css("display", "block");
                }
                getImage(data.d["ItemTypeID"]);
                $("#tb_name").val(data.d["TypeName"]);
                $("#tb_seq").val(data.d["Seq"]);
                $("#tb_remark").val(data.d["Remark"]);

                $("#hf_CategoryID").val(data.d["CategoryID"]);
                var category_id = data.d["CategoryID"];
                $("#tb_categoryID").val(category_id).trigger("chosen:updated");  
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                //$("#tab-main").tabs("option", "active", 0);
                //$(".tab-menu").removeClass("active");
                //$("#tab_list_menu").addClass("active");
                ShowSuccessMessage("Loaded.");
                $('#dialogBox_Detail_Form').modal('show');
                }
            else {
                ShowBoxMessage("Oops, we can't find the record. ");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function UploadItemImage1() {
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=itemtype', '_blank');
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
               
                $.each(data.d, function (key, val) {

                    if (data.d[key]['RefType'] == "ItemType") {
                        $("#tb_imagetypeid").val(data.d[key]['ImageID']);
                        var src = "/PortalAdministration/img/ItemType_Images/" + data.d[key]['ImageName'];
                        $("#item_image_zone").css("display", "block");
                        $("#image_item").css("display", "block");
                        $("#Image_drop_zone").css("display", "none");
                        $("#bind_item_image_src").attr("src", src);

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
//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Type Name Need To Be Fill"
    }

    if (!$("#cb_isparent").is(":checked")) {
        if ($("#tb_ParentID").val() == "") {
            if (error_message != "") error_message += "<br/>";
            error_message += "Choose Item Type "
        }
    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}
function deleteImage() {
    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteItemTypeImage");
    }
}
function DeleteItemTypeImage() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImage",

        data: JSON.stringify({
            imageID: $("#tb_id").val(),
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
                GetItemType($("#tb_id").val());
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

function changeItemImage() {
    $("#item_drop_zone").css("display", "block");
    $("#bind_item_image").css("display", "none");
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=itemtype', '_blank');
    GetItemType($("#tb_id").val());
}

function CancelUploadItemImage() {
    $("#item_drop_zone").css("display", "none");
    $("#bind_item_image").css("display", "block");
    $("#bind_item_image_src").attr("src", src.substr(1));
}

function RefreshItem() { GetItemType($("#tb_id").val()); }

function SaveItemType() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();


    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/SaveItemType",
        data: "{ " +
            "'item_type_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'type_name':'" + $("#tb_name").val() + "' " +
            ",'seq':'" + $("#tb_seq").val() + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'IsParent':'" + $("#cb_isparent").is(":checked") + "'" +//checkbox
            ",'parent_type_id':'" + $("#tb_ParentID").val() + "' " +
            ",'category_id':'" + $("#tb_categoryID").val() + "' " +



            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_List();
                ShowSuccessMessage("Saved.");
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


//#region Delete
function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteItemType");
}
function DeleteItemType() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemType.asmx/DeleteItemType",
        data: "{ " +
            "'item_type_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {              
                LoadNew();
                Load_List();
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops, we can't save. " + data.d.toString().split('~')[1]);
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


Load_Category_List();
function Load_Category_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Category.asmx/GetAllCategory",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_categoryID").empty();
                $("#tb_categoryID").append("<option value=''>" + "Choose Category Name..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_categoryID").append("<option value=" + data.d[key]['CategoryID'] + ">" + data.d[key]['CategoryName'] + "</option>");
                });
                $('#tb_categoryID').chosen().change();
                $("#tb_categoryID_chosen").css({ "width": "100%" });

                if ($('#hf_CategoryID').val() != "") {
                    $('#tb_categoryID').val($('#hf_CategoryID').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_CategoryID").val("");
                    $("#tb_categoryID").val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
