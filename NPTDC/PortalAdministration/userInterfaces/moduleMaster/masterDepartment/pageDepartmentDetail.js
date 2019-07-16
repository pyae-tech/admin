$('title').html(get_current_organization_title() + "Departments");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_department').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetDepartment(GetURLData('id'));
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

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Department Name Need To Be Fill"
    }
    if ($("#tb_notifyemail").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Email Need To Be Fill"
    }
    if ($("#tb_notifyemail").val() != "") {
        var email = $("#tb_notifyemail").val();
        var filter = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!filter.test(email)) {
            error_message += "Please provide a valid email address.";
        }
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveDepartment() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/SaveDepartment",
        data: "{ " +
            "'dep_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'department_name':'" + $("#tb_name").val() + "' " +
            ",'notifyemail':'" + $("#tb_notifyemail").val() + "' " +
            ",'protocol':'" + $("#tb_protocol").val() + "' " +
            ",'description':'" + esc_quot($("#tb_description").val()) + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                ShowSuccessMessage("Saved.");
                GetDepartment(data.d.toString().split('~')[1]);
                $("#image_item").css("display", "none");
                $("#Image_drop_zone").css("display", "block");
                scrollToDiv('#tab-main');
            }
            else if (data.d.toString().split('~')[0] == "Error") {
                ShowErrorBoxMessage("Duplicate Department Name");
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

//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Create New Department');
    $("#tb_id").val("");
    $("#tb_name").val("");
    $("#tb_notifyemail").val("");
    $("#tb_protocol").val("");
    $("#tb_remark").val("");
    $("#tb_description").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_name").focus();
    $("#image_item").css("display", "none");
    $("#Image_drop_zone").css("display", "none");
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteDepartment");
}
function DeleteDepartment() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/DeleteDepartment",
        data: "{ " +
            "'dep_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                ShowSuccessMessage("Deleted.");
                Load_List();

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

//#region Load Record
function GetDepartment(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/GetDepartment",
        data: "{ " +
            "'dep_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["DepartmentID"]);

                $("#tab_detail_header").html(data.d["DepartmentName"]);
                $("#tb_name").val(data.d["DepartmentName"]);
                $("#tb_notifyemail").val(data.d["NotifyEmail"]);
                $("#tb_protocol").val(data.d["Protocol"]);
                $("#tb_description").val(data.d["Description"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#lbl_created").text("စာရင်းသွင်းသူ : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("ပြင်ဆင်သူ : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
                getImage(id);
                ShowSuccessMessage("Loaded.");
               
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
//#endregion

//#region Image Upload
function UploadItemImage1() {
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=department', '_blank');
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

                    if (data.d[key]['RefType'] == "department") {
                        $("#tb_imageid").val(data.d[key]['RefID']);
                        $("#Ref_type").val(data.d[key]['RefType']);
                        var src = "/PortalAdministration/img/Department_Imges/" + data.d[key]['ImageName'];
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
function changeItemImage() {
    $("#item_image_zone").css("display", "block");
    $("#bind_item_image").css("display", "none");
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=department', '_blank');
    GetDepartment($("#tb_id").val());
}
function RefreshItem() { GetDepartment(GetURLData('id')); }

function DeleteImage() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImages",
        data: "{ " +
            "'RefID':'" + $("#tb_imageid").val() + "' " +
            ",'RefType':'" + $("#Ref_type").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                $("#image_item").css("display","none");
                $("#Image_drop_zone").css("display","block");
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


function deleteImage() {
    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteImage");
    }
}
//#endregion Image Upload


