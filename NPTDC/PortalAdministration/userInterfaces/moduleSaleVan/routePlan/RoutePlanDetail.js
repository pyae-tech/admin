$('title').html(get_current_organization_title() + "Ways Plan");

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_Routes').addClass('active-link');

$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_WayPlan_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRoute(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_WayPlan_List();

//#region Listing
function clearSearch() {

    $('#tb_search_text1').val('');
    Load_WayPlan_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}


function search() {

    Load_WayPlan_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}


function Load_WayPlan_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRouteWithPagination",
        data: "{ " +
        "'search_text':'" + $("#tb_search_text").val() + "' " +
        ",'search_wayplan':'" + $("#tb_search_text1").val() + "' " +
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
                .replace("[RouteID]", records[key]['RouteID'])
                .replace("[RouteNo]", records[key]['RouteNo'])
                .replace("[RouteName]", records[key]['RouteName'])
                .replace("[Description]", records[key]['Desciption']);
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
    Load_WayPlan_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_WayPlan_List();
}

//#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_routeno").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Route No Needs To Be Filled."
    }

    var ddlStatus = $("#tb_routestatus");
    if (ddlStatus.val() == "" || ddlStatus.val() == null) {
        if (error_message != "") error_message += "\n";
        error_message += "Route Status Needs To Be selected."
    }

    var seq = $("#tb_routeseq");
    if (seq.val() == "") {

        if (error_message != "") {
            error_message += "\n";
        }
        error_message += "Route Sequence Needs To Be Filled."
    }
    else {
        if (Math.round(seq.val()) != seq.val()) {
            error_message += "\n";
            error_message += "Route Sequence should be numeric."
        }
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveRoute() {

    if (SaveRecordVerification() == false)
        return;
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/SaveRoute",
        data: "{ " +
        "'route_id':'" + $("#tb_id").val() + "' " +
        ",'user_id':'" + get_current_user_id() + "' " +
        ",'route_no':'" + $("#tb_routeno").val() + "' " +
        ",'route_name':'" + $("#tb_name").val() + "' " +
        ",'route_descr':'" + esc_quot($("#tb_routedescr").val()) + "' " +
        ",'route_status':'" + $("#tb_routestatus").val() + "'" +
        ",'route_sequence':'" + $("#tb_routeseq").val() + "'" +
        ",'alloworder':'" + $("#cb_alloworder").is(":checked") + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_WayPlan_List();
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
    $("#tab_detail_header").html('Create New Way Plan');
    $("#tb_id").val("");
    $("#tb_routeno").val("");
    $("#tb_name").val("");
    $("#tb_routedescr").val("");
    $("#tb_routestatus").val("New");
    $("#tb_routeseq").val("");

    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $("#cb_deflocation").prop("checked", false);
    $("#cb_alloworder").prop("checked", false);

    $('#dialogBox_Detail_Form').modal('show');

    //for focus on adding new data
    $("#tb_routeno").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_routeno').focus();
    });
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteRoute");
}
function DeleteRoute() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/DeleteRoute",
        data: "{ " +
        "'route_id':'" + $("#tb_id").val() + "' " +
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
function GetRoute(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetRoute",
        data: "{ " +
        "'route_id':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["RouteID"]);

                $("#tb_routeno").val(data.d["RouteNo"]);
                $("#tb_name").val(data.d["RouteName"]);
                $("#tb_routedescr").val(data.d["Desciption"]);
                $("#tb_routestatus").val(data.d["Status"]);
                $("#tb_routeseq").val(data.d["RouteSeq"]);
                if (data.d['AllowOrder'] == true)
                    $("#cb_alloworder").prop("checked", true);
                else
                    $("#cb_alloworder").prop("checked", false);

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

