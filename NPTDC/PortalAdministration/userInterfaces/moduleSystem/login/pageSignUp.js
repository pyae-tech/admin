$('title').html("Register");

Load_Org_List();

function Load_Org_List() {
   // Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetOrganizations",
        data: "{}" ,
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                $("#tb_org").empty();
                $("#tb_org").append("<option value=''>" + "Choose Organization" + "</option>");

                $.each(data.d, function (key, val) {
                    $("#tb_org").append("<option value=" + data.d[key]['OrgID'] + ">" + data.d[key]['OrgName'] + "</option>");
                })
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

function SignUp() {
   
}

function get_Organization() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetOrganizations",
        data: "{}",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                $("#tb_org").empty();
                $("#tb_org").append("<option value=''>" + "Choose Organization" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_org").append("<option value=" + data.d[key]['OrgID'] + ">" + data.d[key]['OrgName'] + "</option>");
                })
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

function OrgModal() {
    $('#demo-modal-wo-anim').modal('show');
}



