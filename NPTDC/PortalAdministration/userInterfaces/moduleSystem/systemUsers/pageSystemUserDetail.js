$('title').html(get_current_organization_title() + "System Users");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_user').addClass('active-link');


$("#tab-main").tabs();


if (GetURLData('id') != null && GetURLData('id') != "") {
    GetUser(GetURLData('id'));
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
        error_message += "Require Name Of The User"
    }
    //if ($("#tb_role option:selected").text() == "") {
    //    if (error_message != "") error_message += "\n";
    //    error_message += "Require User Role "
    //}
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
            ",'contactinfo':'" + $("#tb_contact_info").val() + "' " +
            ",'ref_type':'" + $("#tb_user_type").val() + "' " +
            ",'note':'" + $("#tb_note").val() + "' " +
            ",'role_id':'" + role_id+ "' " +
            //",'org_id':'" + $("#tb_org_name option:selected").text() + "' " +
            ",'org_id':'" + $("#tb_org_name").val() + "' " +
            ",'dep_id':'" + department_id + "' " +
            ",'pos_id':'" + position_id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +

            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                ShowSuccessMessage("Saved.");

                $("#image_item").css("display","none");
                $("#Image_drop_zone").css("display","block");
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
    $("#tb_position_id").val("");
    $("#tb_department_id").val("");
    $("#tb_role_id").val("");
    Load_Department_List();
    Load_Position_List();
    Load_User_Role_List();
    Pace.start();
    $("#tab_detail_header").html('Create New User');
    
    $("#pnl_password").show();
    $("#tb_password").show();
    $("#tb_password").val("");
    $("#pnl_confirmpassword").show();
    $("#tb_confirm_password").show();
    $("#tb_confirm_password").val("");
    $("#tb_password").removeAttr("disabled");
    $("#tb_confirm_password").removeAttr("disabled");
    $("#tb_id").val("");
    $("#tb_name").val("");
    $("#tb_code").val("");
    //$("#tb_org_name").val("");
    //$("#hf_org_id").val("");
    $("#tb_user_email").val("");
    $("#tb_contact_info").val("");
    $("#tb_note").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $("#tb_user_type").val("Admin");
    //$("#lookup_role").dxLookup("instance").option('value',"");
    //$("#lookup_position").dxLookup("instance").option('value', "");
    //$("#lookup_department").dxLookup("instance").option('value', "");
    $("#image_item").css("display", "none");
    $("#Image_drop_zone").css("display", "none");
    $("#tb_name").focus();
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
                    //$("#tb_password").hide();
                    //$("#pnl_password").hide();
                    //$("#tb_confirm_password").hide();
                    //$("#pnl_confirmpassword").hide();

                    $("#tab_detail_header").html(data.d["UserName"]);

                    $("#tb_name").val(data.d["UserName"]);
                    $("#tb_code").val(data.d["UserCode"]);
                    $("#tb_user_email").val(data.d["Email"]);
                    $("#tb_password").val(data.d["Password"]);
                    $("#tb_password").attr("disabled","disabled");
                    $("#tb_confirm_password").val(data.d["Password"]);
                    $("#tb_confirm_password").attr("disabled","disabled");
                    $("#tb_org_name").val(data.d["OrgID"]);
                    $("#hf_org_id").val(data.d["OrgID"]);
                    $("#tb_role_id").val(data.d["RoleID"]);
                    $("#tb_position_id").val(data.d["PositionID"]);
                    $("#tb_department_id").val(data.d["DepartmentID"]);                  
                    $("#tb_user_type").val(data.d["Ref_Type"]);
                    $("#tb_contact_info").val(data.d["ContactInfo"]);
                    $("#tb_note").val(data.d["Note"]);
                    $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + moment(data.d["CreatedOn"]).format('DD / MM / YYYY HH:mm'));
                    $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + moment(data.d["ModifiedOn"]).format('DD / MM / YYYY HH:mm'));
                    getImage(id);

                    $("#lookup_role").dxLookup('instance').option('value', $("#tb_role_id").val());
                    $("#lookup_position").dxLookup('instance').option('value', $("#tb_position_id").val());
                    $("#lookup_department").dxLookup('instance').option('value', $("#tb_department_id").val());
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

    //#region User Role Drop Down

var role_id = "";
Load_User_Role_List();
    function Load_User_Role_List() {
        Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetAllUserRoleJSON",
            data: JSON.stringify({
                RequestID: get_current_user_id()
            }),
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    var result = JSON.parse(data.d);
                    $("#lookup_role").dxLookup({
                        items: result,
                        showClearButton: true,
                        valueExpr: 'RoleID',
                        displayExpr: function (item) {
                            if (!item) {
                                return "";
                            }

                            return item.RoleName;
                        },
                        placeholder: "Select User Role",

                        showPopupTitle: false,
                        onValueChanged: function (e) {
                            if (e.value === "null" || e.value == null) {
                                role_id = "";
                            }
                            else {
                                role_id = $("#lookup_role").dxLookup("instance").option('value');
                            }
                        }


                    });
                    if ($("#tb_role_id").val() != null || $("#tb_role_id").val() != "") {
                        $("#lookup_role").dxLookup('instance').option('value', $("#tb_role_id").val());
                    }


                }
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });

    }

Load_Org_Name();
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
                            $("#tb_imageid").val(data.d[key]['RefID']);
                            $("#Ref_type").val(data.d[key]['RefType']);
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



var department_id = "";
Load_Department_List();
    function Load_Department_List() {
        Pace.start();
        $.ajax({

            url: baseUrl() + "WebServices/WebService_Department.asmx/GetAllDepartmentJSON",
            data: JSON.stringify({
                RequestID: get_current_user_id()
            }),
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    var result = JSON.parse(data.d);
                    $("#lookup_department").dxLookup({
                        items: result,
                        showClearButton: true,
                        valueExpr: 'DepartmentID',
                        displayExpr: function (item) {
                            if (!item) {
                                return "";
                            }

                            return item.DepartmentName;
                        },
                        placeholder: "Select Department",

                        showPopupTitle: false,
                        onValueChanged: function (e) {
                            if (e.value === "null" || e.value == null) {
                                department_id = "";
                            }
                            else {
                                department_id = $("#lookup_department").dxLookup("instance").option('value');
                            }
                        }


                    });
                    if ($("#tb_department_id").val() != null || $("#tb_department_id").val() != "") {
                        $("#lookup_department").dxLookup('instance').option('value', $("#tb_department_id").val());
                    }

                }
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });
    }

    Load_Position_List();
    var position_id = "";
    function Load_Position_List() {
        Pace.start();
        $.ajax({

            url: baseUrl() + "WebServices/WebService_Position.asmx/GetAllPositionJSON",
            data: JSON.stringify({
                RequestID: get_current_user_id()
            }),
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    var result = JSON.parse(data.d);
                    $("#lookup_position").dxLookup({
                        items: result,
                        showClearButton: true,
                        valueExpr: 'PositionID',
                        displayExpr: function (item) {
                            if (!item) {
                                return "";
                            }

                            return item.PositionName;
                        },
                        placeholder: "Select Position",

                        showPopupTitle: false,
                        onValueChanged: function (e) {
                            if (e.value === "null" || e.value == null) {
                                position_id = "";
                            }
                            else {
                                position_id = $("#lookup_position").dxLookup("instance").option('value');
                            }
                        }


                    });
                    if ($("#tb_position_id").val() != null || $("#tb_position_id").val() != "") {
                        $("#lookup_position").dxLookup('instance').option('value', $("#tb_position_id").val());
                    }

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
    window.open('attachment?id=' + $("#tb_id").val() + '&UserId=' + get_current_user_id() + '&refType=user', '_blank');
    GetUser($("#tb_id").val());
}
function RefreshItem() { GetUser(GetURLData('id')); }


function deleteImage() {
    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteImage");
    }
}

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
                $("#item_image_zone").css("display", "block");
                $("#image_item").css("display", "block");
                GetUser($("#tb_id").val());
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
