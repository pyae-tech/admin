$('title').html(get_current_organization_title() + "SystemMenuGroup");


$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_SysMenuGroup_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetSysMenu(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_SysMenuGroup_List();

//#region Listing
function clearSearch() {

    $('#tb_search_text1').val('');
    Load_SysMenuGroup_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}


function search() {

    Load_SysMenuGroup_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}


function Load_SysMenuGroup_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_SystemMenuGroup.asmx/GetAllSysMenuGroupWithPagination",
        data: "{ " +
        "'search_text':'" + $("#tb_search_text").val() + "' " +
        ",'search_sysmenugp':'" + $("#tb_search_text1").val() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

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
                .replace("[MenuGroupID]", records[key]['MenuGroupID'])
                .replace("[MenuGroupCode]", records[key]['MenuGroupCode'])
                .replace("[MenuGroupName]", records[key]['MenuGroupName'])
                .replace("[MenuGroupSeq]", records[key]['MenuGroupSeq']);
        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else $('#panel_list').show();

    $('.list_count').html(rowindex - 1);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);

}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    Load_SysMenuGroup_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_SysMenuGroup_List();
}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_menugpname").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Menu Group Name No Needs To Be Filled."
    }

    if ($("#tb_menugpcode").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Menu Group Code No Needs To Be Filled."
    }
}

function SaveSysMenu() {

    if (SaveRecordVerification() == false)
        return;
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SystemMenuGroup.asmx/SaveSysMenuGroup",
        data: "{ " +
        "'menugp_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'menu_gpcode':'" + $("#tb_menugpcode").val() + "' " +
        ",'menu_gpname':'" + $("#tb_menugpname").val() + "' " +
        ",'menu_gpseq':'" + $("#tb_menugpseq").val() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_SysMenuGroup_List();
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
    $("#tb_id").val("");
    $("#tb_menugpname").val("");
    $("#tb_menugpcode").val("");
    $("#tb_menugpseq").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');

    //for focus on adding new data
    $("#tb_menugpcode").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_menugpcode').focus();
    });
}
//#endregion

function ClearFields() {
    $("#tb_id").val("");
    $("#tb_menugpname").val("");
    $("#tb_menugpcode").val("");
    $("#tb_menugpseq").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    //for focus on adding new data
    $("#tb_menugpcode").focus();
}


//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteSysMenuGroup");
}
function DeleteSysMenuGroup() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SystemMenuGroup.asmx/DeleteSysMenuGroup",
        data: "{ " +
        "'menugp_id':'" + $("#tb_id").val() + "' " +
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
function GetSysMenuGroup(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SystemMenuGroup.asmx/GetSysMenuGroup",
        data: "{ " +
        "'menugp_id':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["MenuGroupID"]);

                $("#tb_menugpname").val(data.d["MenuGroupName"]);

                $("#tb_menugpcode").val(data.d["MenuGroupCode"]);

                $("#tb_menugpseq").val(data.d["MenuGroupSeq"]);

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
//#endregion

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    }
    else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

