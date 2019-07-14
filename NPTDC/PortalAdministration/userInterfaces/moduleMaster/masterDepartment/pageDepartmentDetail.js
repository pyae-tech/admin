﻿$('title').html(get_current_organization_title() + "Departments");

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

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_name').focus();
    });


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

