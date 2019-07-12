$('title').html(get_current_organization_title() + "Way");

var car_id='', route_id='';

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_WaySales').addClass('active-link');



if (GetURLData('id') != null && GetURLData('id') != "") {
   
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");


$("#tb_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',

});
$('#tb_date').periodpicker('change');

Load_Car_List();
Load_Route_List();

function GoToInvoice(id) {
    window.open('invoice?id=' + id, '_blank');
}

function GoToIssueNote(id) {
    window.open('issue?id=' + id, '_blank');
}

//#region Save
function SaveRecordVerification() {
    error_message = "";

    if ($("#ddl_car").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Choose Car No."
    }
    if ($("#ddl_route").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Please Choose Route No."
    }
    

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }
}

function SaveRecord() {

    debugger;

    if (SaveRecordVerification() == false)
        return;
    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/SaveWay",
        data: "{ " +
            "'way_id':'" + $("#tb_id").val() + "' " +
            ",'way_date':'" + $('#tb_date').val() + "' " +
            ",'way_no':'" + $("#tb_way_no").val() + "' " +
            ",'credit':'" + $("#tb_credit").val() + "' " +
            ",'cash':'" + $('#tb_cash').val() + "' " +
            ",'balance':'" + $('#tb_balance').val() + "' " +
            ",'car_id':'" + $('#ddl_car').val() + "' " +
            ",'route_id':'" + $('#ddl_route').val() + "' " +
            ",'status':'" + $('#ddl_status').val() + "' " +
            ",'remark':'" + esc_quot($('#tb_remark').val()) + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +

            ",'RequestID':'" + get_current_user_id() + "' " +

            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_way_no").val(data.d.toString().split('~')[1]);
                //Comment-----------------------------------------
                request_comment_id = data.d["WayID"];
                request_comment_type = "Ways";
                Load_Comments();
                //--------------
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

//#endregion

//#region New Record
function LoadNew() {

    Pace.start();
    $("#tb_id").val("");
    $("#tb_way_no").val("");
    $("#tb_date").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#tb_date').periodpicker({
        norange: true,
        cells: [1, 1],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true,
        formatDate: 'YYYY/MM/DD',

    });
    $('#tb_date').periodpicker('change');
    $("#hf_car_id").val("");
    $("#ddl_car").val("").trigger("chosen:updated");
    $("#hf_route_id").val("");
    $("#ddl_route").val("").trigger("chosen:updated");
    $("#ddl_status").val("");

    $("#tb_cash").val("");
    $("#tb_credit").val("");
    $("#tb_balance").val("");
    $("#tb_remark").val("");
    New_Comments();
    $("#lbl_created").val("");
    $("#lbl_modified").val("");
    
}
//#endregion

//#region Load Record
function GetRecord(id) {
    $("#tb_id").val(id);
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetWay",
        data: "{ " +
            "'way_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            console.log("AA=" + data.d["CarID"] + data.d["RouteID"]);

            if (data.d != null) {

                $("#tb_id").val(data.d["WayID"]);
                $("#tb_date").val(moment(data.d["WayDate"]).format('YYYY.MM.DD'));
                $('#tb_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });
                

                $('#tb_date').periodpicker('change');
                $("#tb_way_no").val(data.d["WayNo"]);               
                $("#hf_car_id").val(data.d["CarID"]);       
                car_id = data.d["CarID"];
                $("#ddl_car").val(car_id).trigger("chosen:updated"); 

                $("#hf_route_id").val(data.d["RouteID"]); 
                route_id = data.d["RouteID"];
                $("#ddl_route").val(route_id).trigger("chosen:updated"); 

                // no data in dropdown
                //$("#ddl_car").val(data.d["CarID"]); 
              // $("#ddl_route").val(data.d["RouteID"]);// 
               
                $("#ddl_status").val(data.d["Status"]);
                $("#tb_cash").val(NumberWithCommas(data.d["TotalCashSale"]));
                $("#tb_credit").val(NumberWithCommas(data.d["TotalCreditSale"]));
                $("#tb_balance").val(NumberWithCommas(data.d["Balance"]));
                $("#ddl_status").val(data.d["Status"]);
                $("#tb_remark").val(data.d["Remark"]);

                //Comment-----------------------------------------
                request_comment_id = data.d["WayID"];
                request_comment_type = "Ways";
                Load_Comments();
                //-----------------------------------------------------

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));



                Load_Invoice_List(id, data.d["RouteID"]);
                Load_Issue_List(id);
                Load_Skip_Reason_List(id);
                Load_StockBalance_List(id);
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

//#region Delete Ways

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteWay");
}
function DeleteWay() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/DeleteWay",
        data: "{ " +
            "'way_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                LoadNew();
                ShowSuccessMessage("Deleted.");
                window.close();
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
function Load_Car_List() {
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
        success: function (data) {
            if (data.d != null) {
                $("#ddl_car").empty();
                $("#ddl_car").append("<option value=''>" + "Choose Car No" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_car").append("<option value=" + data.d[key]['CarID'] + ">" + data.d[key]['CarNo'] + "</option>");
                });

                // sure dropdown
                //if (car_id != '' && car_id != undefined)
                //    $("#ddl_car").val(car_id);
                $("#ddl_car").chosen().change();
                $("#ddl_car_chosen").css({ "width": "100%" });
                if ($('#hf_car_id').val() != "") {
                    $('#ddl_car').val($('#hf_car_id').val()).trigger("chosen:updated");
                }

                else {
                    $('#hf_car_id').val("");
                    $('#ddl_car').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function Load_Route_List() {
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
                $("#ddl_route").empty();
                $("#ddl_route").append("<option value=''>" + "Choose Route Name" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_route").append("<option value=" + data.d[key]['RouteID'] + ">" + data.d[key]['RouteName'] + "</option>");
                });
                //if (route_id != '' && route_id != undefined)
                //    $("#ddl_route").val(route_id);
                $("#ddl_route").chosen().change();
                $("#ddl_route_chosen").css({ "width": "100%" });
                if ($('#hf_route_id').val() != "") {
                    $('#ddl_route').val($('#hf_route_id').val()).trigger("chosen:updated");
                }

                else {
                    $('#hf_route_id').val("");
                    $('#ddl_route').val("").trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//#region invoice

function Load_Invoice_List(id,rid) {
    Pace.start();
    $.ajax({
       
        //url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetAllInvoicesByWay",
        //data: "{ " +
        //    "'search_text':'" + "" + "' " + 
        //    ",'wayid':'" + id + "' " +  
        //    ",'RequestID':'" + get_current_user_id() + "' " +
        //    ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
        //    " }",
        
        //url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetSellVouncherCustomerByWay",
        url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetSellVouncherCustomerByWayOrderByCusSeq",
        data: "{ " +          
            "'way_id':'" + id + "' " +  
            ",'route_id':'" + rid + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_Invoice_list1(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_Invoice_list1(records) {
    var allCardsCode1 = '';
     total_cash = 0;
     total_credit = 0;
    rowindex = 0;
    for (i = 0; i < records.length; i++) {
        rowindex++;
        the_template = $('#template_invoice_customer').html();

        allCardsCode1 += the_template.replace()
            .replace("[seq]", rowindex)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[count]", i)
            .replace("[CustomerName]", records[i][0].split('~')[0]);
      //  generate_Invoice_list(records[i].slice(1),rowindex);
    }
    $('#tab_Cus_list').empty();
    $('#tab_Cus_list').append(allCardsCode1);
    for (i = 0; i < records.length; i++) {
        generate_Invoice_list(records[i].slice(1), i,records[i][0].split('~')[1]);
    }

   
    for (i = 0; i < records.length; i++) {
        if (records[i][0].split('~')[1] == "Invoice") {
            total_cash = parseFloat(total_cash) + parseFloat($('#hf_total_cash_amount_' + i).val());
            total_credit = parseFloat(total_credit) + parseFloat($('#hf_total_credit_amount_' + i).val());
        }
    }

        $('#total_cash_amount').html(" : " + NumberWithCommas(total_cash) + " MMK");
        $('#total_credit_amount').html(" : " + NumberWithCommas(total_credit) + " MMK");
   
}



function generate_Invoice_list(records, count, flag) {
    var panel_list = "#panel_list_" + count;
    var panel_shopskip_list = "#panel_shopskip_list_" + count;
    if (flag == "Invoice") {
        var allCardsCode = '';
        rowindex = 0;
        var total_cash_amount = 0;
        var total_credit_amount = 0;
        $.each(records, function (key, val) {
            rowindex++;
            status_color = "label-warning";
            if (records[key]['InvoiceStatus'] == 'Order')
                status_color = "label-purple";
            else if (records[key]['InvoiceStatus'] == 'Completed')
                status_color = "label-primary";
            else if (records[key]['InvoiceStatus'] == 'Cancelled')
                status_color = "label-danger";

            the_template1 = $('#template_row').html();
            total_cash_amount = total_cash_amount + records[key]['CustomerPay'];
            total_credit_amount = total_credit_amount + records[key]['CreditBalance'];
            allCardsCode += the_template1.replace()
                .replace("[SellVouncherID]", records[key]['SellVouncherID'])
                .replace("[VouncherNo]", records[key]['VouncherNo'])
                .replace("[statusColor]", status_color)
                .replace("[CustomerName]", records[key]['CustomerName'])
                .replace("[InvoiceStatus]", records[key]['InvoiceStatus'])
                .replace("[VouncherPayAmount]", NumberWithCommas(records[key]['VouncherPayAmount']))
                .replace("[Seq]", rowindex);
           
        });
       
        var table_list = "#table_list_" + count;
       
        $('#total_cash_amount_' + count).html(" : " + NumberWithCommas(total_cash_amount) + " MMK");
        $('#total_credit_amount_' + count).html(" : " + NumberWithCommas(total_credit_amount) + " MMK");
        $('#hf_total_cash_amount_' + count).val(total_cash_amount);
        $('#hf_total_credit_amount_' + count).val(total_credit_amount);

        if (rowindex == 0) {
            $(panel_list).hide();
        }
        else {
            $(panel_list).show();
        }
        $(panel_shopskip_list).hide();
        $("#flag_Invoice_" + count).css("display", "block");
        $("#flag_Skip_" + count).css("display", "none");
        $(table_list).empty();
        $(table_list).append(allCardsCode);
    }
    else {
        $(panel_list).hide();
        generate_Skip_Reason_list(records, count);
    }

 }

//#end region
function NewInvoiceByWay() {

    window.open('invoice?wayid=' + $("#tb_id").val() + '&wayno=' + $("#tb_way_no").val(), '_blank' );
}

function NewIssueByWay() {
    window.open('issue?wayid=' + $("#tb_id").val() + '&wayno=' + $("#tb_way_no").val(), '_blank');
}

//#region issuenote
function Load_Issue_List(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_IssueNote.asmx/GetAllByWay",
        data: "{ " +            
            "'search_text':'" + "" + "' " +
            ",'wayid':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_issue_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_issue_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function generate_issue_list(records) {

    var allCardsCode = '';
    rowindex = 0;
    var total_amount = 0;

    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_issue_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('.tb_issue_current_page').val(paginationInfos[2]);
            $('.lbl_issue_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_issue_current_page').val(paginationInfos[2]);
            $('.btn_issue_pagination_next').hide();
            $('.btn_issue_pagination_previous').hide();
            if (paginationInfos[4] == 'y') {
                $('.btn_issue_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('.btn_issue_pagination_next').show();
            }
            if (paginationInfos[3] == 'y') {
                $('.btn_issue_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('.btn_issue_pagination_previous').show();
            }
        } else {
            status_color = "label-warning";
            if (records[key]['Status'] == 'Order')
                status_color = "label-purple";
            else if (records[key]['Status'] == 'Completed')
                status_color = "label-primary";
            else if (records[key]['Status'] == 'Cancelled')
                status_color = "label-danger";

            the_template = $('#template_issue_row').html();
            console.log(records);
            allCardsCode += the_template.replace()
                .replace("[IssueNoteID]", records[key]['IssueNoteID'])
                .replace("[IssueNoteNo]", records[key]['IssueNoteNo'])
                .replace("[statusColor]", status_color)
                .replace("[IssueDate]", JsonDateToFormat(records[key]['IssueDate'], 'DD/MM/YYYY'))
                .replace("[CarNo]", records[key]['CarNo'])
                .replace("[RouteName]", records[key]['RouteName'] == null ? "" : records[key]['RouteName'] 
)
                .replace("[Status]", records[key]['Status']);


        }

    });
    //$('.total_issue_record').html(rowindex - 1 + ' records');
    if (rowindex <= 1) {
        $('#panel_issue_list').hide(); 
        $('#page_issue').hide();
    }
    else {
        $('#panel_issue_list').show();
        $('#page_issue').show();
    }

    //if (rowindex == 0) {
    //    $('#panel_issue_list').css("display", "none");
    //} 
    //else {
    //    $('#panel_issue_list').css("display", "block");
    //}

    $('.list_count').html(rowindex - 1);
    $('#table_issue_list').empty();
    $('#table_issue_list').append(allCardsCode);

}

//#end issuenote

//#region Skip Reason
function Load_Skip_Reason_List(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetShopSkipReasons",
        data: "{ " +           
            "'way_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_Skip_Reason_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function generate_Skip_Reason_list(records,count) {

    var allCardsCode = '';
    rowindex = 0;
    var tb_shSkipList = "#table_shopskip_list_" + count;
    $.each(records, function (key, val) {
        rowindex++;

            the_template = $('#template_shopskip_row').html();
            allCardsCode += the_template.replace()
                .replace("[Seq]", rowindex)
                .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
                .replace("[RouteName]", records[key]['RouteName'])
                .replace("[RouteCustomerSkipReason]", records[key]['RouteCustomerSkipReason']);


       

    });
  
    if (rowindex == 0) $('#panel_shopskip_list_'+count).hide();
    else {
        $('#panel_shopskip_list_' + count).show();
    }
    $("#flag_Invoice_" + count).css("display", "none");
    $("#flag_Skip_" + count).css("display", "block");
    $(tb_shSkipList).empty();
    $(tb_shSkipList).append(allCardsCode);

}

//#end Skip Reason


//#region StockBalance
function Load_StockBalance_List(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetStockBalance",
        data: "{ " +
            "'way_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_StockBalance_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function generate_StockBalance_list(records) {

    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#template_stockbalance_row').html();
        allCardsCode += the_template.replace()
            .replace("[Seq]", rowindex)
            .replace("[ItemName]", records[key]['ItemName'])
            .replace("[IssuedQty]", NumberWithCommas(records[key]['IssuedQty']))
            .replace("[RemainingQty]", NumberWithCommas(records[key]['RemainingQty']))
            .replace("[SoldQty]", NumberWithCommas(records[key]['SoldQty']));




    });

    if (rowindex == 0) $('#panel_stockbalance_list').hide();
    else {
        $('#panel_stockbalance_list').show();
    }

    $('#table_stockbalance_list').empty();
    $('#table_stockbalance_list').append(allCardsCode);

}

//#end Skip Reason