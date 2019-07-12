$('title').html(get_current_organization_title() + "Account");

$('#menu_account').addClass('active-sub');
$('#menu_account_group').addClass('in');
$('#menu_account_Account').addClass('active-link');


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
    $('#tb_search_account').val('');
    $('#hf_current_page').val("1");
   
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();
}

function search() {
    $('#tb_search_text').val();
    $('#tb_search_account').val();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
    Load_List();

}

function LoadNew() {

    $("#tab_detail_header").html('Create New Account');
    $("#tb_id").val("");
    $("#tb_account_name").val("");
    $("#tb_account_code").val("");
    $("#hf_accounttype_id").val("");
    $("#ddl_accounttype").val("").trigger("chosen:updated");
    $("#ddl_status").val("New");
    $("#ddl_columntype").val("");
    $("#tb_remark").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_account_name").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_account_name').focus();
    });

}

Load_List();
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Account.asmx/GetAllAccountWithPagination",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_account':'" + $("#tb_search_account").val()  + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
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


            allCardsCode += the_template.replace()
        
                .replace("[AccountID]", records[key]['AccountID'])
                .replace("[Title]", records[key]['Title'])
                .replace("[AccountName]", records[key]['AccountName'])
                .replace("[AccountCode]", records[key]['AccountCode'])
                .replace("[ColumnType]", records[key]['ColumnType'] == null ? '' : records[key]['ColumnType']);
              
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

Load_AccountType_List();
function Load_AccountType_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_AccoutType.asmx/GetAllAccountType",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_accounttype").empty();
                $("#ddl_accounttype").append("<option value=''>" + "Choose Account Type..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_accounttype").append("<option value=" + data.d[key]['AccountTypeID'] + ">" + data.d[key]['Title'] + "</option>");
                });
                $('#ddl_accounttype').chosen().change();
                $("#ddl_accounttype_chosen").css({ "width": "100%" });

                if ($('#hf_accounttype_id').val() != "") {
                    $('#ddl_accounttype').val($('#hf_accounttype_id').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_accounttype_id").val("");
                    $("#ddl_accounttype").val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function GetAccount(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Account.asmx/GetAccount",
        data: "{ " +
            "'account_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["AccountID"]);

                $("#tab_detail_header").html(data.d["AccountName"]);

                $("#tb_account_name").val(data.d["AccountName"]);
                $("#tb_account_code").val(data.d["AccountCode"]);

                $('#hf_accounttype_id').val(data.d["AccountTypeID"]);
                var account_type_id = data.d["AccountTypeID"];
                $("#ddl_accounttype").val(account_type_id).trigger("chosen:updated");
                $("#ddl_status").val(data.d["Status"]);
                $("#ddl_columntype").val(data.d["ColumnType"]);
                $("#tb_remark").val(data.d["Remark"]);

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
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

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_account_name").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Account Name Need To Be Fill"
    }
    if ($("#ddl_accounttype").val() == "" || $("#ddl_accounttype").val() == null) {
        if (error_message != "") error_message += "\n";
        error_message += "Account Type Need To Be Fill";

    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveAccount() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();


    $.ajax({
        url: baseUrl() + "WebServices/WebService_Account.asmx/SaveAccount",
        data: "{ " +
            "'account_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'account_name':'" + $("#tb_account_name").val() + "' " +
            ",'account_code':'" + $("#tb_account_code").val() + "' " +
            ",'status':'" + $("#ddl_status").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'accounttype_id':'" + $("#ddl_accounttype").val()  + "'" +
            ",'remark':'" + $("#tb_remark").val() + "' " +
            ",'columntype':'" + $("#ddl_columntype").val() + "' " +
           


            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
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
    ShowConfirmation("Are you sure you want to delete?", "DeleteAccount");
}
function DeleteAccount() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Account.asmx/DeleteAccount",
        data: "{ " +
            "'account_id':'" + $("#tb_id").val() + "' " +
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