$('title').html(get_current_organization_title() + "Agenda");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_agenda').addClass('active-link');
$("#tab-main").tabs();

$("#btn_request_add").dxButton({
    icon: "plus",
    type: "success",
    text: "Add Request",
    onClick: function (e) {
        DevExpress.ui.notify("The Done button was clicked");
    }
});
var agenda_date = ConvertDate(new Date());
$("#dt_agenda_date").dxDateBox({
    applyValueMode: "useButtons",
    displayFormat: "yyyy/MM/dd",

    type: "date",
    value: new Date(),
    max: new Date(),
    min: new Date(1900, 0, 1),
    onValueChanged: function (data) {
        agenda_date = ConvertDate($("#dt_requeston").dxDateBox('instance').option('value'));
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

var request_status = ["New", "Pending", "Complete"];
$("#ddl_agenda_status").dxLookup({
    items: request_status,
    value: request_status[0],
    showPopupTitle: false,
    onValueChanged: function (e) {
        if (e.value === "null" || e.value == null) {
            $("#hf_agenda_status").val("");
        }
        else {
            $("#hf_agenda_status").val($("#ddl_agenda_status").dxLookup("instance").option('value'));

        }
    }
});

function SaveRecordVerification() {
    error_message = "";

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
  
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/SaveAgenda",
        data: "{ " +
        "'AgendaID':'" + $("#tb_id").val() + "' " +
        ",'AgendaDate':'" + agenda_date+ "' " +
        ",'AgendaNo':'" + $("#tb_agenda_no").val() + "' " +
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