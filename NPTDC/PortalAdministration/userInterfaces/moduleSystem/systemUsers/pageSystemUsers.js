$('title').html(get_current_organization_title() + "System Users");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_user').addClass('active-link');


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

Load_List();
Load_Org_Name();

//#region Listing
function clearSearch() {
    $('#tb_search_text').val('');
    $('#tb_category_search').val('');
    $('#tb_category_search').attr('tb_category_search', '');
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}
function search() {


    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUser",
        data: "{ " +
        "'search_text':'" + $("#tb_search_text").val() + "' " +
        ",'org_id':'" + get_current_user_org_id() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
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


        allCardsCode += the_template.replace()
            .replace("[UserID]", records[key]['UserID'])
            .replace("[UserCode]", records[key]['UserCode'])
            .replace("[UserName]", records[key]['UserName'])
            //.replace("[AgentName]", records[key]['AgentName'])
            .replace("[RoleName]", records[key]['RoleName'])
            .replace("[Email]", records[key]['Email']);

    });
    if (rowindex == 0) $('#panel_list').hide();
    else $('#panel_list').show();



    $('.list_count').html(rowindex);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);



}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_name").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require Name Of The User"
    }
    if ($("#tb_role option:selected").text() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require User Role "
    }
    if ($("#tb_code").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require Code Of The User";
    }

    if ($("#tb_org_name option:selected").text() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require Org Name";
    }

    if ($("#tb_user_email").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require E-Mail Of The User";
    }
    else {
        var email = $("#tb_user_email").val();
        var filter = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (!filter.test(email)) {
            error_message += "Please provide a valid email address.";
        }
    }

    if ($("#tb_password").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require Password";
    }

    if ($("#tb_confirm_password").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Require Confirm Password";
    }

    if ($("#tb_password").val() != $("#tb_confirm_password").val()) {
        if (error_message != "") error_message += "\n";
        error_message += "Password And Confirm Password Must Be Same";
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveUser() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();
    $("#hf_org_id").val($("#tb_org_name").val());
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/SaveUser",
        data: "{ " +
        "'record_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'user_code':'" + $("#tb_code").val() + "' " +
        ",'user_name':'" + $("#tb_name").val() + "' " +
        ",'user_email':'" + $("#tb_user_email").val() + "' " +
        ",'password':'" + $("#tb_password").val() + "' " +
        ",'org_name':'" + $("#tb_org_name option:selected").text() + "' " +
        ",'org_id':'" + $("#hf_org_id").val() + "' " +
        ",'contactinfo':'" + $("#tb_contact_info").val() + "' " +
        ",'note':'" + $("#tb_note").val() + "' " +
        ",'role_id':'" + $("#tb_role").val() + "' " +
        ",'user_type':'" + $("#tb_user_type").val() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +

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
            else if (data.d.toString().split('~')[0] == "DuplicateCode") {
                ShowErrorBoxMessage("Oops. User Code can't be duplicate.");
            }
            else {
                ShowErrorBoxMessage("Oops. " + data.d.toString().split('~')[1]);
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

    $("#tab_detail_header").html('Create New User');
    $("#pnl_password").show();
    $("#tb_password").show();
    $("#tb_password").val("");
    $("#pnl_confirmpassword").show();
    $("#tb_confirm_password").show();
    $("#tb_confirm_password").val("");

    $("#tb_id").val("");
    $("#tb_name").val("");
    $("#tb_code").val("");
    $("#tb_org_name").val("");
    $("#hf_org_id").val("");
    $("#tb_user_email").val("");
    $("#tb_contact_info").val("");
    $("#tb_note").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $("#hf_role_id").val("");
    $("#tb_role").val("");
    $("#tb_user_type").val("Admin");
    $("#tb_name").focus();
    $('#dialogBox_Detail_Form').modal('show');
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteUser");
}
function DeleteUser() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/DeleteUser",
        data: "{ " +
        "'record_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                search();
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops, we can't delete. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}

//#endregion

//#region Load Record
function GetUser(id) {

    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/GetUser",
        data: "{ " +
        "'record_id':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["UserID"]);
                $("#tb_password").hide();
                $("#pnl_password").hide();
                $("#tb_confirm_password").hide();
                $("#pnl_confirmpassword").hide();

                $("#tab_detail_header").html(data.d["UserName"]);

                $("#tb_name").val(data.d["UserName"]);
                $("#tb_code").val(data.d["UserCode"]);
                $("#tb_user_email").val(data.d["Email"]);
                $("#tb_password").val(data.d["Password"]);
                $("#tb_confirm_password").val(data.d["Password"]);

                $("#tb_org_name").val(data.d["OrgID"]);
                $("#hf_org_id").val(data.d["OrgID"]);

                //$("#hf_role_id").val(data.d["RoleID"]);
                $("#tb_role").val(data.d["RoleID"]);


                $("#tb_user_type").val(data.d["Ref_Type"]);
                //$("#hf_agent_id").val(data.d["Ref_ID"]);
                // $("#tb_agent").val(data.d["AgentName"]);

                $("#tb_contact_info").val(data.d["ContactInfo"]);
                $("#tb_note").val(data.d["Note"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + moment(data.d["CreatedOn"]).format('DD / MM / YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + moment(data.d["ModifiedOn"]).format('DD / MM / YYYY HH:mm'));


                getImage(id);
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
//#endregion

//#region User Role Drop Down
Load_User_Role_List();
function Load_User_Role_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetAllUserRole",
        data: "{ " +
        "'search_text':'" + "" + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_role").empty();
                $.each(data.d, function (key, val) {
                    $("#tb_role").append("<option value=" + data.d[key]['RoleID'] + ">" + data.d[key]['RoleName'] + "</option>")

                })
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function Load_Org_Name() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetOrganizationByID",
        data: "{ " +
        "'org_id':'" + get_current_user_org_id() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_org_name").empty();
                $.each(data.d, function (key, val) {
                    $("#tb_org_name").append("<option value=" + data.d[key]['OrgID'] + ">" + data.d[key]['OrgName'] + "</option>")
                })
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}


function UploadItemImage1() {
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=user', '_blank');
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

                    if (data.d[key]['RefType'] == "user") {
                        $("#tb_imageid").val(data.d[key]['ImageID']);
                        var src = "/PortalAdministration/img/User_Images/" + data.d[key]['ImageName'];
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
