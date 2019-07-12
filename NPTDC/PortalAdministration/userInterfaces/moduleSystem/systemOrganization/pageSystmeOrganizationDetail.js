$('title').html(get_current_organization_title() + "System Organization");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_organization').addClass('active-link');

$("#tab-main").tabs();

//$("#tb_joint_date").val(moment(new Date()).format('YYYY.MM.DD'));
//$('#tb_joint_date').periodpicker({
//    norange: true,
//    cells: [1, 1],
//    okButton: false,
//    hideOnBlur: true,
//    hideAfterSelect: true,
//    formatDate: 'YYYY/MM/DD',

//});
//$('#tb_joint_date').periodpicker('change');
$('#tb_joint_date').dxDateBox({
    value: null,
    width: "100%"
});

//$("#tb_expiry_date").val(moment(new Date()).format('YYYY.MM.DD'));
//$('#tb_expiry_date').periodpicker({
//    norange: true,
//    cells: [1, 1],
//    okButton: false,
//    hideOnBlur: true,
//    hideAfterSelect: true,
//    formatDate: 'YYYY/MM/DD',

//});
//$('#tb_expiry_date').periodpicker('change');
$('#tb_expiry_date').dxDateBox({
    value: null,
    width: "100%"
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetOrganization(GetURLData('id'));
}
else {
    LoadNew();
}



//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_org_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Organization Name Need To Be Fill"
    }
    if ($("#tb_code").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Organization Code Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveOrganization() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/SaveOrganization",
        data: "{ " +
            "'org_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'org_name':'" + $("#tb_org_name").val() + "' " +
            ",'org_code':'" + $("#tb_code").val() + "' " +
            ",'orgType':'" + $("#tb_orgType").val() + "' " +
            ",'joint_date':'" + /*$('#tb_joint_date').val() */GetFormattedDate($("#tb_joint_date").dxDateBox("instance").option('value')) + "' " +
            ",'expiry_date':'" + $("#tb_expiry_date").val() + "' " +
            ",'InvoiceAccountName':'" + $("#tb_InvoiceAccountName").val() + "' " +
            ",'InvoiceAccountNo':'" + $('#tb_InvoiceAccountNo').val() + "' " +
            ",'user_count':'" + $("#tb_user_count").val() + "' " +
            ",'orgplan':'" + $("#tb_orgplan").val() + "' " +
            ",'Website':'" + $("#tb_website").val() + "' " +
            ",'Facebook':'" + $("#tb_facebook").val() + "' " +
            ",'Email':'" + $("#tb_email").val() + "' " +
            ",'PhoneNo':'" + $("#tb_phoneno").val() + "' " +
            ",'Address':'" +/* $("#tb_address").val()*/  $('#address').dxTextBox('option', 'value') + "' " +
            ",'InvoiceType':'" + $("#tb_InvoiceType").val() + "' " +
            ",'remark':'" + $("#tb_remark").val() + "' " +
            ",'remark1':'" + $("#tb_remark1").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                Load_Organization_MenuGroup($("#tb_id").val());
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

//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Create New Syatem Organization');
    $("#tb_id").val("");
    $("#tb_org_name").dxTextBox({
        value: "",
        height: "35px",
        placeholder: "Enter Organization Name"
    }).dxValidator({
        validationRules: [{
            type: "required",
            message: "Organization name is required"
        }]
    });
    $("#tb_code").dxTextBox({
        value: "",
        height: "35px",
        placeholder: "Enter Organization Code"
    }).dxValidator({
        validationRules: [{
            type: "required",
            message: "Organization code is required"
        }]
    });
    $('#tb_joint_date').dxDateBox({
        value: null,
        width: "100%"
    });
    $('#tb_expiry_date').dxDateBox({
        value: null,
        width: "100%"
    });    
    $("#tb_user_count").dxTextBox({
        value: "",
        placeholder: "Enter User Count"
    });
    
    $("#tb_orgplan").dxTextBox({
        value: "",
        placeholder: "Enter Orginization Plan"
    });

    $("#tb_orgType").dxTextBox({
        value: "",
        height: "35px",
        placeholder: "Enter Organization Type"
    });

    $("#tb_InvoiceAccountNo").dxTextBox({
        value: "",
        placeholder: "Enter Account No"
    });

    $("#tb_InvoiceAccountName").dxTextBox({
        value: "",
        placeholder: "Enter Account Name"
    });

    $("#tb_website").dxTextBox({
        value: "",
        placeholder: "Enter Website"
    });

    $("#tb_facebook").dxTextBox({
        value: "",
        placeholder: "Enter Facebook"
    });

    $("#tb_email").dxTextBox({
        mode: 'email',
        placeholder: 'Enter enter your email address'
    }). dxValidator({
        validationRules: [{ type: 'required', message: 'Email is required' }, { type: 'email' }]
    });

    $("#tb_phoneno").dxTextBox({
        value: "",
        placeholder: "Enter Phone No"
    });

    $("#tb_address").dxTextBox({
        value: "",
        placeholder: "Enter Address"
    });
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $("#tb_InvoiceType").dxTextBox({
        value: "",
        placeholder: "Enter Invoice Type"
    });

    $("#tb_org_name").focus();
    $("#tb_remark").dxTextArea({
        value: "",
        height: 70
    });
    $("#tb_remark1").dxTextArea({
        value: "",
        height: 60
    });

    new_Attachment();    
    $("#Savebutton").dxButton({
        type: "success",
        useSubmitBehavior: true,
        onClick: SaveOrganization()
    });
 


    //$("#tb_orgplan").val("");
    //$("#tb_org_name").val("");
    //$("#tb_code").val("");
    //$("#tb_joint_date").val(moment(new Date()).format('YYYY.MM.DD'));
    //$('#tb_joint_date').periodpicker({
    //    todayButton: true,
    //    norange: true,
    //    cells: [1, 1],
    //    okButton: false,
    //    hideOnBlur: true,
    //    hideAfterSelect: true,
    //});
    //$('#tb_joint_date').periodpicker('change');
    //$("#tb_expiry_date").val(moment(new Date()).format('YYYY.MM.DD'));
    //$('#tb_expiry_date').periodpicker({
    //    todayButton: true,
    //    norange: true,
    //    cells: [1, 1],
    //    okButton: false,
    //    hideOnBlur: true,
    //    hideAfterSelect: true,
    //});
    //$('#tb_expiry_date').periodpicker('change');
    //$("#tb_user_count").val("");
    //$("#tb_remark").val("");
    //$("#tb_remark1").val("");
    //$("#tb_orgType").val("");
    //$("#tb_InvoiceAccountNo").val("");
    //$("#tb_InvoiceAccountName").val("");
    // $("#tb_facebook").val("");
    //$("#tb_website").val("");
    // $("#tb_email").val("");
    //$("#tb_phoneno").val("");
    // $("#tb_address").val("");
    //$("#tb_InvoiceType").val("");
}
//#endregion

//#region Delete


function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteOrganization");
}
function DeleteOrganization() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/DeleteOrganization",
        data: "{ " +
            "'org_id':'" + $("#tb_id").val() + "' " +
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
function GetOrganization(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetOrganization",
        data: "{ " +
            "'org_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["OrgID"]);

                $("#tab_detail_header").html(data.d["OrgName"]);
                $("#tb_orgType").val(data.d["OrgType"]);

                $("#tb_org_name").val(data.d["OrgName"]);
                $("#tb_code").val(data.d["OrgCode"]);
                //$("#tb_joint_date").val(moment(data.d["JointDate"]).format('YYYY.MM.DD'))
                //$('#tb_joint_date').periodpicker({
                //    todayButton: true,
                //    norange: true,
                //    cells: [1, 2],
                //    okButton: false,
                //    hideOnBlur: true,
                //    hideAfterSelect: true,
                //});
                //$('#tb_joint_date').periodpicker('change');

                $('#tb_joint_date').dxDateBox({
                    value: JsonDateToFormat(data.d["JointDate"], 'YYYY/MM/DD'),
                    width: "100%"
                });
                $('#tb_expiry_date').dxDateBox({
                    value: JsonDateToFormat(data.d["ExpiryDate"], 'YYYY/MM/DD'),
                    width: "100%"
                });
                //$("#tb_expiry_date").val(moment(data.d["ExpiryDate"]).format('YYYY.MM.DD'))
                //$('#tb_expiry_date').periodpicker({
                //    todayButton: true,
                //    norange: true,
                //    cells: [1, 2],
                //    okButton: false,
                //    hideOnBlur: true,
                //    hideAfterSelect: true,
                //});
                //$('#tb_expiry_date').periodpicker('change');
                $("#tb_user_count").val(data.d["UserCount"]);
                $("#tb_orgplan").val(data.d["OrgPlan"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#tb_remark1").val(data.d["Remark1"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
                $("#tb_InvoiceAccountNo").val(data.d["InvoiceAccountNo"]);
                $("#tb_InvoiceAccountName").val(data.d["InvoiceAccountName"]);
                $("#tb_website").val(data.d["Website"]);
                $("#tb_facebook").val(data.d["Facebook"]);
                $("#tb_email").val(data.d["Email"]);
                $("#tb_phoneno").val(data.d["PhoneNo"]);
                //$("#tb_address").val(data.d["Address"]);
                $("#address").dxTextBox({
                    value: data.d["Address"]
                }).dxValidator({
                    validationRules: [{
                        type: "required",
                        message: "Value is required"
                    }]
                });
                $("#tb_InvoiceType").val(data.d["InvoiceType"]);
                //Attachment-----------------------------------------
                request_attachment_id = data.d["OrgID"];
                request_attachment_type = "Logo";
                request_attachment_no = data.d["OrgCode"];
                Load_Attachment();
                //---------

                ShowSuccessMessage("Loaded.");
                Load_Organization_MenuGroup(id);

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
function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $('#tb_code').val() + '&UserId=' + get_current_user_id() + '&refType=logo', '_blank');

}

function SetOrganizationMenuGroup(id, type, control) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/SetOrganizationMenuGroup",
        data: "{ " +
            "'org_id':'" + $("#tb_id").val() + "' " +
            ",'menugp_id':'" + id + "' " +
            ",'type':'" + type + "' " +
            ",'data':'" + ($(control).is(":checked")) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {

                ShowSuccessMessage("Updated Successfully.");
                Load_Organization_MenuGroup(($("#tb_id").val()));
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

function Load_Organization_MenuGroup(id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetOrganizationMenuGroup",
        data: "{ " +
            "'org_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_organization_menugroup(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function generate_organization_menugroup(records) {
    var allCardsCodeITEM = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;


        _isCreate = "";
        if (records[key]['AllowCreate'] == true) _isCreate = "checked";
        _isUpdate = "";
        if (records[key]['AllowUpdate'] == true) _isUpdate = "checked";
        _isView = "";
        if (records[key]['AllowView'] == true) _isView = "checked";
        _isDelete = "";
        if (records[key]['AllowDelete'] == true) _isDelete = "checked";

        the_item_template = $('#template_item_row').html();
        allCardsCodeITEM += the_item_template.replace()
            .replace("[MenuGroupID]", records[key]['MenuGroupID'])
            .replace("[MenuGroupID]", records[key]['MenuGroupID'])
            .replace("[MenuGroupID]", records[key]['MenuGroupID'])
            .replace("[MenuGroupID]", records[key]['MenuGroupID'])


            .replace("[MenuGroupName]", records[key]['MenuGroupName'])
            //.replace("[is_create_checked]", _isCreate)
            .replace("[is_view_checked]", _isView)
        //.replace("[is_update_checked]", _isUpdate)
        //.replace("[is_delete_checked]", _isDelete)




    });
    if (rowindex == 0) $('#panel_item_list').hide();
    else {
        $('#panel_item_list').show();
    }

    $('#table_item_list').empty();
    $('#table_item_list').append(allCardsCodeITEM);
}


function GetFormattedDate(date) {
    var dd = date.getDate();

    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }
    var formatDate = yyyy + "/" + mm + "/" + dd;
    return formatDate;
}