$('title').html(get_current_organization_title() + "Account Transaction");

$('#menu_account').addClass('active-sub');
$('#menu_account_group').addClass('in');
$('#menu_account_AccountTranscation').addClass('active-link');


$("#tab-main").tabs();

$("#tb_account_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_account_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',

});
$('#tb_account_date').periodpicker('change');

$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$("#tb_search_from_date").periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
    }
});

$("#tb_search_to_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_to_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
    }
});

$("#btn_search_all_dates").change(function () {
    $('#cb_all_list_withoutdate').prop('checked', false);
    Load_List();
});

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
    $('#tb_search_text').val("");
    $('#tb_search_account').val("");
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

    $("#tab_detail_header").html('Create New Account Transaction');
    $("#tb_id").val("");
    $("#tb_account_date").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#tb_account_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 1],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true,


    });
    $('#tb_account_date').periodpicker('change');
    $("#hf_account_id").val("");
    $("#tb_account_name").val("").trigger("chosen:updated");
    $("#tb_title").val("");
    $("#tb_debit_amount").val("");
    $("#tb_credit_amount").val("");
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
$('#ddl_accountname').on('change', function () {

    Load_List();
});

Load_List();
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_AccountTransaction.asmx/GetAllAccountTransactionDateWithDebit",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_transaction':'" + $("#tb_search_account").val() + "' " +
            ",'search_accountname':'" + $("#ddl_accountname").val() + "' " +
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
    Load_AccountTransaction_Credit();
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

                .replace("[AccountTransactionID]", records[key]['AccountTransactionID'])
                .replace("[AccountDate]", JsonDateToFormat(records[key]['AccountDate'], 'DD-MM-YYYY'))
                .replace("[AccountName]", records[key]['AccountName'])
                .replace("[RefTitle]", records[key]['RefTitle'] == null ? '' : records[key]['RefTitle'])
                .replace("[DebitAmount]", NumberWithCommas(records[key]['DebitAmount']))
                .replace("[CreditAmount]", NumberWithCommas(records[key]['CreditAmount']));
               
              
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

//#region Credit Transaction
function Load_AccountTransaction_Credit() {
    $('#panel_list_credit').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_AccountTransaction.asmx/GetAllAccountTransactionDateWithCredit",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_transaction':'" + $("#tb_search_account").val() + "' " +
            ",'search_accountname':'" + $("#ddl_accountname").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list_credit(data.d);
                $('#panel_list_credit').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_credit').loading('stop');

        }
    });
}

function generate_list_credit(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_row_credit').html();
        allCardsCode += the_template
            .replace("[AccountTransactionID]", records[key]['AccountTransactionID'])
            .replace("[AccountDate]", JsonDateToFormat(records[key]['AccountDate'], 'DD-MM-YYYY'))
            .replace("[AccountName]", records[key]['AccountName'])
            .replace("[RefTitle]", records[key]['RefTitle'] == null ? '' : records[key]['RefTitle'])
            .replace("[CreditAmount]", NumberWithCommas(records[key]['CreditAmount']));
    });
    $('#table_list_credit').empty();
    $('#table_list_credit').append(allCardsCode);
}
//#endregion Credit Transaction
//#region AccountTypeList
Load_AccountType_List();
function Load_AccountType_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Account.asmx/GetAllAccount",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_account_name").empty();
                $("#ddl_accountname").empty();
                $("#tb_account_name").append("<option value=''>" + "Choose Account..." + "</option>");
                $("#ddl_accountname").append("<option value=''>" + "Choose Account..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_account_name").append("<option value=" + data.d[key]['AccountID'] + ">" + data.d[key]['AccountName'] + "</option>");
                    $("#ddl_accountname").append("<option value=" + data.d[key]['AccountID'] + ">" + data.d[key]['AccountName'] + "</option>");
                });
                $('#tb_account_name').chosen().change();
                $('#ddl_accountname').chosen().change();
                $("#tb_account_name_chosen").css({ "width": "100%" });
                $("#ddl_accountname_chosen").css({ "width": "100%" });
                if ($('#hf_account_id').val() != "") {
                    $('#tb_account_name').val($('#hf_account_id').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_account_id").val("");
                    $("#tb_account_name").val("").trigger("chosen:updated");

                }
                if ($('#hf_accountnameid').val() != "") {
                    $('#ddl_accountname').val($('#hf_accountnameid').val()).trigger("chosen:updated");
                }
                
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function GetAccountTransaction(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccountTransaction.asmx/GetAccountTransaction",
        data: "{ " +
            "'accounttransaction_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["AccountTransactionID"]);

                $("#tab_detail_header").html(data.d["AccountName"]);

                $('#hf_account_id').val(data.d["AccountID"]);
                var account_id = data.d["AccountID"];
                $("#tb_account_name").val(account_id).trigger("chosen:updated");

                $("#tb_title").val(data.d["RefTitle"]);
                $("#tb_debit_amount").val(NumberWithCommas(data.d["DebitAmount"]));
                $("#tb_credit_amount").val(NumberWithCommas(data.d["CreditAmount"]));

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
//#endregion AccountTypeList
//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_account_name").val() == "" || $("#tb_account_name").val() == null) {
        if (error_message != "") error_message += "\n";
        error_message += "Account Need To Be Fill";

    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveAccountTransaction() {
    if (SaveRecordVerification() == false)
        return;

    Pace.start();


    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccountTransaction.asmx/SaveAccountTransaction",
        data: "{ " +
            "'accounttransaction_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'account_date':'" + $("#tb_account_date").val() + "' " +
            ",'account_id':'" + $("#tb_account_name").val() + "' " +
            ",'ref_title':'" + $("#tb_title").val() + "' " +
            ",'debit_amount':'" + $("#tb_debit_amount").val()  + "'" +
            ",'credit_amount':'" + $("#tb_credit_amount").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +


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
    ShowConfirmation("Are you sure you want to delete?", "DeleteAccountTransaction");
}
function DeleteAccountTransaction() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_AccountTransaction.asmx/DeleteAccountTransaction",
        data: "{ " +
            "'accounttransaction_id':'" + $("#tb_id").val() + "' " +
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


function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    $('#tb_search_to_date').val(newtodate);
    $('#tb_search_to_date').periodpicker('change');
    Load_List();
}

