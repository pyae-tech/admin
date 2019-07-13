$('title').html(get_current_organization_title() + "Request");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Customer').addClass('active-link');
$("#tab-main").tabs();


var now = new Date();
$("#tb_department_name").val(get_current_user_DepartmentName);
$("#dt_requeston").dxDateBox({
    type: "date",
    value: now
});

GetAllUser();
function GetAlluser() {
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
