$('title').html(get_current_organization_title() + "System Devices");
$("#tab-main").tabs();

Load_List();


function Load_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Devices.asmx/GetDevice",
        data: "{ " +
            "'search_code':'" + $('#tb_search_code').val() + "' " +
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

        allCardsCode += the_template.replace()
            .replace("[UserCode]", records[key]['UserCode'])
            .replace("[OTP]", records[key]['OTP'])
            .replace("[OS]", records[key]['OS'])
            .replace("[Manufacturer]", records[key]['Manufacturer'])
            .replace("[OSVersion]", records[key]['OSVersion'])
            .replace("[Imei]", records[key]['Imei'])
            .replace("[ModelNo]", records[key]['ModelNo'])
            .replace("[CreatedOn]", JsonDateToFormat(records[key]['CreatedOn'], 'DD-MM-YYYY HH:mm:ss'))
            .replace("[ModifiedOn]", JsonDateToFormat(records[key]['ModifiedOn'], 'DD-MM-YYYY HH:mm:ss'));
    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        //  Load_Fine_Rule(finedate);
        $('#panel_list').show();
    }


    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}
//#endregion

function clearSearch() {
    $('#tb_search_code').val('');
    Load_List();
}

$("#tb_search_code").keypress(function (event) {
    if (event.which == 13) {
        Load_List();
        return false;
    }
});