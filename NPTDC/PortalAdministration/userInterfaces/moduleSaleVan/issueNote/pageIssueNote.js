$('title').html(get_current_organization_title() + "Issue");


$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_IssueNote').addClass('active-link');

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

$('#dtp_invoice_date').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 2],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY"

});

function CheckLoading() {
    var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
    if (count <= 0) {
       // $('#demo-panel-collapse-default').loading();
       
        //alert(count);
    }
    else {
      //  $('#demo-panel-collapse-default').loading('stop');
       // alert(count);
    }
}

var car_id = '';

Load_Car_List();
Load_staff_List();
Load_Route_List();
Load_Location_List();
Load_Way_List();
Load_Item_List();

//#region masterData
//#region Location Drop Down
function Load_Location_List() {
    $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Location.asmx/GetAllLocation",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_location").empty();
                $("#tb_location").append("<option value=''>" + "Choose Location..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_location").append("<option value=" + data.d[key]['StockLocationID'] + ">" + data.d[key]['LocationName'] + "</option>");
                });               
                $('#tb_location').chosen().change();
                if ($('#hf_location_id').val() != "") {
                    $('#tb_location').val($('#hf_location_id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_location_id').val("");
                    $('#tb_location').val("").trigger("chosen:updated");
                }
                var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
                count--;
                $('#hf_materdataCount').val(count);
                CheckLoading();
            }
            $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
//#endregion
//#region Car Drop Down
function Load_Car_List() {
    $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Car.asmx/GetAllCar",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function (xhr) {
            var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
            count++;
            $('#hf_materdataCount').val(count);
        },
        success: function (data) {
            if (data.d != null) {
                $("#tb_car").empty();
                $("#tb_car").append("<option value=''>" + "Choose Car..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_car").append("<option value=" + data.d[key]['CarID'] + ">" + data.d[key]['CarNo'] + "</option>");
                });
                $('#tb_car').chosen().change();
                if ($('#hf_car_by').val() != "") {
                    $('#tb_car').val($('#hf_car_by').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_car_by').val("");
                    $('#tb_car').val("").trigger("chosen:updated");
                }
            }

            var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
            count--;
            $('#hf_materdataCount').val(count);
            CheckLoading();
            $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
//#endregion
//#region Prepared By Drop Down
function Load_staff_List() {
   
    $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_HRStaff.asmx/GetAllStaffs",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_prepared_by").empty();
                $("#tb_prepared_by").append("<option value=''>" + "Choose Prepared Person..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_prepared_by").append("<option value=" + data.d[key]['StaffID'] + ">" + data.d[key]['StaffName'] + "</option>");
                });
                $('#tb_prepared_by').chosen().change();
                if ($('#hf_prepared_by').val() != "") {
                    $('#tb_prepared_by').val($('#hf_prepared_by').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_prepared_by').val("");
                    $('#tb_prepared_by').val("").trigger("chosen:updated");
                }
                var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
                count--;
                $('#hf_materdataCount').val(count);
                CheckLoading();
            }
            $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
//#endregion
//#region way Drop Down
function Load_Way_List() {
    $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({
        //  GetAllWays(string search_text, string from_date, string RequestID)
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetAllWays",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'from_date':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_way_name").empty();
                $("#tb_way_name").append("<option value=''>" + "Choose Way..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_way_name").append("<option value=" + data.d[key]['WayID'] + ">" + data.d[key]['WayNo'] + "</option>");
                });

                $('#tb_way_name').chosen().change();
                if ($('#hf_way_id').val() != "") {
                    $('#tb_way_name').val($('#hf_way_id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_way_id').val("");
                    $('#tb_way_name').val("").trigger("chosen:updated");
                }

                var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
                count--;
                $('#hf_materdataCount').val(count);
                CheckLoading();

            }
            $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
//#endregion
//#region Route Drop Down
function Load_Route_List() {
    $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRoute",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_route_name").empty();
                $("#tb_route_name").append("<option value=''>" + "Choose Route..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_route_name").append("<option value=" + data.d[key]['RouteID'] + ">" + data.d[key]['RouteNo'] + "</option>");
                });

                $('#tb_route_name').chosen().change();
                if ($('#hf_route_id').val() != "") {
                    $('#tb_route_name').val($('#hf_route_id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_route_id').val("");
                    $('#tb_route_name').val("").trigger("chosen:updated");
                }

                var count = $('#hf_materdataCount').val() == "" ? parseInt(0) : parseInt($('#hf_materdataCount').val());
                count--;
                $('#hf_materdataCount').val(count);
                CheckLoading();
            }
            $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
//#endregion
//#endregion

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
    
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

function PrintIssueNote()
{
    if (PrintVerification() == false) {
        return false;
    }
    else
    { 
            window.open('printissuenote?id=' + $("#tb_id").val(), '_blank');
    }       
}
function PrintVerification() {
    error_message = "";

    if ($('#tb_id').val() == "") {
        
        error_message += " Fist save Issue Note .";
    }

    if (arr_invoice_item.length <= 0) {       
          
        error_message += " Empty Item.Please Add Items.";
    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}
//#region Save
function SaveRecordVerification() {
    error_message = "";

    if ($("#tb_car").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Please fill Car."
    }

    if ($("#tb_status").val() == "Confirm") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Please Change the status."
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveRecordCheckStatus() {
    if ($("#tb_status").val() == "New") {
        ShowQuestionBox("Complete this invoice?", "SaveRecordCheckStatus_Yes", "", "SaveRecord", "");
        return false;
    }   
     else {
        SaveRecord();
    }
}

function SaveRecordCheckStatus_Yes() {
    $("#tb_status").val("Completed").change();
    SaveRecord();
}


function SaveRecord() {
    if (SaveRecordVerification() == false){
        return false;
    }
    else { 
    Pace.start();
    var item_notes = '';
    $.each(arr_invoice_item, function (key, val) {
        rowindex++;
        if (item_notes != "") item_notes = item_notes + "~";
        item_notes = item_notes +
            arr_invoice_item[key]['id'] + "^" +
            arr_invoice_item[key]['item_id'] + "^" +
            arr_invoice_item[key]['item_price'] + "^" +
            arr_invoice_item[key]['item_qty'] + "^" +
            arr_invoice_item[key]['item_cost'] + "^" +
            arr_invoice_item[key]['item_remark'] + "^"
    });
        if ($('#tb_way_name').val() == '') { $("#hf_way_id").val(""); }
       
        //record_id,, issueDate, carid, routeid, locationid, loadInDate, preparedby, preparedOn, status, remark, RequestID, itemNotes
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/SaveRecord",
        data: "{ " +
            "'record_id':'" + $("#tb_id").val() + "' " + 
            ",'issueDate':'" + $("#dtp_invoice_date").val() + "' " +
            ",'carid':'" + $("#tb_car").val() + "' " +
            ",'routeid':'" + $("#tb_route_name").val() + "' " +
            ",'wayid':'" + $("#tb_way_name").val() + "' " +            
            ",'locationid':'" + $("#tb_location").val() + "' " +
            ",'loadInDate':'" + $("#dtp_invoice_date").val() + "' " +
            ",'preparedby':'" + $("#tb_prepared_by").val() + "' " +
            ",'preparedOn':'" + $("#dtp_invoice_date").val() + "' " +
            ",'status':'" + $("#tb_status").val() + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'itemNotes':'" + item_notes + "' " + 
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") { 
                $("#tb_id").val(data.d.toString().split('~')[1]); 
                $("#tb_issue_no").val(data.d.toString().split('~')[2]); 
                //Comment-----------------------------------------
                request_comment_id = data.d.toString().split('~')[1];
                request_comment_type = "IssueNote";
                Load_Comments();
               
                //-----------------------------------------------------
                //Approval-----------------------------------------
                request_approval_id = data.d.toString().split('~')[1];
                request_approval_type = "IssueNote";
                request_user_type = "";
                Load_Approvals();

                //-----------------------------------------------------
                //Attachment-----------------------------------------
                request_attachment_id = data.d.toString().split('~')[1];
                request_attachment_type = "IssueNote";
                request_attachment_no = data.d.toString().split('~')[2];
                Load_Attachment();
                ShowSuccessMessage("Saved.");                
               
               // scrollToDiv('#tab-main');
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
}

//#endregion

//#region New Record
function LoadNew() {

    Pace.start();
    $("#tb_id").val("");
    $("#tb_issue_no").val("New IssueNote");

    $("#dtp_invoice_date").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#dtp_invoice_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#dtp_invoice_date').periodpicker('change');
    $("#tb_status").val("New");

    $("#hf_location_id").val("");
    $("#tb_location").val("").trigger("chosen:updated");

    $("#hf_way_id").val("");
    $("#tb_way_name").val("").trigger("chosen:updated");

    $("#hf_route_id").val("");
    $("#tb_route_name").val("").trigger("chosen:updated");

    $("#hf_car_by").val("");
    $("#tb_car").val("").trigger("chosen:updated");
    $("#hf_prepared_by").val("");
    $("#tb_prepared_by").val("").trigger("chosen:updated");
    $("#tb_remark").val("");

    arr_invoice_item = [];
    rebuild_invoice_item_table();
    //Comment-------------------------
    New_Comments();
    new_from_approval();
    //Comment------------------------
    //Attachment-------------------------
    new_Attachment();
     //Attachment-------------------------    
    $("#tb_car_name").focus();
}
//#endregion



//#region Load Record
function GetRecord(id) {
    $('#panel_item_background').loading();
   // $('#demo-panel-collapse-default').loading();
    
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetRecord",
        data: "{ " +
            "'record_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["IssueNoteID"]);
                $("#tb_issue_no").val(data.d["IssueNoteNo"]);
                $('.invoice_no').html(data.d["IssueNoteNo"]);

                $('title').html(data.d["IssueNoteNo"]);

                $("#dtp_invoice_date").val(moment(data.d["IssueDate"]).format('YYYY.MM.DD'));
                $('#dtp_invoice_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });

                //$('#dtp_invoice_date').val(newdate);
                $('#dtp_invoice_date').periodpicker('change');

                $("#tb_status").val(data.d["Status"]);

                var my_val = data.d["CarID"];

                $("#tb_car").val(my_val).trigger("chosen:updated");

                //$("#tb_prepared_by").val(data.d["PreparedName"]);
                $("#hf_prepared_by").val(data.d["PreparedBy"]);
                var prepared_by = data.d["PreparedBy"];
                $("#tb_prepared_by").val(prepared_by).trigger("chosen:updated");

                $("#hf_location_id").val(data.d["LocationID"]);
                //$("#tb_location").val(data.d["LocationName"]);
                var location_id = data.d["LocationID"];
                $("#tb_location").val(location_id).trigger("chosen:updated");
                 
                //$("#tb_route_name").val(data.d["RouteName"]);
                $("#hf_route_id").val(data.d["RouteID"]);
                var route_id = data.d["RouteID"];
                $("#tb_route_name").val(route_id).trigger("chosen:updated");

                $("#tb_remark").val(data.d["Remark"]);

                $("#hf_way_id").val(data.d["WayID"]);
                //$('#tb_way_name').val(data.d["WayNo"]);
                var way_id = data.d["WayID"];
                $("#tb_way_name").val(way_id).trigger("chosen:updated");

                //Comment-----------------------------------------
                request_comment_id = data.d["IssueNoteID"];
                request_comment_type = "IssueNote";
                Load_Comments();
                Load_IssueNoteReason_List(id);
                //-----------------------------------------------------
                //Approval-----------------------------------------
                request_approval_id = data.d["IssueNoteID"];
                request_approval_type = "IssueNote";
                request_user_type = "";
                Load_Approvals();
                
                //-----------------------------------------------------
                //Attachment-----------------------------------------
                request_attachment_id = data.d["IssueNoteID"];
                request_attachment_type = "IssueNote";
                request_attachment_no = data.d["IssueNoteNo"];
                Load_Attachment();
                //-----------------------------------------------------
                arr_invoice_item = [];

               // $('#demo-panel-collapse-default').loading('stop');
                //#region Invoice Item
                $.ajax({
                    url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetIssueItems",
                    data: "{ " +
                        "'InvoiceID':'" + id + "' " +
                        ",'RequestID':'" + get_current_user_id() + "' " +
                        " }",
                    dataType: 'json',
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.d != null) {
                            records = data.d;
                            rowindex = 0;
                            $.each(records, function (key, val) {
                                rowindex++;
                                arr_invoice_item.push({
                                    id: records[key]['IssueNoteItemID'],
                                    item_id: records[key]['ItemID'],
                                    item_name: records[key]['ItemName'],
                                    //item_price: records[key]['Price'],
                                    item_qty: records[key]['Qty'],
                                    //item_cost: records[key]['Cost'],
                                    item_remark: records[key]['Remark'],
                                });
                            });
                        }
                        rebuild_invoice_item_table(); 
                        $('#panel_item_background').loading('stop');
                    },
                    error: function (xhr, msg) {
                        LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText); 
                        $('#panel_item_background').loading('stop');
                        $('#demo-panel-collapse-default').loading('stop');
                    }
                });

                //#endregion
             

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                ShowSuccessMessage("Loaded.");
                //clearInterval(myVar);
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
function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $("#tb_issue_no").val() + '&UserId=' + get_current_user_id() + '&refType=issuenote', '_blank');
} 


//#region Item Drop Down
Load_Item_List();
function Load_Item_List() {
  //  $('#demo-panel-collapse-default').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Items.asmx/GetAllItemsWithoutPagination",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
       beforeSend: function(xhr) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
        },
        success: function (data) {
            if (data.d != null) {
                $("#tb_item").empty();
                $("#tb_item").append("<option value=''>" + "Choose Items..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_item").append("<option value=" + data.d[key]['ItemID'] + ">" + data.d[key]['ItemName'] + ' / ' + data.d[key]['ItemPrice'] + ' Ks'+ "</option>");
                });

                $('#tb_item').chosen().change();
                $("#tb_item_chosen").css({ "background-color": "yellow", "width": "100%" });
                if ($('#hf_item_id').val() != "") {
                    $('#tb_item').val($('#hf_item_id').val()).trigger("chosen:updated");
                }
                else {
                    
                    $('#hf_item_id').val("");
                    $('#tb_item').val("").trigger("chosen:updated");
           
                }
            }
           // $('#demo-panel-collapse-default').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
           // $('#demo-panel-collapse-default').loading('stop');
        }
    });
}
function generate_item_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    var arrItemServer = [];
    $.each(records, function (key, val) {
        rowindex++;
        arrItemServer.push({
            Code: records[key]['ItemNo'],
            Name: records[key]['ItemName'] + ' / ' + records[key]['ItemPrice'] + ' Ks',
            id: records[key]['ItemID'],
            price: records[key]['ItemPrice']
        });
    });

    var options = {
        data: arrItemServer,
        getValue: "Name",
        list: {
            match: {
                enabled: true
            },
            onChooseEvent: function () {
                $("#hf_item_id").val($("#tb_item").getSelectedItemData().id);
                $('#tb_price').val($("#tb_item").getSelectedItemData().price);
                $('#tb_qty').focus();
            },
            onHideListEvent: function () {

            }
        },
        adjustWidth: false,
        template: {
            type: "Name",
            fields: {
                description: "Code"
            }
        }
    };
    $("#tb_item").easyAutocomplete(options);

}

$("#tb_qty").keypress(function (event) {
    if (event.which == 13) {
        add_invoice_item();
        return false;
    }
});

function calculate_item_cost() {
    var qty = parseInt($('#tb_qty').val());
    var price = parseInt($('#tb_price').val());
    $('#tb_item_cost').val(qty * price);
}
//#endregion

//#region temp data calculation
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

var arr_invoice_item = [];
var current_invoice_id = '';
function add_invoice_item() {   
    if ($("#tb_item option:selected").text() != "Choose Items..." || $('#tb_item').val() != "") {
        if (current_invoice_id == '') {
            if ($('#hf_item_id').val() == "" && $('#tb_qty').val() == "") {
                alert("Oops, Qty is zero. ");
                $('#dialogBox_Detail_Form').modal('show');
            }
            else {
                current_invoice_id = generateQuickGuid();
                arr_invoice_item.push({
                    id: current_invoice_id,
                    item_id: $('#tb_item').val(),
                    item_name: $("#tb_item option:selected").text(),
                    item_price: "",
                    item_qty: $('#tb_qty').val(),
                    item_cost: "",
                    item_remark: $('#tb_item_remark').val(),
                });
            }

        }
        else {
            $.each(arr_invoice_item, function (key, val) {
                if (arr_invoice_item[key]['id'] == current_invoice_id) {
                    arr_invoice_item[key]['item_id'] = $('#hf_item_id').val();
                    arr_invoice_item[key]['item_name'] = $("#tb_item option:selected").text();
                    arr_invoice_item[key]['item_price'] = "";
                    arr_invoice_item[key]['item_qty'] = $('#tb_qty').val();
                    arr_invoice_item[key]['item_cost'] = "";
                    arr_invoice_item[key]['item_remark'] = $('#tb_item_remark').val();
                    return;
                }
            });
        }
        add_new_invoice_item();
        rebuild_invoice_item_table();
    }
    else {
        $('#dialogBox_Detail_Form').modal('show');
        ShowInfoMessage("Please Choose Item!");
    }
     return false;
}
function rebuild_invoice_item_table() {
    rowindex = 0;
    allCardsCode = "";
    total_item_cost = 0;
    $.each(arr_invoice_item, function (key, val) {
        if (arr_invoice_item[key]['item_name'] != '') {
            rowindex++;
            the_template = $('#template_row').html();
            allCardsCode += the_template.replace()
                .replace("[InvoiceItemID]", arr_invoice_item[key]['id'])
                .replace("[Seq]", rowindex)
                .replace("[ItemName]", arr_invoice_item[key]['item_name'])
                .replace("[Price]", arr_invoice_item[key]['item_qty'] );

             }
    });
      
    $('.itemCount').html(rowindex);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}
function showInvoiceItem(InvoiceItemID) {
    current_invoice_id = InvoiceItemID;
       
    $.each(arr_invoice_item, function (key, val) {
        if (arr_invoice_item[key]['id'] == InvoiceItemID) {
            $('#hf_item_id').val(arr_invoice_item[key]['item_id']),
              //  $('#tb_item').val(arr_invoice_item[key]['item_name']);
            $("#tb_item").val(arr_invoice_item[key]['item_id']).trigger("chosen:updated");
            $('#tb_price').val(arr_invoice_item[key]['item_price']);
            $('#tb_qty').val(arr_invoice_item[key]['item_qty']);
            $('#tb_item_cost').val(arr_invoice_item[key]['item_cost']);
            $('#tb_item_remark').val(arr_invoice_item[key]['item_remark']);


            $('#dialogBox_Detail_Form').modal('show');
            $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
                $(this).find('#tb_item_remark').focus();
            });

            return;
        }
    });
}
function add_new_invoice_item() {

    current_invoice_id = '';
    $('#hf_item_id').val('');
    $('#tb_item').val('');
    $('#tb_price').val('');
    $('#tb_qty').val('');
    $('#tb_item_cost').val('');
    $('#tb_item_remark').val('');


    Load_Item_List();
    $('#dialogBox_Detail_Form').modal('show');
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_item').focus();
    });
}

function delete_invoice_item() {

    if (current_invoice_id == "") {
        add_new_invoice_item();
    } else {
        $.each(arr_invoice_item, function (key, val) {
            if (arr_invoice_item[key]['id'] == current_invoice_id) {
                arr_invoice_item.splice(key, 1);
                add_new_invoice_item();
                rebuild_invoice_item_table();
                return false;
            }
        });
    }
}

//#region Delete Invoice

function DeleteRecordConfirmation() {
    if ($('#tb_status').val() == "Confirm") {
        ShowBoxMessage("Oops, Issue note is confirmed. We can't delete it. ");
        alert("Oops, Issue note is confirmed. We can't delete it. ");
    }
    else {
        ShowConfirmation("Are you sure you want to delete?", "DeleteIssueNote");
    }  
}
function DeleteIssueNote() {
    Pace.start();
   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/DeleteRecord",
        data: "{ " +
            "'record_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {           
                LoadNew();
                ShowSuccessMessage("Deleted.");
          },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}
//#endregion

function Load_IssueNoteReason_List(id) {
    $('#panel_check_reson').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetAllReasonByIssueNoteId",
        data: "{ " +
            "'IssueNoteID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_IssueNoteReason_list(data.d);

            }
            $('#panel_check_reson').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_check_reson').loading('stop');
        }
    });
}
function generate_IssueNoteReason_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_Reason_row').html();

        allCardsCode += the_template.replace()
            .replace("[Seq]", rowindex)
            .replace("[CreadtedUser]", records[key]['CreatedUserName'])
            .replace("[CheckReasonStatus]", records[key]['CheckReasonStatus'] == null ? '' : records[key]['CheckReasonStatus'])
            .replace("[CheckReason]", records[key]['CheckReason'] == null ? '' : records[key]['CheckReason']);
                
      
    });
if (rowindex == 0) $('#panel_Reason_list').hide();
    else $('#panel_Reason_list').show();
$('#table_Reason_list').empty();
$('#table_Reason_list').append(allCardsCode);


}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        return;
    }
    else {
        window.open('log?id=' + $("#tb_id").val(), '_blank');
    }
}





