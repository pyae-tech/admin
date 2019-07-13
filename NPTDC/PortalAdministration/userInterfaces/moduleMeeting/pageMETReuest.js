$('title').html(get_current_organization_title() + "Request");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_request_letter').addClass('active-link');
$("#tab-main").tabs();

$("#tb_department_name").val(get_current_user_DepartmentName());
var request_on_date = ConvertDate(new Date());
$("#dt_requeston").dxDateBox({
    applyValueMode: "useButtons",
    displayFormat: "yyyy/MM/dd",
    type: "date",
    value: new Date(),
    max: new Date(),
    min: new Date(1900, 0, 1),
    onValueChanged: function (data) {
        request_on_date=ConvertDate($("#dt_requeston").dxDateBox('instance').option('value'));
    }
});
function ConvertDate(sdate) {
    const date = new Date(sdate);
    var month = date.getMonth() + 1;
    var dd = date.getDate();

    var output = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' + (dd < 10 ? '0' : '') + dd;
    return output;
}
GetAllUser();
var requestby_id = "";
function GetAllUser() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUserJson",
        data: "{ " +
            "'org_id':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#ddl_requestby").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'UserID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.UserName;
                    },
                    placeholder: "Select Request By",

                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            requestby_id = "";
                        }
                        else {
                            requestby_id = $("#ddl_requestby").dxLookup("instance").option('value');
                        }
                    }


                });
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//#region Request Items
Load_Request_Item();
function Load_Request_Item() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Request.asmx/GetAllRequestItemsJson",
        data: "{ " +
            "'meeting_reqID':'" + $("tb_id").val() + "' " +
            ",'org_id':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                Bind_RequestItems(result);
            }
            else {
                var d = [];
                Bind_RequestItems(d);
            }
        }
    });
}

function Bind_RequestItems(data) {
    if (data == undefined) { data = []; }

    $("#gc_RequestItems").dxDataGrid({
        dataSource: data,
        keyExpr: "RequestItemID",
        showBorders: true,
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        columns: [
            {
                dataField: "RequestItem",
                caption: "Request Item"
            },
            {
                dataField: "Seq",
                width: 130
            }
        ],
        onRowInserted: function (e) {
            add_request_item(e.data);
        },
        onRowUpdated: function (e) {
            add_request_item(e.data);
        },
        onRowRemoving: function (e) {
            delete_request_item(e.data);
        }
    });
}

var arr_request_item = [];
function add_request_item(new_request) {
    if (arr_request_item.length == 0) {
        arr_request_item.push(new_request);
    }
    else {
        $.each(arr_request_item, function (key, val) {
            if (arr_request_item[key]['RequestItemID'] == new_request['RequestItemID']) {
                arr_request_item[key]['RequestItem'] = new_request['RequestItem'];
                arr_request_item[key]['Seq'] = new_request['Seq'];
            }
            else {
                arr_request_item.push(new_request);
            }
        });
    }
    return false;
}
function delete_request_item(new_request) {
    $.each(arr_request_item, function (key, val) {
        if (arr_request_item[key]['RequestItemID'] == new_request['RequestItemID']) {
            arr_request_item.splice(key, 1);
        }
    });
    return false;
}

//#endregion 

//#region Request Items
Load_Request_Decisions();
function Load_Request_Decisions() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Request.asmx/GetAllRequestDecisionJson",
        data: "{ " +
            "'meeting_reqID':'" + $("tb_id").val() + "' " +
            ",'org_id':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                Bind_RequestDecisions(result);
            }
            else {
                var d = [];
                Bind_RequestDecisions(d);
            }
        }
    });
}

function Bind_RequestDecisions(data) {
    if (data == undefined) { data = []; }

    $("#gc_RequestDescription").dxDataGrid({
        dataSource: data,
        keyExpr: "RequestDecisionID",
        showBorders: true,
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },
        columns: [
            {
                dataField: "Description",
                caption: "Description"
            },
            {
                dataField: "Seq",
                width: 130
            }
        ],
        onRowInserted: function (e) {
            add_request_decision(e.data);
        },
        onRowUpdated: function (e) {
            add_request_decision(e.data);
        },
        onRowRemoving: function (e) {
            delete_request_decision(e.data);
        }
    });
}

var arr_request_decision = [];
function add_request_decision(new_decision) {
    if (arr_request_decision.length == 0) {
        arr_request_decision.push(new_decision);
    }
    else {
        $.each(arr_request_decision, function (key, val) {
            if (arr_request_decision[key]['RequestItemID'] == new_decision['RequestItemID']) {
                arr_request_decision[key]['RequestItem'] = new_decision['RequestItem'];
                arr_request_decision[key]['Seq'] = new_decision['Seq'];
            }
            else {
                arr_request_decision.push(new_decision);
            }
        });
    }
    return false;
}
function delete_request_decision(new_decision) {
    $.each(arr_request_decision, function (key, val) {
        if (arr_request_decision[key]['RequestItemID'] == new_decision['RequestItemID']) {
            arr_request_decision.splice(key, 1);
        }
    });
    return false;
}

//#endregion 

function SaveRecordVerification() {
    error_message = "";

    if ($("#ddl_requestby").dxLookup("instance").option('value') == "" || $("#ddl_requestby").dxLookup("instance").option('value') == "undefined") {
        if (error_message != "") error_message += "\n";
        error_message += "Request By Name Need To Be Fill";
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveRequest() {
    Pace.start();
    if (SaveRecordVerification() == false)
        return;
    
    var item_requests = '';
    var decisions = '';
    $.each(arr_request_item, function (key, val) {
        if (item_requests != "") item_requests = item_requests + "~";
        item_requests = item_requests +
            arr_request_item[key]['RequestItemID'] + "^" +
            arr_request_item[key]['RequestItem'] + "^" +
            arr_request_item[key]['Seq'];
    });
    $.each(arr_request_decision, function (key, val) {
        if (decisions != "") decisions = decisions + "~";
        decisions = decisions +
            arr_request_decision[key]['RequestDecisionID'] + "^" +
            arr_request_decision[key]['Description'] + "^" +
            arr_request_decision[key]['Seq'];
    });
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Request.asmx/SaveRequest",
        data: "{ " +
            "'RequestID':'" + $("#tb_id").val() + "' " +
            ",'DepartmentID':'" + get_current_user_DepartmentID() + "' " +
            ",'RequestType':'" + $("#ddl_meetingtype").val() + "' " +
            ",'RequestNo':'" + $("#tb_request_no").val() + "' " +
            ",'RequestBy':'" + requestby_id + "' " +
            ",'RequestTitle':'" + $('#tb_meeting_title').val() + "' " +
            ",'RequestStatus':'" + $('#ddl_requeststatus').val() + "' " +
            ",'RequestOn':'" + request_on_date + "' " +
            ",'MeetingID':'" + "" + "' " +
            ",'Remark':'" + esc_quot($('#tb_Remark').val()) + "' " +
            ",'ApprovedBy':'" + "" + "' " +
            ",'ApprovedOn':'" + ""+ "' " +
            ",'ApprovedRemark':'" + "" + "' " +
            ",'Description':'" + esc_quot($('#tb_Description').val()) + "' " +
            ",'UserID':'" + get_current_user_id() + "' " +
            ",'Requestitems':'" + item_requests + "' " + 
            ",'RequestDecisions':'" + decisions + "' " + 
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_request_no").val(data.d.toString().split('~')[2]);
                $("#tb_id").val(data.d.toString().split('~')[1]);
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