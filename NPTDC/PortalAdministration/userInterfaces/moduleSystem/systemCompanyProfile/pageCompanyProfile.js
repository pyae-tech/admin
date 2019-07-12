$('title').html(get_current_organization_title() + "System Company Profile");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_organization').addClass('active-link');

$("#tab-main").tabs();



if (GetURLData('id') != null && GetURLData('id') != "") {
    GetOrganization(GetURLData('id'));
}
else {
    GetOrganization();
}






//#region Load Record
function GetOrganization() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SYS_Organization.asmx/GetCompanyProfile",
        data: "{ " +
            "'org_id':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["OrgID"]);
                $("#tb_orgType").val(data.d["OrgType"]);
                $("#tb_org_name").val(data.d["OrgName"]);
                $("#tb_code").val(data.d["OrgCode"]);
                $("#tb_joint_date").val(moment(data.d["JointDate"]).format('YYYY.MM.DD'))
                $('#tb_joint_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true,
                });
                $('#tb_joint_date').periodpicker('change');
                $("#tb_expiry_date").val(moment(data.d["ExpiryDate"]).format('YYYY.MM.DD'))
                $('#tb_expiry_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true,
                });
                $('#tb_expiry_date').periodpicker('change');
                $("#tb_user_count").val(data.d["UserCount"]);
                $("#tb_orgplan").val(data.d["OrgPlan"]);
                $("#tb_remark").val(data.d["Remark"]);
                $("#tb_remark1").val(data.d["Remark1"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
                $("#tb_InvoiceAccountNo").val(data.d["InvoiceAccountNo"]);
                $("#tb_InvoiceAccountName").val(data.d["InvoiceAccountName"]);
                $("#tb_website").val(data.d["Website"]);
                $("#tb_facebook").val(data.d["Facebook"]);
                $("#tb_email").val(data.d["Email"]);
                $("#tb_phoneno").val(data.d["PhoneNo"]);
                $("#tb_address").val(data.d["Address"]);
                $("#tb_InvoiceType").val(data.d["InvoiceType"]);
                getImage(get_current_user_org_id());
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
var picture_arr = [];
function getImage(org_id) {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/GetImageSMTHLogo",
        data: "{ " +
            "'refID':'" + org_id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#item_image_zone").css("display", "block");
                $("#image_item").css("display", "none");
                $("#Image_drop_zone").css("display", "block");
                if (data.d["RefType"] == "Logo") {
                    $("#tb_imageid").val(data.d["ImageID"]);
                    picture_arr = data.d["ImageName"].split('/');
                    var picture_name = picture_arr[0];
                    var src = "/PortalAdministration/img/CompanyLogo_Images/" + picture_name;
                    $("#item_image_zone").css("display", "block");
                        $("#image_item").css("display", "block");
                        $("#Image_drop_zone").css("display", "none");
                        $("#bind_item_image_src").attr("src", src);
                }

            }
            else {
                ShowBoxMessage("Oops, we can't find the record.");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
//#endregion

