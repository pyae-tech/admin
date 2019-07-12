$('title').html(get_current_organization_title() + "Daily Opportunitys");


$('#menu_marketing').addClass('active-sub');
$('#menu_marketing_group').addClass('in');
$('#menu_master_SalePerson').addClass('active-link');


$("#tb_oppotunitydate").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_oppotunitydate').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',

});
$('#tb_oppotunitydate').periodpicker('change');

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
}


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $('#tb_opportunityno').val() + '&UserId=' + get_current_user_id() + '&refType=dailyopportunity', '_blank');
} 
//#region Save
function SaveRecordVerification() {
    error_message = "";

  
    if ($("#tb_leadname").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Lead Name Choose."
    }
    if ($("#tb_leadcompany").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Lead Company Choose."
    }
    if ($("#tb_source").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Source Choose."
    }
    if ($("#tb_staffname").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Staff Name Choose."
    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}
function esc_quot(text) {
    return (text + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

function SaveRecord() {
    if (SaveRecordVerification() == false){
        return false;
    }
    else { 
    Pace.start();
        $.ajax({
            url: baseUrl() + "WebServices/WebService_DailyOpportunity.asmx/SaveRecord",
            data: "{ " +
                "'opportunity_id':'" + $("#tb_id").val() + "' " +
                ",'oppo_no':'" + $('#tb_opportunityno').val() + "' " +
                ",'oppo_date':'" + $("#tb_oppotunitydate").val() + "' " +
                ",'status':'" + $("#ddl_status").val() + "' " +
                ",'supplier_id':'" + $('#tb_supplier').val() + "' " +
                ",'staff_id':'" + $('#tb_staffname').val() + "' " +
                ",'title':'" + esc_quot($('#tb_title').val()) + "' " +
                ",'description':'" + esc_quot($('#tb_description').val()) + "' " +
                ",'remark':'" + esc_quot($('#tb_remark').val()) + "' " +
                ",'leadname':'" + esc_quot($('#tb_leadname').val()) + "' " +
                ",'leadcompany':'" + esc_quot($('#tb_leadcompany').val()) + "' " +
                ",'source':'" + esc_quot($('#tb_source').val()) + "' " +
                ",'reference':'" + esc_quot($('#tb_reference').val()) + "' " +
                ",'product':'" + esc_quot($('#tb_product').val()) + "' " +
                ",'user_id':'" + get_current_user_id() + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +

                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $('#tb_id').val(data.d.toString().split('~')[1]);
                    $("#tb_opportunityno").val(data.d.toString().split('~')[2]);
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
}

//#endregion

//#region New Record
function LoadNew() {

    Pace.start();
    $("#tb_id").val("");
    $("#tb_opportunityno").val("");
    $("#tb_oppotunitydate").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#tb_oppotunitydate').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#tb_oppotunitydate').periodpicker('change');
    $("#ddl_status").val("New");
    $("#hf_supplierid").val("");
    $("#tb_supplier").val("").trigger("chosen:updated");
    $("#hf_staffid").val("");
    $("#tb_staffname").val("").trigger("chosen:updated");
    $("#tb_title").val("");
    $("#tb_description").val("");
    $("#tb_remark").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#tb_leadname").val("");
    $("#tb_leadcompany").val("");
    $("#tb_source").val("");
    $("#tb_reference").val("");
    $("#tb_product").val("");
    $("#ddl_status").focus();

    New_Comments();
    new_Attachment();
    New_Activity();
}
//#endregion

//#region Load Record
function GetRecord(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_DailyOpportunity.asmx/GetRecord",
        data: "{ " +
            "'opportunity_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["OpportunityID"]);
                $("#tb_opportunityno").val(data.d["OpportunityNo"]);
                $("#tb_oppotunitydate").val(moment(data.d["OpportunityDate"]).format('YYYY.MM.DD'));
                $('#tb_oppotunitydate').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });
                $('#tb_oppotunitydate').periodpicker('change');
                $("#ddl_status").val(data.d["Status"]);
                $("#hf_supplierid").val(data.d["SupplierID"]);
                var supplier_id = data.d["SupplierID"];
                $("#tb_supplier").val(supplier_id).trigger("chosen:updated");
                $("#hf_staffid").val(data.d["StaffID"]);
                var staff_id = data.d["StaffID"];
                $("#tb_staffname").val(staff_id).trigger("chosen:updated");
                $("#tb_title").val(data.d["Title"]);
                $("#tb_description").val(data.d["Description"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#tb_leadname").val(data.d["LeadName"]);
                $("#tb_leadcompany").val(data.d["LeadCompany"]);
                $("#tb_source").val(data.d["Source"]);
                $("#tb_reference").val(data.d["Reference"]);
                $("#tb_product").val(data.d["Product"]);
                //Comment-----------------------------------------
                request_comment_id = data.d["OpportunityID"];
                request_comment_type = "Daily Opportunity";
                Load_Comments();
                //-----------------------------------------------------
                //Attachment-----------------------------------------
                request_attachment_id = data.d["OpportunityID"];
                request_attachment_type = "DailyOpportunity";
                request_attachment_no = data.d["OpportunityNo"];
                Load_Attachment();
                //Activity-----------------------------------------
                request_activity_id = data.d["OpportunityID"];
                request_activity_type = "Daily Opportunity";
                Load_Activity();
                //-----------------------------------------------------
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

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

//#region Delete Opportunity

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteOpportunity");
}
function DeleteOpportunity() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_DailyOpportunity.asmx/DeleteRecord",
        data: "{ " +
            "'opportunity_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                LoadNew();
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



//#region Supplier
Load_Supplier_List();
function Load_Supplier_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Supplier.asmx/GetAllSupplier",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_supplier").empty();
                $("#tb_supplier").append("<option value=''>" + "Choose Supplier" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_supplier").append("<option value=" + data.d[key]['SupplierID'] + ">" + data.d[key]['SupplierName'] + "</option>")
                });
                $("#tb_supplier").chosen().change();
                $("#tb_supplier_chosen").css({ "width": "100%" });
                if ($('#hf_supplierid').val() != "") {
                    $('#tb_supplier').val($('#hf_supplierid').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_supplierid').val("");
                    $('#tb_supplier').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion Supplier

//#region Staff
Load_StaffName1_List();
function Load_StaffName1_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_HRStaff.asmx/GetAllStaffs",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_staffname").empty();
                $("#tb_staffname").append("<option value=''>" + "Choose Staff1 Name" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_staffname").append("<option value=" + data.d[key]['StaffID'] + ">" + data.d[key]['StaffName'] + "</option>")
                });
                $("#tb_staffname").chosen().change();
                $("#tb_staffname_chosen").css({ "width": "100%" });
                if ($('#hf_staffid').val() != "") {
                    $('#tb_staffname').val($('#hf_staffid').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_staffid').val("");
                    $('#tb_staffname').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion Staff





