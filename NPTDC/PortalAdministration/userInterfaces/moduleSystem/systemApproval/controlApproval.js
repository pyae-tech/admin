function new_from_approval() {
    request_approval_type = "";
    request_approval_id = "";
    request_user_type = "";
    $('#approval_box_header').hide();
    $('#approval_box_action').hide();
}

function CheckSeq(status) {
      //checkSeq(string customergroupID, string seq, string approval_id, string record_id)
    if (get_current_user_org_Type() == "FFS") {
       
        if (request_user_type == "CusGroupUser") {
            $.ajax({
                url: baseUrl() + "WebServices/WebService_Approval.asmx/checkSeq",
                data: "{ " +
                    "'customergroupID':'" + get_current_CustomerGroup_id() + "' " +
                    ",'seq':'" + get_current_User_Seq() + "' " +
                    ",'record_type':'" + request_approval_type + "' " +
                    ",'approval_id':'" + request_approval_id + "' " +
                    ",'record_id':'" + get_current_user_id() + "' " +
                    " }",
                dataType: 'json',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.d != null) {
                        if (data.d.toString() == "Approved") {
                            Add_Instant_Decision(status);
                        }
                        else {
                            alert("Oops. Need to Approve from Upper Level! ");
                        }

                    }
                },
                error: function (xhr, msg) {
                    LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

                }
            });
        }
        else {
            Add_Instant_Decision(status); 
        }
       }
    else {
        Add_Instant_Decision(status);
    }
  
}

function Add_Instant_Decision(status) {
    //if (get_current_user_org_Type() == "FFS") {
    //    if (request_user_type == "CusGroupUser") {
    //        CheckSeq();
    //    }
    //}
    Pace.start();
    //doInstantAction(record_type, record_id, status, userid, final_decision)
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Approval.asmx/doInstantAction",
        data: "{ " +
            "'record_type':'" + request_approval_type + "' " +
            ",'record_id':'" + request_approval_id + "' " +
            ",'status':'" + status + "' " +
            ",'userid':'" + get_current_user_id() + "' " +
            ",'final_decision':'" + "true" + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.toString().split('~')[0] == "Success") {
                    ShowSuccessMessage(status + " added.");
                    Load_Approvals();
                    Add_Instant_Decision_Completed();
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

function Load_Approvals() {
    Pace.start();

    $('#approval_box_action').show();
    $('#comment_box').show();
    $.ajax({
        //record_type, record_id
        url: baseUrl() + "WebServices/WebService_Approval.asmx/getApprovalList",
        data: "{ " +
            "'record_type':'" + request_approval_type + "' " +
            ",'record_id':'" + request_approval_id + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_approval_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_approval_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#template_approval_row').html();
        status = "";
        if (records[key]['ResponseStatus'] == "Approved")
            status = '<span class="label label-success">Approved</span>';
        else status = '<span class="label label-danger">Rejected</span>';
        allCardsCode += the_template.replace()
            .replace("[RequestToCode]", records[key]['RequestToCode'])
            .replace("[ResponseStatus]", status)
            .replace("[Remark]", records[key]['ResponseRemark'])
            .replace("[ApproveByCaseID]", records[key]['ApproveByCaseID'])
            .replace("[RequestOn]", moment(records[key]['RequestOn']).format('DD/MM/YYYY hh:mm')
            );
    });

    if (rowindex == 0) {
        $('#approval_box_header').hide();
    }
    else {
        $('#approval_box_header').show();

    }

    $('#table_approval_list').empty();
    $('#table_approval_list').append(allCardsCode);

}