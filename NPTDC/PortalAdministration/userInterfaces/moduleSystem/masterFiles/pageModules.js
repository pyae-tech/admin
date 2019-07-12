var orgid = '';
$(function () {
    orgid = localStorage.getItem("OrgId");
    Check_OrgLinkPermission(orgid);
});

function Check_OrgLinkPermission(orgid) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/Check_OrgViewPermission",
        data: "{ " +
            "'org_id':'" + orgid + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (data.d.length > 0) {

                    Disable_MenuGroup_Links(data.d);
                }
                else {

                    Disable_AllMenuGroup_Links(data.d);
                }
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//Disable Menu Group Links in ContentPlaceHolder_Body
function Disable_MenuGroup_Links(records) {

    var menugplist = ["CashFlow", "Distribution", "SaleBook", "Marketing", "Inventory", "General"];//Currently, menugplist are hardcoded.

    $.each(records, function (key, val) {

        var moduleid = '';
        moduleid = records[key]['MenuGroupCode'];
        moduleid = moduleid.trim();

        if (records[key]['AllowView']) {
            menugplist.splice($.inArray(moduleid, menugplist), 1);
            $(document).ready(function () {
                $('#' + moduleid).click(function () {

                });
            });
        }

    });

    //to hide menu groups that organization don't have permission
    if (menugplist.length > 0) {
        for (var i = 0; i < menugplist.length; i++) {
            var menugp = menugplist[i];
            $('#' + menugp).removeAttr('href');
            //$(document).ready(function () {
            //    $('#' + menugp).click(function () {
            //        //e.preventDefault();
            //        return false;
            //    });
            //});
        }
    }
}

//Disable Menu Group Links if ther is no setup in Organization
function Disable_AllMenuGroup_Links(records) {

    $(document).ready(function () {
        $('#CashFlow').click(function (e) {
            e.preventDefault();
        });
    });

    $(document).ready(function () {
        $('#Distribution').click(function (e) {
            e.preventDefault();
        });
    });

    $(document).ready(function () {
        $('#SaleBook').click(function (e) {
            e.preventDefault();
        });
    });

    $(document).ready(function () {
        $('#Marketing').click(function (e) {
            e.preventDefault();
        });
    });

    $(document).ready(function () {
        $('#Inventory').click(function (e) {
            e.preventDefault();
        });
    });

    $(document).ready(function () {
        $('#General').click(function (e) {
            e.preventDefault();
        });
    });

}