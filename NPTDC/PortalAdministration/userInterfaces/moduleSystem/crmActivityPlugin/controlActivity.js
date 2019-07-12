
function New_Activity() {
    request_activity_id = "";
    request_activity_type = "";
    $('#tbl_activity').empty();
    $('#Activity_box').hide();
}
function Load_Activity() {
    Pace.start();
    $('#Activity_box').show();
    $.ajax({
        //GetComments(requestBy, record_id); 
        url: baseUrl() + "WebServices/WebService_CRM_Activity.asmx/GetActivities",
        data: "{ " +
            "'RefID':'" + request_activity_id+ "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_activity_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_activity_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#Activity_Template').html();

        allCardsCode += the_template.replace()
            .replace("[ActivityByName]", records[key]['UserName'])
            .replace("[ActivityType]", records[key]['ActivityType'])
            .replace("[ActivityDescription]", records[key]['ActivityDescription'])
            .replace("[ShortToPoint]", records[key]['ShortToPoint'])
            .replace("[ActivityID]", records[key]['ActivityID'])
            .replace("[ActivityOn]",
                moment(records[key]['CommentOn']).format('DD/MM/YYYY hh:mm')
            );
    });

    if (rowindex == 0) {
        $('#tbl_activity').hide();
    }
    else {
        $('#tbl_activity').show();

    }

    $('#tbl_activity').empty();
    $('#tbl_activity').append(allCardsCode);

}

function Add_Activity() {
    Pace.start();
    $.ajax({
        //AddActivity(string RefType, string RefID, string ActivityType,
        //string ActivityDescription, string ShortToPoint, string requestBy)
        url: baseUrl() + "WebServices/WebService_CRM_Activity.asmx/AddActivity",
        data: "{ " +
            "'RefType':'" + request_activity_type + "' " +
            ",'RefID':'" + request_activity_id + "' " +
            ",'ActivityType':'" + $('#tb_ActivityType').val() + "' " +
            ",'ActivityDescription':'" + esc_quot($('#tb_ActivityDescription').val()) + "' " +
            ",'ShortToPoint':'" + esc_quot($('#tb_ShortToPoint').val()) + "' " +
            ",'requestBy':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $("#tb_id").val(data.d.toString().split('~')[1]);
                    ShowSuccessMessage("Add Activity.");
                    $('#tb_ActivityType').val('');
                    $('#tb_ActivityDescription').val('');
                    $('#tb_ShortToPoint').val('');
                    Load_Activity();
                }
                else {
                    ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
                }

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}





