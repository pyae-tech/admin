
function New_Comments() {
    request_comment_id = "";
    request_comment_type = "";
    //$('#tbl_comments').empty();
    $('#comment_box').hide();
}
function Load_Comments() {
    Pace.start();
    $('#comment_box').show();
    $.ajax({
        //GetComments(requestBy, record_id); 
        url: baseUrl() + "WebServices/WebService_CRM_Comment.asmx/GetComments",
        data: "{ " +
            "'requestBy':'" + get_current_user_id() + "' " +
            ",'record_id':'" + request_comment_id + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_comment_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_comment_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#Comment_Template').html();

        allCardsCode += the_template.replace()
            .replace("[Comment]", records[key]['Comment'])
            .replace("[CommentByName]", records[key]['CommentByName'])
            .replace("[CommentID]", records[key]['CommentID'])
            .replace("[CommentOn]",
                moment(records[key]['CommentOn']).format('DD/MM/YYYY hh:mm')
            );
    });

    if (rowindex == 0) { 
        $('#comment_box_header').hide();
    }
    else { 
        $('#comment_box_header').show();

    }

    $('#tbl_comments').empty();
    $('#tbl_comments').append(allCardsCode);

}

function Add_Comment() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_CRM_Comment.asmx/AddComment",
        data: "{ " +
            "'requestBy':'" + get_current_user_id() + "' " +
            ",'comment':'" + $('#tb_comment_new').val() + "' " +
            ",'record_id':'" + request_comment_id + "' " +
            ",'record_type':'" + request_comment_type + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $("#tb_id").val(data.d.toString().split('~')[1]);
                    ShowSuccessMessage("Add Comment.");
                    $('#tb_comment_new').val('');
                    Load_Comments();
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
