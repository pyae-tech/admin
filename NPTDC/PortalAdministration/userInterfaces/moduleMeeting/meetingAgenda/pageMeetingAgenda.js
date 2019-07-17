$('title').html(get_current_organization_title() + "Agenda");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_agenda').addClass('active-link');
$("#tab-main").tabs();

//#region Security
var agenda_Control = [];
agenda_Control = JSON.parse(localStorage.getItem('MeetingAgenda'));
if (agenda_Control != null) {
    if (agenda_Control.AllowCreate) {
        $(".agenda_create").css("display", "block");
    }
    //if (agenda_Control.AllowView) {
    //    $(".request_create").css("display", "block");
    //}
    if (agenda_Control.AllowDelete) {
        $(".agenda_delete").css("display", "block");
    }
    if (agenda_Control.AllowDecision) {
        $(".agenda_decision").css("display", "block");
    }   
};
if (JSON.parse(localStorage.getItem('MeetingRequest')).AllowUpdate) {
    $(".request_update").css("display", "block");
}
//#regionend

SetUP();
var agenda_date = ConvertDate(new Date());
function SetUP() {

    $("#btn_request_add").dxButton({
        icon: "plus",
        type: "success",
        text: "Add Request",
        onClick: function (e) {
            var msg = AddRequestToAgenda();           
        }
    });


    $("#dt_agenda_date").dxDateBox({
        applyValueMode: "useButtons",
        displayFormat: "yyyy/MM/dd",

        type: "date",
        value: new Date(),
        max: new Date(),
        min: new Date(1900, 0, 1),
        onValueChanged: function (data) {
            agenda_date = ConvertDate($("#dt_agenda_date").dxDateBox('instance').option('value'));
        }
    });

    var request_status = ["New", "Pending", "Complete"];
    //$("#hf_agenda_status").val("New");
    $("#ddl_agenda_status").dxLookup({
        items: request_status,
        value: request_status[0],
        showPopupTitle: false,
        onValueChanged: function (e) {
            if (e.value === "null" || e.value == null) {
                $("#hf_agenda_status").val("New");
            }
            else {
                $("#hf_agenda_status").val($("#ddl_agenda_status").dxLookup("instance").option('value'));

            }
        }
    });

}

if (GetURLData('id') != null && GetURLData('id') != "") {
    SetUP();
    GetAgenda(GetURLData('id'));
}
else {
    SetUP();
    LoadNew();

}
function ConvertDate(sdate) {
    const date = new Date(sdate);
    var month = date.getMonth() + 1;
    var dd = date.getDate();

    var output = date.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' + (dd < 10 ? '0' : '') + dd;
    return output;
}


function SaveRecordVerification() {
    error_message = "";

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveAgenda() {
    Pace.start();
    if (SaveRecordVerification() == false)
        return;

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/SaveAgenda",
        data: "{ " +
        "'AgendaID':'" + $("#tb_id").val() + "' " +
        ",'AgendaDate':'" + agenda_date + "' " +
        ",'AgendaNo':'" + $("#tb_agenda_no").val() + "' " +
        ",'AgendaNoLabel':'" + $("#tb_agenda_no_label").val() + "' " +
        ",'AgendaStatus':'" + $("#hf_agenda_status").val() + "' " +
        ",'AgendaHistory':'" + "Testing" + "' " +
        ",'AgendaRemark':'" + esc_quot($('#tb_Remark').val()) + "' " +
        ",'UserID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_agenda_no").val(data.d.toString().split('~')[2]);
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

//#region New Record
function LoadNew() {
    Pace.start();

    $("#tb_Remark").focus();
    $("#tb_id").val("");
    $("#tb_agenda_no").val("");
    $("#tb_Remark").val("");

    $("#tb_department_name").val(get_current_user_DepartmentName());
    var agenda_date = ConvertDate(new Date());
    $("#lbl_created").html("");
    $("#lbl_modified").html("");

    window.history.replaceState({}, document.title, "agenda");

    $("#hf_agenda_status").val("New");
    $("#ddl_agenda_status").dxLookup({
        items: ["New", "Pending", "Complete"],
        value: $("#hf_agenda_status").val(),
        showPopupTitle: false,
        onValueChanged: function (e) {
            if (e.value === "null" || e.value == null) {
                $("#hf_agenda_status").val("New");
            }
            else {
                $("#hf_agenda_status").val($("#ddl_agenda_status").dxLookup("instance").option('value'));

            }
        }
    });
    var grid = $('#gc_AgendaList').dxDataGrid('instance');
    grid.option('dataSource', []);
}

function GetAgenda(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/GetAgendaByID",
        data: "{ " +
        "'agendaID':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["AgendaID"]);
                $("#tab_detail_header").html(data.d["AgendaNo"]);
                //$("#tb_department_name").val(data.d["DepartmentName"]);
                $("#tb_Remark").val(data.d["AgendaRemark"]);
                $("#tb_agenda_no").val(data.d["AgendaNo"]);

                $("#lbl_created").text("စာရင်းသွင်းသူ : " + data.d["CUserCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("ပြင်ဆင်သူ : " + data.d["MUserCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                var angeda_date = new Date(JsonDateToFormat(data.d["AgendaDate"], 'YYYY-MM-DD'));
                $("#dt_agenda_date").dxDateBox({
                    type: "date",
                    value: angeda_date,
                });


                $("#hf_agenda_status").val(data.d["AgendaStatus"]);
                $("#ddl_agenda_status").dxLookup({
                    items: ["New", "Pending", "Complete"],
                    value: $("#hf_agenda_status").val(),
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            $("#hf_agenda_status").val("New");
                        }
                        else {
                            $("#hf_agenda_status").val($("#ddl_agenda_status").dxLookup("instance").option('value'));

                        }
                    }
                });
                LoadRequestByAgendaID(id);
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

function DeleteRecordConfirmation() {

    if ($("#tb_id").val() == "") {
        ShowBoxMessage("Oops, There is no data. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteAgenda");
    }
}


//#region Delete
function DeleteAgenda() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/DeleteAgenda",

        data: JSON.stringify({
            agendaID: $("#tb_id").val(),
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

function AddRequestToAgenda() {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/AddRequestToAgenda",

        data: JSON.stringify({
            agendaID: $("#tb_id").val(),
            user_id: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {               
                var result = JSON.parse(data.d.toString().split('~')[1]);
                Bind_AgendaList(result);
                DevExpress.ui.notify("Added Success","success", 600);
            }
            else {
                DevExpress.ui.notify(data.d.toString().split('~')[1], "error", 600);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });

}

function LoadRequestByAgendaID(id) {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Request.asmx/LoadRequestByAgendaID",

        data: JSON.stringify({
            agendaID: id,
            user_id: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {

                var result = JSON.parse(data.d.toString().split('~')[1]);
                Bind_AgendaList(result);
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

function Bind_AgendaList(data) {
    if (data == undefined) { data = []; }

    $("#gc_AgendaList").dxDataGrid({
        rowAlternationEnabled: true,
        dataSource: data,
        //height: 300,

        searchPanel: true,
        keyExpr: "RequestID",
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
            allowAdding: false,
            useIcons: true
        },
        columns: [
            {
                allowEditing: false,
                width: 50,
                caption: "စဉ်",
                cssClass: 'cls',
                cellTemplate: function (cellElement, cellInfo) {
                    cellElement.text(cellInfo.row.rowIndex + 1)
                }
            },
            {
                allowEditing: false,
                width: 150,
                dataField: "DepartmentName",
                caption: "ဌာနအမည်",
                cssClass: 'cls'
            },
            {
                dataField: "CombineDecision",
                caption: "တင်ပြချက်",

                cssClass: 'cls'
            },
            {
                allowEditing: false,
                width: 150,
                dataField: "Remark",
                caption: "မှတ်ချက်",
                cssClass: 'cls'
            },
            {
                type: "buttons",
                width: 110,
                cssClass: 'cls',
                caption: "...",
            },

        ],
        onRowUpdated: function (e) {
            ChangeCombineDecision(e.data);
        },
        onRowRemoving: function (e) {
            delete_request_item(e.data);
        },
        //onContentReady: function (e) {
        //    var selectedDatasUsers = e.component.getDataSource().items();
        //    console.log(selectedDatasUsers);
        //},
        //onSelectionChanged: function (selectedItems) {
        //    var data = selectedItems.selectedRowsData[0];
        //    if (data) {
        //        GetRequest(data.RequestID);
        //    }
        //},
        onEditorPreparing(e) {
            if (e.dataField == "CombineDecision") {
                e.editorName = "dxTextArea";
                e.editorOptions.height = 200;
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

function GetRequest(id) {
    window.open('request?id=' + id, '_blank');
}

function ChangeCombineDecision(editDecision) {
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Request.asmx/ChangeCombineDecision",
        data: JSON.stringify({
            agendaID: editDecision['AgendaID'],
            meetingreq_id: editDecision['RequestID'],
            edited_decision: editDecision['CombineDecision'],
            user_id: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {

                var result = JSON.parse(data.d.toString().split('~')[1]);
                Bind_AgendaList(result);
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

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

function Refresh()
{
    GetAgenda(GetURLData('id'));
}