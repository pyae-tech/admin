$('title').html(get_current_organization_title() + "Services");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_ServiceFFS').addClass('active-link');


$("#tab-main").tabs();
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");



$("#dtp_ser_date").val(moment(new Date()).format('YYYY.MM.DD HH:mm'));
$('#dtp_ser_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD HH:mm',

});
$('#dtp_ser_date').periodpicker('change');

Load_Customer_List();
Load_User_List();


$('.filledFuel_calculator').on('input', function () {
    var filled_amount = $('#tb_after_amount').val() - $('#tb_fAB_L').val();
    $("#tb_fill_amount").val(filled_amount);
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetServices(GetURLData('id'));
}
else {
    LoadNew();
}
checkFFS();
function checkFFS() {
    if (get_current_user_org_Type() == "FFS") {
        $("#fuel_information").css("display", "block");
      

    }
    else  {
        $("#fuel_information").css("display", "none");
      
    }
}
$("#tb_customer_name").change(function () {
    for (i = 0; i < SiteLatLon.length; i++) {
        if (SiteLatLon[i].id == $("#tb_customer_name option:selected").val()) {
            var lat = SiteLatLon[i].Lat == null ? "" : "( Lat :  "+ SiteLatLon[i].Lat+", ";
            var lon = SiteLatLon[i].Lon == null ? "" : " Lon :  " +SiteLatLon[i].Lon + " )";
            $("#lbl_siteLatLon").html(lat + lon);
            //break;
        }
    }

    for (i = 0; i < arr_name_mobile.length; i++) {
        if (arr_name_mobile[i].id == $("#tb_customer_name option:selected").val()) {
            var Customer = arr_name_mobile[i].Name == null ? "" : arr_name_mobile[i].Name;
            var Mobile = arr_name_mobile[i].Mobile == null ? "" : arr_name_mobile[i].Mobile;
            $("#tb_cont_name").val(Customer);
            $("#tb_con_position").val(Mobile);
            //break;
        }


    }
    });
//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_customer_name").val() == "" || $("#tb_customer_name").vall != null) {
        if (error_message != "") error_message += "\n";
        error_message += "Customer Name Need To Be Fill"
    }
    if ($("#tb_service_man").val() == "" || $('#tb_service_man').val() == null) {
        if (error_message != "") error_message += "\n";
        error_message += "Service Man  Need To Be Fill"
    }
    if ($("#tb_ser_charges").val() == "" || $('#tb_ser_charges').val() == null) {
        if (error_message != "") error_message += "\n";
        error_message += "Service Charges  Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }


}

function SaveService() {

    if (SaveRecordVerification() == false)
        return;
    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Service.asmx/SaveServices",
        data: "{ " +
            "'service_id':'" + $("#tb_id").val() + "' " +
            ",'service_no':'" + $('#tb_service_no').val() + "' " +
            ",'service_date':'" + $("#dtp_ser_date").val() + "' " +
            ",'service_status':'" + $("#tb_ser_status").val() + "' " +
            ",'customer_id':'" + $('#tb_customer_name').val() + "' " +
            ",'ser_user_id':'" + $('#tb_service_man').val() + "' " +
            ",'ser_description':'" + $('#tb_description').val() + "' " +
            ",'service_on':'" + $('#tb_start_on').val() + "' " +
            ",'service_end':'" + $('#tb_ser_end').val() + "' " +
            ",'customer_cont_name':'" + $('#tb_cont_name').val() + "' " +
            ",'contact_pos':'" + $('#tb_con_position').val() + "' " +
            ",'ser_amount':'" + $('#tb_ser_charges').val() + "' " +
            ",'remark':'" + esc_quot($('#tb_remark').val()) + "' " +
            ",'BeforeServiceChargesAmount':'" + $('#tb_charges_fuel').val() + "' " +            
            ",'Total_amount':'" + $('#tb_ser_amount').val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'fuel_id':'" + $('#hr_ffs_id').val() + "' " +
            ",'bef_amount':'" + $('#tb_fAB_L').val() + "' " +
            ",'bef_per':'" + $('#tb_bef_percentage').val() + "' " +
            ",'fill_amt':'" + $('#tb_fill_amount').val() + "' " +
            ",'aft_amt':'" + $('#tb_after_amount').val() + "' " +
            ",'aft_per':'" + $('#tb_after_per').val() + "' " +
            ",'price_L':'" + $('#tb_price_L').val() + "' " +
            ",'fuel_charges':'" + $('#tb_charges_fuel').val() + "' " +
            ",'latitude':'" + $('#tb_latitude').val() + "'" +
            ",'longitude':'" + $('#tb_longitude').val() + "'" +
            ",'amount_radio':'" + $("#rdo_amount").is(":checked") + "' " +

            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                if (get_current_user_org_Type() == "FFS") {
                    $("#hr_ffs_id").val(data.d.toString().split('~')[3]);

                }
                $("#tb_service_no").val(data.d.toString().split('~')[2]);
                //Comment-----------------------------------------
                //
                if ($("#tb_id").val() != "") {
                    request_comment_id = $("#tb_id").val();
                    request_comment_type = "Service";
                    Load_Comments();
                    //-----------------------------------------------------

                    //Attachment-----------------------------------------
                    request_attachment_id = $("#tb_id").val();
                    request_attachment_type = "Service";
                    request_attachment_no = $("#tb_service_no").val();
                    Load_Attachment();
                    //---------
                    //Approval-----------------------------------------
                    request_approval_id = $("#tb_id").val();
                    request_approval_type = "Service";
                    request_attachment_no = $("#tb_service_no").val();
                    request_user_type = "";

                    Load_Approvals();
                }
                ShowSuccessMessage("Saved.");              
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

//#endregion

//#region New Record
function LoadNew() {
    Pace.start();

    $("#tab_detail_header").html('Create New Service');
    $("#tb_id").val("");
    $("#tb_service_no").val("");
    $("#dtp_ser_date").val(moment(new Date()).format('YYYY.MM.DD HH:mm'));
    $('#dtp_ser_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 1],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true,


    });
    $('#dtp_ser_date').periodpicker('change');
    $("#tb_ser_status").val("New");
    $("#tb_customer_name").val("").trigger("chosen:updated");
    $("#tb_service_man").val("").trigger("chosen:updated");
    $("#tb_description").val("");

    $("#tb_start_on").val("");

    $("#tb_ser_end").val("");
    $("#tb_cont_name").val("");
    $("#tb_con_position").val("");
    $("#tb_ser_amount").val("");
    $('#tb_remark').val("");
    $("#hr_ffs_id").val("");
    $("#tb_fAB_L").val("");
    $("#tb_bef_percentage").val("");
    $("#tb_fill_amount").val("");
    $("#tb_after_amount").val("");
    $("#tb_after_per").val("");
    $("#tb_price_L").val("");
    $("#tb_charges_fuel").val("");
    $("#tb_ser_charges").val("");
    $("#tb_latitude").val("");
    $("#tb_longitude").val("");
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_customer_name").focus();
    New_Comments();
    new_from_approval();
    new_Attachment();
    //New_Activity();

    if (get_current_user_org_Type() == "FFS") {
        $("#fuel_information").css("display", "block");
    }
    else if (get_current_user_org_Type() == "undefined") {
        $("#fuel_information").css("display", "none");
    }
    $(this).find('#tb_customer_name').focus();    
  
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteService");
}
function DeleteService() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Service.asmx/DeleteService",
        data: "{ " +
            "'service_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                ShowSuccessMessage("Deleted.");
            }
            else {
                ShowBoxMessage("Oops, we can't save. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}

//#endregion

//#region Load Record
function GetServices(id) {
    checkFFS();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Service.asmx/GetServices",
        data: "{ " +
            "'service_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                bindService(data.d[0]);
                if (data.d.length > 1) {
                    bineFFSService(data.d[1]);
                }
                //Comment-----------------------------------------
                //
                request_comment_id = id;
                request_comment_type = "Service";
                Load_Comments();
                //-----------------------------------------------------

                //Attachment-----------------------------------------
                request_attachment_id = data.d[0].ServiceID;
                request_attachment_type = "Service";
                request_attachment_no = data.d[0].ServiceNo;
                Load_Attachment();
                //---------
                //Approval-----------------------------------------
                request_approval_id = id;
                request_approval_type = "Service";
                request_attachment_no = data.d[0].ServiceNo;
                request_user_type = "";
               
                Load_Approvals();
                //-----------------------------------------------------
                //Activity-----------------------------------------
                //request_activity_id = data.d[0].ServiceID;
                //request_activity_type = "Service";
                //Load_Activity();
                //---------

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
//#endregion


function bindService(data) {


    $("#tb_id").val(data["ServiceID"]);
    $("#tb_service_no").val(data["ServiceNo"]);
    $("#tb_ser_status").val(data["ServiceStatus"]);
    $("#dtp_ser_date").val(moment(data["ServiceDate"]).format('YYYY.MM.DD'))
    $('#dtp_ser_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true,
    });
    $('#dtp_ser_date').periodpicker('change');
    $("#tb_start_on").val(TimeObjectToString(data["ServiceStartOn"]));
    $("#tb_ser_end").val(TimeObjectToString(data["ServiceEndOn"]));



    $('#hf_customer_name').val(data["CustomerID"]);
    var customer_id = data["CustomerID"];
    $("#tb_customer_name").val(customer_id).trigger("chosen:updated");
    for (i = 0; i < SiteLatLon.length; i++) {
        if (SiteLatLon[i].id == $("#tb_customer_name").val()) {
            var lat = SiteLatLon[i].Lat == null ? "" : "Lat :  " + SiteLatLon[i].Lat + ", ";
            var lon = SiteLatLon[i].Lon == null ? "" : " Lon :  " + SiteLatLon[i].Lon;
            $("#lbl_siteLatLon").html(lat + lon);
            break;
        }
    }
    $('#hf_service_man').val(data["ServiceUserID"]);
    var service_user_id = data["ServiceUserID"];
    $("#tb_service_man").val(service_user_id).trigger("chosen:updated");

    $("#tb_cont_name").val(data['CustomerContactName']);
    $("#tb_con_position").val(data['CustomerContactPosition']);
    $("#tb_cont_name").val(data['CustomerContactName']);
    $("#tb_latitude").val(data['ServiceLatitude']);
    $("#tb_longitude").val(data['ServiceLongitude']);

    if (data['TotalAmount'] == null || data['TotalAmount'] == '')
        $("#tb_ser_amount").val('');
    else {
        $("#tb_ser_amount").val(NumberWithCommas(Math.round(data['TotalAmount'])));
    }
    if (data['ServiceChargesPercentage'] == 0 || data['ServiceChargesPercentage'] == null) {
        $("#rdo_amount").prop("checked", true);
        $("#rdo_percent").prop("checked", false);
        $("#tb_ser_charges").val(NumberWithCommas(data['ServiceChargesAmount']));
    }
    else {
        $("#rdo_amount").prop("checked", false);
        $("#rdo_percent").prop("checked", true);
        $("#tb_ser_charges").val(NumberWithCommas(data['ServiceChargesPercentage']));
    }



    $("#tb_description").val(data['ServiceDescription'])

    $("#tb_remark").val(data["Remark"]);

    $("#lbl_created").text("Created By : " + data["CreatedByCode"] + " on " + JsonDateToFormat(data["CreatedOn"], 'DD/MM/YYYY HH:mm'));
    $("#lbl_modified").text("Modified By : " + data["ModifiedByCode"] + " on " + JsonDateToFormat(data["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

}

function bineFFSService(data) {
    if (data != null) {
        if (get_current_user_org_Type() == "FFS") {
            $("#fuel_information").css("display", "block");
            $("#hr_ffs_id").val(data["Service_FFS_ID"]);
            $("#tb_fAB_L").val(data["FuelAmountBefore_L"]);
            $("#tb_bef_percentage").val(data["FuelAmountBefore_Percentage"]);
            $("#tb_fill_amount").val(data["FuelAmountFillAmount"]);
            $("#tb_after_amount").val(data["FuelAmountAfter_L"]);
            $("#tb_after_per").val(data["FuelAmountAfter_Percentage"]);
            $("#tb_price_L").val(NumberWithCommas(data['PriceLiter']));
            $("#tb_charges_fuel").val(NumberWithCommas(data['ChargesFuel']));

        }
    }

  
}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    }
    else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

//Approval
function Add_Instant_Decision_Completed() {
    GetServices(GetURLData("id"));
}

function CloseDetail() {   
        window.close();
}

//Customer List
var SiteLatLon = [];
var arr_name_mobile = [];
function Load_Customer_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllCustomers",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                SiteLatLon = [];
                arr_name_mobile = [];

                $("#tb_customer_name").empty();
                $("#tb_customer_name").append("<option value=''>" + "Choose Customer...." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_customer_name").append("<option value=" + data.d[key]['CustomerID'] + ">" + data.d[key]['CustomerNameEng'] + "</option>");
                    SiteLatLon.push({ id: data.d[key]['CustomerID'], Lat: data.d[key]['User_Lat'], Lon: data.d[key]['User_Lon'] });
                    arr_name_mobile.push({ id: data.d[key]['CustomerID'], Name: data.d[key]['Key1Name'], Mobile: data.d[key]['Key1MobileNo']});

                });
                $('#tb_customer_name').chosen().change();
                $("#tb_customer_name_chosen").css({ "width": "100%" });
                if ($('#hf_customer_name').val() != "") {
                    $('#tb_customer_name').val($('#hf_customer_name').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_customer_name').val("");
                    $('#tb_customer_name').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//User List
function Load_User_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUser",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'org_id':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_service_man").empty();
                $("#tb_service_man").append("<option value=''>" + "Choose User...." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_service_man").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option>")
                });
                $("#tb_service_man").chosen().change();
                $("#tb_service_man_chosen").css({ "width": "100%" });
                if ($('#hf_service_man').val() != "") {
                    $('#tb_service_man').val($('#hf_service_man').val()).trigger("chosen:Updated");
                }
                else {
                    $('#hf_service_man').val("");
                    $('#tb_service_man').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $('#tb_service_no').val() + '&UserId=' + get_current_user_id() + '&refType=service', '_blank');

}




//#region Calculate totalamount

$('#tb_ser_charges').on('input', function () {
    calculate_total_amount();
});

$('input[type=radio][name=rdo_service]').change(function () {
    calculate_total_amount();
});
function calculate_total_amount() {
    var total_amount = 0;
    if ($('#tb_ser_charges').val() != "") {
        var charges_fuel = CommasToNumber('tb_charges_fuel');
        var service_amount = CommasToNumber('tb_ser_charges');
        if ($('#rdo_percent').prop("checked") == true) {
             total_amount = charges_fuel + (charges_fuel * (service_amount/100));
        }
        else {
             charges_fuel = CommasToNumber('tb_charges_fuel');
             service_amount = CommasToNumber('tb_ser_charges');
            total_amount = charges_fuel + service_amount;

        }
    }

    else {
         charges_fuel = CommasToNumber('tb_charges_fuel');
         service_amount = CommasToNumber('tb_ser_charges');
         total_amount = charges_fuel + service_amount;
    }

    $("#tb_ser_amount").val(NumberWithCommas(Math.round(total_amount)));
}

//#region CheckStartTime

function CheckStartTime() {
    if (CheckTime($(tb_start_on).val())) { return true; }
    else {
        ShowErrorBoxMessage("Oops,Invalid Time Format!");
        return false;
    }

}

//#region CheckEndTime
function CheckEndTime() {
    if (CheckTime($(tb_ser_end).val())) { return true; }
    else {
        ShowErrorBoxMessage("Oops,Invalid Time Format!");
        return false;
    }
}


//#region calculate_fuelcharges

$('#tb_fill_amount').on('input', function () {

    calculate_fuelcharges();
});

$('#tb_price_L').on('input', function () {

    calculate_fuelcharges();
});

function calculate_fuelcharges() {
    var filled_fuel = CommasToNumber('tb_fill_amount');
    var price_l = CommasToNumber('tb_price_L');
    var fuel_charges = filled_fuel * price_l;
    $("#tb_charges_fuel").val(NumberWithCommas(fuel_charges));
}