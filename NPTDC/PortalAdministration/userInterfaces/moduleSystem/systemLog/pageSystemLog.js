$('title').html(get_current_organization_title() + "System Log");

$("#tab-main").tabs();




if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
//#region Load Record
function GetRecord(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SystemLog.asmx/GetLog",
        data: "{ " +
            "'RecordID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page_log').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
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
function generate_list(records) {

    var allCardsCode = '';
    log_rowindex = 0;
    //  var label_background;
    $.each(records, function (key, val) {
        log_rowindex++;
        if (log_rowindex == 1) {//paginatin function
            paginationInfos_log = records[key].split('~');
            $('#lbl_record_count_log').html("Total Records : " + paginationInfos_log[0] + ", Page: ");
            $('.tb_current_page_log').val(paginationInfos_log[2]);
            $('.lbl_page_count').html(" of " + paginationInfos_log[1] + " pages");
            $('#hf_current_page_log').val(paginationInfos_log[2]);
            $('.btn_pagination_next_log').hide();
            $('.btn_pagination_previous_log').hide();
            if (paginationInfos_log[4] == 'y') {
                $('.btn_pagination_next_log').attr('actionPage', parseInt(paginationInfos_log[2]) + 1);
                $('.btn_pagination_next_log').show();
            }
            if (paginationInfos_log[3] == 'y') {
                $('.btn_pagination_previous_log').attr('actionPage', parseInt(paginationInfos_log[2]) - 1);
                $('.btn_pagination_previous_log').show();
            }
        } else {
            the_template = $('#template_table_log').html();
            console.log(records);

            allCardsCode += the_template
                .replace("[SystemLogID]", records[key]['SystemLogID'])
                .replace("[UserName]", records[key]['UserName'])
                .replace("[LogDateTime]", JsonDateToFormat(records[key]['LogDateTime'], 'DD-MM-YYYY HH:mm:ss'));

        }

    });

    if (log_rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(log_rowindex - 1);
    $('#table_list_log').empty();
    $('#table_list_log').append(allCardsCode);

}


function pageJump(control)//paginatin function
{
    $('#hf_current_page_log').val($(control).attr('actionPage'));
    GetRecord(GetURLData('id'));
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page_log').val($('#tb_current_page_log').val());
    GetRecord(GetURLData('id'));
}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    showLogItem($logID);
}
function pageJumpToThis(logID)//paginatin function
{
    $('#hf_current_page').val($('#tb_current_page').val());
    showLogItem($logID);
}



function showLogItem(id) {
    $logID = id;
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SystemLog.asmx/GetLogItem",
        data: "{ " +
            "'LogID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_LogItem_list(data.d);
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

function generate_LogItem_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('#lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('#tb_current_page').val(paginationInfos[2]);
            $('#lbl_page_count').html(" of " + paginationInfos[1] + " pages");
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
            console.log(records);
            if (records[key]['FieldName'] != "LastAction") {
                if (records[key]['OldValue'] != records[key]['NewValue']) {
                    allCardsCode += the_template
                        .replace("[FieldName]", records[key]['FieldName'])
                        .replace("[OldValue]", records[key]['OldValue'])
                        .replace("[NewValue]", records[key]['NewValue']);
                }
            }

        }
    });
    if (rowindex > 0) {
        $('#div_pagination').css("display", "block");
    }
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}