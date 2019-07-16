$('title').html(get_current_organization_title() + "Request");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_request_letter').addClass('active-link');
$("#tab-main").tabs();


if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRequest(GetURLData('id'));
}
else {
    var meeting_type_list = ["EC", "Management", "Other Type"];
    $("#ddl_meetingtype").dxLookup({
        items: meeting_type_list,
        value: meeting_type_list[0],
        showPopupTitle: false,
        onValueChanged: function (e) {
            if (e.value === "null" || e.value == null) {
                $("#hf_meetingtype").val("");
            }
            else {
                $("#hf_meetingtype").val($("#ddl_meetingtype").dxLookup("instance").option('value'));

            }
        }
    });

    var request_status = ["New", "Pending", "Agenda"];
    $("#ddl_requeststatus").dxLookup({
        items: request_status,
        value: request_status[0],
        showPopupTitle: false,
        onValueChanged: function (e) {
            if (e.value === "null" || e.value == null) {
                $("#hf_requeststatus").val("");
            }
            else {
                $("#hf_requeststatus").val($("#ddl_requeststatus").dxLookup("instance").option('value'));

            }
        }
    });

    LoadNew();

}

//#endregion
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
        request_on_date = ConvertDate($("#dt_requeston").dxDateBox('instance').option('value'));
    }
});

var meeting_type_list = ["EC", "Management", "Other Type"];
$("#ddl_meetingtype").dxLookup({
    items: meeting_type_list,
    value: meeting_type_list[0],
    showPopupTitle: false,
    onValueChanged: function (e) {
        if (e.value === "null" || e.value == null) {
            $("#hf_meetingtype").val("");
        }
        else {
            $("#hf_meetingtype").val($("#ddl_meetingtype").dxLookup("instance").option('value'));
           
        }
    }
});

var request_status = ["New", "Pending", "Agenda","Approved"];
$("#ddl_requeststatus").dxLookup({
    items: request_status,
    value: request_status[0],
    showPopupTitle: false,
    onValueChanged: function (e) {
        if (e.value === "null" || e.value == null) {
            $("#hf_requeststatus").val("");
        }
        else {
            $("#hf_requeststatus").val($("#ddl_requeststatus").dxLookup("instance").option('value'));

        }
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

//#region New Record
function LoadNew() {
    Pace.start();

    $("#tb_meeting_title").focus();
    $("#tb_id").val("");
    $("#ddl_meetingtype").val("");
    $("#tb_meeting_title").val("");
    $("#tb_Description").val("");
    $("#tb_Remark").val("");
    $("#tb_request_no").val("");
    $("#dt_requeston").val("");
    $('#ddl_requestby').val("");
    $("#lbl_created").html("");
    $("#lbl_modified").html("");
    arr_request_item = [];
    arr_request_decision = [];

    $("#tb_department_name").val(get_current_user_DepartmentName());
    var request_on_date = ConvertDate(new Date());
    Load_Request_Item("");
    Load_Request_Decisions("");

    $("#hf_requestbyId").val(get_current_user_id());
    //$("#ddl_requestby").dxLookup('instance').option('value', $("#hf_requestbyId").val());
    
    $("#hf_requeststatus").val("New");
    $("#ddl_requeststatus").dxLookup('instance').option('value', $("#hf_requeststatus").val());
    
    $("#hf_meetingtype").val("EC");
    $("#ddl_meetingtype").dxLookup('instance').option('value', $("#hf_meetingtype").val());
    new_Attachment();
    window.history.replaceState({}, document.title, "request");

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
                    placeholder: "တင်ပြသူ ရွေးချယ်ရန်။",

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

                if ($("#hf_requestbyId").val() != null || $("#hf_requestbyId").val() != "") {
                    $("#ddl_requestby").dxLookup('instance').option('value', $("#hf_requestbyId").val());
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }       
    });   
}

//#region Request Items

function Load_Request_Item(req_id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Request.asmx/GetAllRequestItemsJson",
        data: "{ " +
            "'meeting_reqID':'" + req_id + "' " +
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
    arr_request_item = data;

    $("#gc_RequestItems").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: data,
        height: 300,

        searchPanel: true,
        keyExpr: "RequestItemID",
        showBorders: true,
        showRowLines: true,
        wordWrapEnabled: true,
        loadPanel: {
            enabled: true
        },  
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            useIcons: true
        },
        columns: [
            
            {
                dataField: "Seq",  
                width: 50,
                caption: "စဉ်",
                cssClass: 'cls' 
            },
            {
                dataField: "RequestItem",
                caption: "အကြောင်းအရာ အချက်အလက်များ ရေးပါ။",
                
                cssClass: 'cls' 
            },
            {
                type: "buttons",
                width: 110,
                cssClass: 'cls',
                caption: "..."
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
        },
        onEditorPreparing(e) {
            //https://www.devexpress.com/Support/Center/Question/Details/T745986/datagrid-how-to-enable-word-wrap-for-an-editor
            //https://www.devexpress.com/Support/Center/Question/Details/T719445/datagrid-dxtextarea-does-not-allow-an-end-user-to-enter-a-new-line
            if (e.dataField == "RequestItem") {
                e.editorName = "dxTextArea";
                e.editorOptions.height = 100;
                e.editorOptions.onKeyDown = function (e) {
                    var event = e.event;
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.stopPropagation();
                    }
                };
            }

        }
    });
}

var arr_request_item = [];
function add_request_item(new_request) {
    var contain = false;
    if (arr_request_item.length == 0) {
        arr_request_item.push(new_request);
    }
    else {
        for (i = 0; i < arr_request_item.length; i++)  {
            if (arr_request_item[i]['RequestItemID'] == new_request['RequestItemID']) {
                arr_request_item[i]['RequestItem'] = new_request['RequestItem'];
                arr_request_item[i]['Seq'] = new_request['Seq'];
                contain = true;
                break; 
            }
            else {
                
                contain = false;
            }
        };
        if(!contain){arr_request_item.push(new_request);}
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

function Load_Request_Decisions(req_id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Request.asmx/GetAllRequestDecisionJson",
        data: "{ " +
            "'meeting_reqID':'" + req_id + "' " +
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
    arr_request_decision = data;
    $("#gc_RequestDescription").dxDataGrid({
        dataSource: data,
        keyExpr: "RequestDecisionID",
        searchPanel: true,
        height: 300,
        wordWrapEnabled: true,
        showBorders: true,
        showRowLines: true,
        loadPanel: {
            enabled: true
        }, 
        rowAlternationEnabled: true,
        paging: {
            enabled: false
        },
        editing: {
            mode: "row",
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            useIcons: true
        },
        columns: [
            {
                dataField: "Seq",
                width: 50,
                caption: "စဉ်",
                cssClass: 'cls' 
            } ,
            {
                dataField: "Description",
                caption: "ဆုံးဖြတ်ရန် အချက်များ ရေးပါ။",
                cssClass: 'cls' 
                
            },
            {
                type: "buttons",
                width: 110,
                cssClass: 'cls',
                caption: "...",
            },
            
        ],
        onRowInserted: function (e) {
            add_request_decision(e.data);
        },
        onRowUpdated: function (e) {
            add_request_decision(e.data);
        },
        onRowRemoving: function (e) {
            delete_request_decision(e.data);
        },
        onEditorPreparing(e) {
            //https://www.devexpress.com/Support/Center/Question/Details/T745986/datagrid-how-to-enable-word-wrap-for-an-editor
            //https://www.devexpress.com/Support/Center/Question/Details/T719445/datagrid-dxtextarea-does-not-allow-an-end-user-to-enter-a-new-line
            if (e.dataField == "Description") {
                e.editorName = "dxTextArea";
                e.editorOptions.height = 100;
                e.editorOptions.onKeyDown = function (e) {
                    var event = e.event;
                    if (event.key === "Enter" && !event.shiftKey) {
                        event.stopPropagation();
                    }
                };
            }
           
        }
    });
}

var arr_request_decision = [];
function add_request_decision(new_decision) {
    var contain = false;
    if (arr_request_decision.length == 0) {
        arr_request_decision.push(new_decision);
    }
    else {
        for (i = 0; i < arr_request_decision.length; i++) {
            if (arr_request_decision[i]['RequestDecisionID'] == new_decision['RequestDecisionID']) {
                arr_request_decision[i]['Description'] = new_decision['Description'];
                arr_request_decision[i]['Seq'] = new_decision['Seq'];
                contain = true;
                break; 
            }
            else {
                
                contain = false;
            }
        };
        if(!contain)
        {
            arr_request_decision.push(new_decision);
        }
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
            ",'RequestType':'" + $("#hf_meetingtype").val() + "' " +
            ",'RequestNo':'" + $("#tb_request_no").val() + "' " +
            ",'RequestBy':'" + requestby_id + "' " +
            ",'RequestTitle':'" + $('#tb_meeting_title').val() + "' " +
            ",'RequestStatus':'" + $("#hf_requeststatus").val() + "' " +
            ",'RequestOn':'" + request_on_date + "' " +
            ",'MeetingID':'" + "" + "' " +
            ",'Remark':'" + esc_quot($('#tb_Remark').val()) + "' " +
            ",'ApprovedBy':'" + "" + "' " +
            ",'ApprovedOn':'" + "" + "' " +
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

function GetRequest(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Request.asmx/GetRequestByID",
        data: "{ " +
            "'meeting_reqID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["RequestID"]);
                $("#tab_detail_header").html(data.d["RequestNo"]);
                $("#tb_department_name").val(data.d["DepartmentName"]);
                $("#ddl_meetingtype").val();
                $("#tb_meeting_title").val(data.d["RequestTitle"]);
                $("#tb_Description").val(data.d["Description"]);
                $("#tb_Remark").val(data.d["Remark"]);
                $("#tb_request_no").val(data.d["RequestNo"]);
                $("#dt_requeston").val(data.d["RequestOn"]);
                $("#ddl_requeststatus").val();
                $("#lbl_created").text("စာရင်းသွင်းသူ : " + data.d["CUserCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("ပြင်ဆင်သူ : " + data.d["MUserCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
                            

                var req_on = new Date(JsonDateToFormat(data.d["RequestOn"], 'YYYY-MM-DD'));
                $("#dt_requeston").dxDateBox({
                    type: "date",
                    value: req_on,
                });
                request_attachment_id = data.d["RequestID"];
                request_attachment_type = "request";
                request_attachment_no = data.d["RequestNo"];
                Load_Attachment();

                Load_Request_Item(data.d["RequestID"]);
                Load_Request_Decisions(data.d["RequestID"]);
               
                $("#hf_requeststatus").val(data.d["RequestStatus"]);
                $("#ddl_requeststatus").dxLookup('instance').option('value', $("#hf_requeststatus").val());

                $("#hf_meetingtype").val(data.d["RequestType"]);
                $("#ddl_meetingtype").dxLookup('instance').option('value', $("#hf_meetingtype").val());

                $("#hf_requestbyId").val(data.d["RequestBy"]);
                $("#ddl_requestby").dxLookup('instance').option('value', $("#hf_requestbyId").val());

                //Attachment-----------------------------------------
                
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


function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    } else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}
function Refresh() {
    GetRequest(GetURLData('id'));
}
function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $('#tb_request_no').val() + '&UserId=' + get_current_user_id() + '&refType=request', '_blank');
}

function DeleteRecordConfirmation() {

    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteRequest");
    }
}


//#region Delete Item
function DeleteRequest() {
  
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Request.asmx/DeleteRequest",

        data: JSON.stringify({
            meetingreq_id: $("#tb_id").val(),
            user_id: get_current_user_id(),
            RequestID: get_current_user_id(),
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                LoadNew();
                ShowSuccessMessage("Deleted.");
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
function print_receipt() {
    window.open('requestReport?id=' + $("#tb_id").val() +'&DepartmentId=' + get_current_user_DepartmentID(), '_blank');
}