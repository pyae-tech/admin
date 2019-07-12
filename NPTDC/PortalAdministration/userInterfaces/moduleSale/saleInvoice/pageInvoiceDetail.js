$('title').html(get_current_organization_title() + "Invoice");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_SaleInvoices').addClass('active-link');
LoadCurrency();

if (GetURLData('id') != null && GetURLData('id') != "") {
   // LoadCurrency();
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    } else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}

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
//#region Save




$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
});
$("#tb_search_to_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_to_date').periodpicker({
    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
});

$("#btn_search_all_dates").change(function () {
    Load_Service_List();
});
function CheckForSave() {
    if ($("#hf_customer_id").val() == "") {

        if ($("#tb_customer_name").val() != "") {
            ShowQuestionBox("Do you add new customer?", "CreateNewCustomer", "", "SaveRecord", "");
        }

    }
    else {
        SaveRecord();
    }
}
function CreateNewCustomer() {
    Pace.start();

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Customer.asmx/SaveCustomer",
        data: "{ " +
            "'customer_id':'" + "" + "' " +
            ",'ispartner':'" + false + "'" +//checkbox
            // ",'agent_id':'" + $("#tb_agent").val() + "' " +
            ",'customername':'" + $("#tb_customer_name").val() + "' " +
            ",'customernamezg':'" + $("#tb_customer_name").val() + "' " +
            ",'shortcode1':'" + "" + "' " +
            ",'shortcode2':'" + "" + "' " +
            ",'phoneno':'" + "" + "' " +
            ",'address':'" + "" + "' " +
            ",'sale_personid':'" + "" + "' " +
            ",'ContactDate':'" + "" + "' " +
            ",'Remark':'" + "" + "' " +
            ",'key1name':'" + "" + "' " +
            ",'key2name':'" + "" + "' " +
            ",'key1position':'" + "" + "' " +
            ",'key2position':'" + "" + "' " +
            ",'key1MobineNo':'" + "" + "' " +
            ",'key2MobileNo':'" + "" + "' " +
            ",'key1OfficeNo':'" + "" + "' " +
            ",'key2OfficeNo':'" + "" + "' " +
            ",'key1Address':'" + "" + "' " +
            ",'key2Address':'" + "" + "' " +
            ",'CustomerGroupID':'" + "" + "' " +
            ",'TownshipID':'" + "" + "' " +
            ",'GPS_Lat':'" + "" + "' " +
            ",'GPS_Lon':'" + "" + "' " +
            ",'Cell_Lat':'" + "" + "' " +
            ",'Cell_Lon':'" + "" + "' " +
            ",'User_Lat':'" + "" + "' " +
            ",'User_Lon':'" + "" + "' " +
            ",'OrderLoginID':'" + "" + "' " +
            ",'OrderLoginPassword':'" + "" + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +

            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_Customer_List();
                $("#hf_customer_id").val(data.d.toString().split('~')[1]);
                ShowSuccessMessage("Saved.");
                SaveRecord();
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


function SaveRecordVerification() {
    error_message = "";

    if ($("#hf_customer_id").val() == "") {

        //if ($("#tb_customer_name").val() != "") {
        //    ShowQuestionBox("Do you add new customer?", "CreateNewCustomer", "", "SaveRecordVerification", "");
        //}
        if (error_message != "") error_message += "<br/>";
        error_message += "Please fill customer."
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

function InvoiceAmountVerification() {
    Inv_error_message = "";
   
    if (getFloat('tb_invoice_amount') < 0) {     
        Inv_error_message += "Invalid Invoice Cost. ";
    }

    if (getFloat('tb_discount_percentage') > 100) {
        Inv_error_message += "Discount Percent must not be greater than 100%. ";
    }

    if (getFloat('tb_tax_percentage') > 100) {
        Inv_error_message += "Tax Percent must not be greater than 100%. ";
    }

    if (Inv_error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(Inv_error_message);
        return false;
    }

}

function SaveRecord() {
    if (SaveRecordVerification() == false) {
        return false;
    }
    else {
        if (InvoiceAmountVerification() == false) {
            return false;
        }

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
                arr_invoice_item[key]['item_remark'] + "^" +
                arr_invoice_item[key]['item_discount'] + "^" +
                arr_invoice_item[key]['item_discount_percent'] + "^" +
                arr_invoice_item[key]['item_remark'] + "^" +
                arr_invoice_item[key]['item_discount'] + "^" +
                arr_invoice_item[key]['item_discount_percent'] + "^" +
                arr_invoice_item[key]['item_ori_price'] + "^" +
                arr_invoice_item[key]['item_ori_currency_id'] + "^" +
                arr_invoice_item[key]['item_currency_id'] + "^" +
                arr_invoice_item[key]['item_exchangerate'] + "^";

        });


        $.ajax({
            url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/SaveSaleInvoice",
            data: "{ " +
                "'invoiceID':'" + $("#tb_id").val() + "' " +
                ",'invoiceNo':'" + $("#tb_vouncer_no").val() + "' " +
                ",'invoiceDate':'" + $("#dtp_invoice_date").val() + "' " +
                ",'invoiceStatus':'" + $("#tb_status").val() + "' " +
                ",'customerID':'" + $("#hf_customer_id").val() + "' " +
                ",'total_amount':'" + $("#tb_total_item_cost").val() + "' " +
                ",'total_service_amount':'" + $("#tb_total_Service_cost").val() + "' " +
                ",'discount_percentage':'" + $("#tb_discount_percentage").val() + "' " +
                ",'discount_amount':'" + $("#tb_discount_amount").val() + "' " +
                ",'tax_percentage':'" + $("#tb_tax_percentage").val() + "' " +
                ",'tax_amount':'" + $("#tb_tax_amount").val() + "' " +
                ",'sc_percentage':'" + $("#tb_sc_percentage").val() + "' " +
                ",'sc_amount':'" + $("#tb_sc_amount").val() + "' " +
                ",'other1_amount':'" + $("#tb_other1_amount").val() + "' " +
                ",'other1_title':'" + $("#tb_other1_title").val() + "' " +
                ",'other2_amount':'" + $("#tb_other2_amount").val() + "' " +
                ",'other2_title':'" + $("#tb_other2_title").val() + "' " +
                ",'total_invoice_amount':'" + $("#tb_invoice_amount").val() + "' " +
                ",'invoice_remark':'" + esc_quot($("#tb_invoice_remark").val()) + "' " +
                ",'payment_remark':'" + esc_quot($("#tb_payment_remark").val()) + "' " +
                ",'user_id':'" + get_current_user_id() + "' " +
                ",'itemNotes':'" + item_notes + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                ",'customer_pay_amount':'" + $("#tb_direct_cash").val() + "' " +
                ",'wayID':'" + $("#hf_way_id").val() + "' " +


                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {

                    $("#tb_id").val(data.d.toString().split('~')[1]);
                    $("#tb_vouncer_no").val(data.d.toString().split('~')[2]);
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
}

//#endregion

//#region New Record
function LoadNew() {

    Pace.start();
    $("#tb_id").val("");
    $("#tb_vouncer_no").val("New Vouncher");

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
    $("#hf_customer_id").val("");
    $("#tb_customer_name").val("");

    $("#tb_total_item_cost").val("");
    $("#tb_discount_percentage").val("");
    $("#tb_discount_amount").val("");
    $("#tb_tax_percentage").val("");
    $("#tb_tax_amount").val("");
    $("#tb_sc_percentage").val("");
    $("#tb_sc_amount").val("");
    $("#tb_other1_amount").val("");
    $("#tb_other1_title").val("");
    $("#tb_other2_amount").val("");
    $("#tb_other2_title").val("");
    $("#tb_invoice_amount").val("");
    $("#tb_payment_remark").val("");
    $("#tb_invoice_remark").val("");


    $("#tb_direct_cash").val("");
    $("#tb_refund_amount").val("");
    $("#tb_credit_paid").val("");
    $("#tb_credit_remain").val("");

    $("#hf_location_id").val("");
    $('.invoice_no').html('New Invoice');
    $("#tb_total_Service_cost").val("");
    
    arr_invoice_item = [];
    rebuild_invoice_item_table();
  
    add_new_invoice_item();
    //Comment-------------------------
    New_Comments();
    //Comment------------------------
    //Approval-------------------------
    new_from_approval();
    //Approval-------------------------
    //Attachment-------------------------
    new_Attachment();
     //Attachment-------------------------


    //$("#lbl_created").text("");
    //$("#lbl_modified").text("");
    //$("#lbl_lastlogin").text("");

    $("#tb_customer_name").focus();
}
//#endregion



//#region Load Record
function GetRecord(id) {
    $('#page-content').loading();
    
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetInvoice",
        data: "{ " +
            "'InvoiceID':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["SellVouncherID"]);
                $("#tb_vouncer_no").val(data.d["VouncherNo"]);
                $('.invoice_no').html(data.d["VouncherNo"]);
                $('.agent_info').html(data.d["AgentName"] + " :: " + data.d["CreatedByCode"]);

                $('title').html(data.d["VouncherNo"]);

                $("#dtp_invoice_date").val(moment(data.d["TransactionDate"]).format('YYYY.MM.DD'));
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

                $("#tb_status").val(data.d["InvoiceStatus"]);
                $("#hf_customer_id").val(data.d["CustomerID"]);
                $("#tb_customer_name").val(data.d["CustomerName"]);

                $("#tb_total_item_cost").val(NumberWithCommas(data.d["TotalCost"]));
                $("#tb_discount_percentage").val(data.d["DiscountPercentage"]);
                $("#tb_discount_amount").val(NumberWithCommas(data.d["TotalDiscount"]));
                $("#tb_tax_percentage").val(data.d["TaxPercentage"]);
                $("#tb_tax_amount").val(NumberWithCommas(data.d["TotalTax"]));
                $("#tb_sc_percentage").val(data.d["ServiceChagresPercentage"]);
                $("#tb_sc_amount").val(data.d["TotalServiceChagres"]==null?0:NumberWithCommas(data.d["TotalServiceChagres"]));
                
                $("#tb_other1_amount").val(NumberWithCommas(data.d["Other1Amount"]));
                $("#tb_other1_title").val(data.d["Other1Remark"]);
                $("#tb_other2_amount").val(NumberWithCommas(data.d["Other2Amount"]));
                $("#tb_other2_title").val(data.d["Other2Remark"]);
                $("#tb_invoice_amount").val(NumberWithCommas(data.d["VouncherPayAmount"]));
                $("#tb_payment_remark").val(data.d["PaymentNote"]);
                $("#tb_invoice_remark").val(data.d["Remark"]);


                $("#tb_direct_cash").val(NumberWithCommas(data.d["CustomerPay"]));
                $("#tb_refund_amount").val(NumberWithCommas(data.d["CustomerReceiveBack"]));
                $("#tb_credit_paid").val(NumberWithCommas(data.d["CreditCollected"]));
                $("#tb_credit_remain").val(NumberWithCommas(data.d["CreditBalance"]));
                $("#hf_way_id").val(data.d["WayID"]);
                $('#tb_way_name').val(data.d["WayNo"]);

                //Comment-----------------------------------------
                request_comment_id = data.d["SellVouncherID"];
                request_comment_type = "SaleVouncher";
                Load_Comments();
                
                //-----------------------------------------------------
                //Attachment-----------------------------------------
                request_attachment_id = data.d["SellVouncherID"];
                request_attachment_type = "SaleVouncher";
                request_attachment_no = data.d["VouncherNo"];
                Load_Attachment();
                //-----------------------------------------------------
                //Approval-----------------------------------------
                request_approval_id = data.d["SellVouncherID"];
                request_approval_type = "SaleVouncher";
                request_user_type = "";
                Load_Approvals();
                //-----------------------------------------------------

                arr_invoice_item = [];

                $('#panel_item_list_background').loading();
                //#region Invoice Item
                $.ajax({
                    url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetInvoiceItems",
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
                                    id: records[key]['SellVouncherItemID'],
                                    item_id: records[key]['ItemID'],
                                    item_name: records[key]['ItemName'],
                                    item_price: records[key]['Price'],
                                    item_qty: records[key]['Qty'],
                                    item_cost: records[key]['Cost'],
                                    item_remark: records[key]['Remark'],
                                    item_discount: records[key]['Discount'],
                                    item_discount_percent: records[key]['DiscountPercentage'],
                                    item_ori_price: records[key]['PriceOri'],
                                    item_ori_currency_id: records[key]['OriCurrencyID'],
                                    item_currency_id: records[key]['CurrencyID'],
                                    item_currency_code: records[key]['CurrencyCode'],
                                    item_exchangerate: records[key]['ExchangeRate'],
                                });
                            });
                        }
                        rebuild_invoice_item_table();
                        if (get_current_user_org_Type() == "FFS") {
                            getServiceByInvoiceNumber();
                        }
                        $('#panel_item_list_background').loading('stop');
                    },
                    error: function (xhr, msg) {
                        LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
                        $('#panel_item_list_background').loading('stop');
                    }
                });

                //#endregion



                //Load_DO_List();

                //$("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                //$("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

                ShowSuccessMessage("Loaded.");
                $('#panel_item_list_background').loading('stop');
                $('#page-content').loading('stop');
            }
            else {
                ShowBoxMessage("Oops, we can't find the record. ");
                $('#panel_item_list_background').loading('stop');
                $('#page-content').loading('stop');
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_item_list_background').loading('stop');
            $('#page-content').loading('stop');
        }
    });
}
//#endregion

function UploadAttachment() {
    window.open('attachment?id=' + $("#tb_id").val() + '&No=' + $("#tb_vouncer_no").val() + '&UserId=' + get_current_user_id() + '&refType=saleVouncher', '_blank');
} 


$("#tb_item").change(function () {
    $('#hf_ItemPriceOri').val($("#tb_item option:selected").val().split(',')[1]);
    $('#tb_price').val($("#tb_item option:selected").val().split(',')[1]);
    $('#hf_item_id').val($("#tb_item option:selected").val().split(',')[0]);
    $('#hf_ItemCurrencyID').val($("#tb_item option:selected").val().split(',')[2]);
    $('#hf_CurrencyCode').val($("#tb_item option:selected").val().split(',')[3]);   
    $('#tb_qty').focus();
});
//#region Item Drop Down
Load_Item_List();
function Load_Item_List() {
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
        success: function (data) {
            if (data.d != null) {
                $("#tb_item").empty();
                $("#tb_item").append("<option value=''>" + "Choose Items..." + "</option>");
                var arrItemServer = [];
                $.each(data.d, function (key, val) {
                   
                    var item_val = data.d[key]['ItemID'] + "," + data.d[key]['ItemPrice'] + "," + data.d[key]['CurrencyID'];
                      
                    $("#tb_item").append("<option value=" + item_val + ">" + data.d[key]['ItemName'] + ' / ' + data.d[key]['ItemPrice'] + ' ' + data.d[key]['CurrencyCode'] + "</option>");
                });

                $('#tb_item').chosen().change();
                $("#tb_item_chosen").css({ "width": "100%" });
                $('#tb_qty').focus();
                //if ($('#hf_item_id').val() != "") {
                //    $('#tb_item').val($('#hf_item_id').val()).trigger("chosen:updated");
                //}

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}



$('#tb_item').on('input', function () {
    calculate_item_cost();
});

$('#tb_qty').on('input', function () {
    calculate_item_cost();
});
$('#tb_price').on('input', function () {
    calculate_item_cost();
});
$('#tb_item_discount').on('input', function () {
    calculate_item_cost();
});

$('#tb_discount_percentage').on('input', function () {
    $('#tb_discount_amount').val(0);
    calculate_invoice_amount();
});

$('#tb_tax_percentage').on('input', function () {
    $('#tb_tax_amount').val(0);
    calculate_invoice_amount();
});

$('#tb_sc_percentage').on('input', function () {
    $('#tb_sc_amount').val(0);
    calculate_invoice_amount();
});

$("#tb_qty").keypress(function (event) {
    if (event.which == 13) {
        add_invoice_item();
        return false;
    }
});

$('input[type=radio][name=rdo_discount]').change(function () {
    calculate_item_cost();
});

function calculate_item_cost() {
    var qty = 0;
    if ($('#tb_qty').val() != "") {
        qty = parseInt($('#tb_qty').val());
    }
    var price = 0;
    if ($('#tb_price').val() != "") {
        price = parseFloat($('#tb_price').val());
    }
    var cost = qty * price;


    var final_cost = cost.toFixed(2);
    var discount = 0;
    if ($('#tb_item_discount').val() != "") {
        discount = parseInt($('#tb_item_discount').val());
        if ($('#rdo_percent').prop("checked") == true) {
            final_cost = cost - (cost * discount) / 100;
            $('#hf_discount_amount').val((cost * discount) / 100);
            $('#hf_discount_percent').val(discount);
        }
        else {
            final_cost = cost - discount;
            $('#hf_discount_amount').val(discount);
            $('#hf_discount_percent').val(0);
        }
    }
    $('#tb_item_cost').val(final_cost);
}


//#endregion


//#region Customer Drop Down
Load_Customer_List();
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
                generate_customer_list(data.d);

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_customer_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var arrItemServer = [];
    $.each(records, function (key, val) {
        rowindex++;
        arrItemServer.push({
            Code: records[key]['ShortCode1'],
            Name: records[key]['CustomerNameEng'],
            id: records[key]['CustomerID']
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
                $("#hf_customer_id").val($("#tb_customer_name").getSelectedItemData().id);
                $('#tb_item').focus();
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
    $("#tb_customer_name").easyAutocomplete(options);

}


//#endregion


//#region way Drop Down
Load_Way_List();
function Load_Way_List() {
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
                generate_way_list(data.d);

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_way_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var arrItemServer = [];
    $.each(records, function (key, val) {
        rowindex++;
        arrItemServer.push({
            Name: records[key]['WayNo'],
            id: records[key]['WayID']
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
                $("#hf_way_id").val($("#tb_way_name").getSelectedItemData().id);
                $('#tb_way_name').focus();
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
    $("#tb_way_name").easyAutocomplete(options);
    if (GetURLData('wayid') != null && GetURLData('wayid') != "") {
        $("#hf_way_id").val(GetURLData('wayid'));
        $('#tb_way_name').val(GetURLData('wayno'));
    }
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
    if ($('#tb_item').val() != "" && $('#hf_item_id').val() != "") {
        if (AmountVerification() == false)
            return;
        if (current_invoice_id == '') {
                current_invoice_id = generateQuickGuid();
                arr_invoice_item.push({
                    id: current_invoice_id,
                    item_id: $('#hf_item_id').val(),
                    item_name: $("#tb_item option:selected").text(),
                    item_price: $('#tb_price').val(),
                    item_qty: $('#tb_qty').val(),
                    item_cost: $('#tb_item_cost').val(),
                    item_remark: $('#tb_item_remark').val(),
                    item_discount: $('#hf_discount_amount').val(),
                    item_discount_percent: $('#hf_discount_percent').val(),
                    item_ori_price: $('#hf_ItemPriceOri').val(),
                    item_ori_currency_id: $('#hf_ItemCurrencyID').val(),
                    item_currency_id: $("#ddl_currency option:selected").val(),
                    item_currency_code: $("#ddl_currency option:selected").text(),
                    item_exchangerate: $('#tb_ExchangeRate').val(),
                });

            }
            else {

                $.each(arr_invoice_item, function (key, val) {
                    if (arr_invoice_item[key]['id'] == current_invoice_id) {
                        arr_invoice_item[key]['item_id'] = $('#hf_item_id').val();
                        arr_invoice_item[key]['item_name'] = $("#tb_item option:selected").text();
                        arr_invoice_item[key]['item_price'] = $('#tb_price').val();
                        arr_invoice_item[key]['item_qty'] = $('#tb_qty').val();
                        arr_invoice_item[key]['item_cost'] = $('#tb_item_cost').val();
                        arr_invoice_item[key]['item_remark'] = $('#tb_item_remark').val();
                        arr_invoice_item[key]['item_discount'] = $('#hf_discount_amount').val();
                        arr_invoice_item[key]['item_discount_percent'] = $('#hf_discount_percent').val();
                        arr_invoice_item[key]['item_ori_price'] = $('#hf_ItemPriceOri').val();
                        arr_invoice_item[key]['item_ori_currency_id'] = $('#hf_ItemCurrencyID').val();
                        arr_invoice_item[key]['item_currency_id'] = $("#ddl_currency option:selected").val();
                        arr_invoice_item[key]['item_currency_code'] = $("#ddl_currency option:selected").text();
                        arr_invoice_item[key]['item_exchangerate'] = $('#tb_ExchangeRate').val();

                        return;
                    }
                });
            }

            add_new_invoice_item();
            rebuild_invoice_item_table();
            $('#dialogBox_Detail_Form').modal('hide');
              
    }
    else {
        $('#dialogBox_Detail_Form').modal('show');
        ShowInfoMessage("Please Choose Item!");
    }

    return false;
}

function AmountVerification() {
    error_message = "";
    if ($('#tb_qty').val() == "0" || $('#tb_qty').val() == "") {
        error_message += "Qty must be greater than zero.";
    }
    if (getFloat('tb_item_cost') < 0) {
        error_message += "Invaild Cost. ";
    }

    if (getFloat('hf_discount_percent') > 100) {
        error_message += "Discount must not be greater than 100%. ";
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }
   
}


function rebuild_invoice_item_table() {
    if (default_currency_id != null && default_currency_id !="") {
        rowindex = 0;
        allCardsCode = "";
        total_item_cost = 0;
        item_cost_withSystemCurrency = 0;
        $.each(arr_invoice_item, function (key, val) {
            if (arr_invoice_item[key]['item_name'] != '') {
                rowindex++;
                the_template = $('#template_row').html();
                if (default_currency_id == arr_invoice_item[key]['item_currency_id']) {
                    item_cost_withSystemCurrency = arr_invoice_item[key]['item_cost'];
                }
                else {
                    var ex_rate = getExchangeRate(arr_invoice_item[key]['item_currency_id'], default_currency_id);
                    if (ex_rate == 0) { ex_rate = 1; }
                    item_cost_withSystemCurrency = arr_invoice_item[key]['item_cost'] * ex_rate;
                }
                allCardsCode += the_template.replace()
                    .replace("[InvoiceItemID]", arr_invoice_item[key]['id'])
                    .replace("[Seq]", rowindex)
                    .replace("[ItemName]", arr_invoice_item[key]['item_name'])
                    .replace("[Price]", arr_invoice_item[key]['item_qty'] + ' x ' + NumberWithCommas(arr_invoice_item[key]['item_price']) + ' ' + arr_invoice_item[key]['item_currency_code'] )
                    .replace("[Discount]", (arr_invoice_item[key]['item_discount_percent'] == "0" || arr_invoice_item[key]['item_discount_percent'] == "" || arr_invoice_item[key]['item_discount_percent']==null ) ? NumberWithCommas(arr_invoice_item[key]['item_discount']) : NumberWithCommas(arr_invoice_item[key]['item_discount_percent']) + " %")
                    .replace("[Cost]", NumberWithCommas(parseInt(item_cost_withSystemCurrency)/*arr_invoice_item[key]['item_cost']*/));

                total_item_cost = parseInt(total_item_cost) + parseInt(item_cost_withSystemCurrency)/*.toFixed(2)*//*arr_invoice_item[key]['item_cost']*/;
            }
        });

        $('#tb_total_item_cost').val(NumberWithCommas(total_item_cost));
        $('.itemCount').html(rowindex);
        calculate_invoice_amount();
        $('#table_list').empty();
        $('#table_list').append(allCardsCode);
    }
    $('#panel_item_list_background').loading('stop');
}

function showInvoiceItem(InvoiceItemID) {
    current_invoice_id = InvoiceItemID;
    $.each(arr_invoice_item, function (key, val) {
        if (arr_invoice_item[key]['id'] == InvoiceItemID) {
            $('#hf_item_id').val(arr_invoice_item[key]['item_id']);
            var item_val = arr_invoice_item[key]['item_id'] + "," + arr_invoice_item[key]['item_ori_price'] + "," + arr_invoice_item[key]['item_ori_currency_id']; /*+ "," + arr_invoice_item[key]['item_currency_code'] + "," + arr_invoice_item[key]['item_exchangerate'];*/
            $("#tb_item").val(item_val).trigger("chosen:updated");
            $('#tb_price').val(arr_invoice_item[key]['item_price']);
            $('#tb_qty').val(arr_invoice_item[key]['item_qty']);
            $('#tb_item_cost').val(arr_invoice_item[key]['item_cost']);
            $('#tb_item_remark').val(arr_invoice_item[key]['item_remark']);
            if (arr_invoice_item[key]['item_discount_percent'] == "0") {
                $("#rdo_amount").prop("checked", true);
                $("#rdo_percent").prop("checked", false);
                $('#tb_item_discount').val(arr_invoice_item[key]['item_discount']);
            }
            else {
                $("#rdo_amount").prop("checked", false);
                $("#rdo_percent").prop("checked", true);
                $('#tb_item_discount').val(arr_invoice_item[key]['item_discount_percent']);
            }
            
            $('#hf_CurrencyID').val(arr_invoice_item[key]['item_currency_id']);
            $('#hf_CurrencyCode').val(arr_invoice_item[key]['item_currency_code']);
            $('#tb_ExchangeRate').val(arr_invoice_item[key]['item_exchangerate']);
            $("#ddl_currency").val($('#hf_CurrencyID').val()).trigger("chosen:updated");

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
    $('#tb_item').val('').trigger("chosen:updated");
    $('#tb_price').val('');
    $('#tb_qty').val('');
    $('#tb_item_cost').val('');
    $('#tb_item_remark').val('');
    $('#hf_CurrencyID').val('');
    $('#ddl_currency').val('').trigger("chosen:updated");
    LoadCurrency();
    $('#tb_item_discount').val('');
    $('#tb_item').focus();

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

$('.invoice_final_calculator').on('input', function () {
    calculate_invoice_amount();
});
var calculating_invoice = false;

function calculate_invoice_amount() {
    if (calculating_invoice) return;
    calculating_invoice = true;
    var total_item_cost = CommasToNumber('tb_total_item_cost');    
    var discount= CommasToNumber('tb_discount_amount');   
    var discount_percentage = getFloat('tb_discount_percentage');
    var total_service_amount = CommasToNumber('tb_total_Service_cost');
    total_item_cost += total_service_amount;

    if (discount_percentage != 0 /*&& discount == 0*/) {
        discount = (total_item_cost * discount_percentage) / 100;
        $('#tb_discount_amount').val(NumberWithCommas(discount/*.toFixed(2)*/));
    }

    var tax_percentage = getFloat('tb_tax_percentage');
    var tax = getInt('tb_tax_amount');

    if (tax_percentage != 0 /*&& tax == 0*/) {
        tax = ((total_item_cost - discount) * tax_percentage) / 100;
        $('#tb_tax_amount').val(NumberWithCommas(tax/*.toFixed(2)*/));
    }
    var sc_percentage = getFloat('tb_sc_percentage');
    var sc = CommasToNumber('tb_sc_amount');
    if (sc_percentage != 0) {
        sc += ((total_item_cost - discount) * sc_percentage) / 100;
        $('#tb_sc_amount').val(NumberWithCommas(sc/*.toFixed(2)*/));
    }
    var other1 = CommasToNumber('tb_other1_amount');
    var other2 = CommasToNumber('tb_other2_amount');

    var final_amount =
        total_item_cost - discount + tax +sc+ other1 + other2;

    $('#tb_invoice_amount').val(NumberWithCommas(Math.round(final_amount)));

    var customer_pay = 0;
    if ($('tb_direct_cash').val() != "" && $('tb_direct_cash').val() != undefined) {
        customer_pay = CommasToNumber('tb_direct_cash');
    }
    customer_pay = CommasToNumber('tb_direct_cash');
    var credit_collected = 0;
    if ($('tb_credit_paid').val() != "" && $('tb_credit_paid').val() != undefined) {
        credit_collected = CommasToNumber('tb_credit_paid');
    }


    var retrurn_amount = 0, credit_collect = 0, credit_balance = 0;
    if (customer_pay == final_amount) {
        credit_collected = 0;
        credit_balance = 0;
        retrurn_amount = 0;
    }
    else if (customer_pay > final_amount) {
        credit_collected = 0;
        credit_balance = 0;
        retrurn_amount = customer_pay - final_amount;
    }
    else if (customer_pay < final_amount) {
        retrurn_amount = 0;
        credit_balance = final_amount - (customer_pay + credit_collected);
    }

    $('#tb_direct_cash').val(NumberWithCommas(customer_pay));
    $('#tb_refund_amount').val(NumberWithCommas(Math.round(retrurn_amount)));
    $('#tb_credit_paid').val(NumberWithCommas(Math.round(credit_collected)));
    $('#tb_credit_remain').val(NumberWithCommas(Math.round(credit_balance)));


    calculating_invoice = false;


}
//#endregion

//#region Delete Invoice

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteInvoice");
}
function DeleteInvoice() {
    Pace.start();
    //DeleteInvoice(InvoiceID,  user_id,  RequestID);
    $.ajax({
        url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/DeleteInvoice",
        data: "{ " +
            "'InvoiceID':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
           
            if (data.d.toString().split('~')[0] == "Success") {
                
                GotoPage('portal/invoices');
               
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



function print_receipt() {
    if (get_current_user_org_Type() == "FFS") {
        if (get_current_organization_InvoiceType() == "Type1") {
            window.open('SellVouncherInvoiceType1?id=' + $("#tb_id").val(), '_blank');
        }
        else {
            window.open('invoiceServiceReport?id=' + $("#tb_id").val(), '_blank');
        }
    }
}


//Approval
function Add_Instant_Decision_Completed() {
    GetRecord(GetURLData('id'));
}

function add_new_service() {
    var error = "";
    if (($('#tb_customer_name').val() == "" && $('#hf_customer_id').val() == ""))
    {
        error += "Please Choose customer! ";
             
    }
    if ($("#tb_id").val() == "" && $('#tb_vouncer_no').val() == "New Vouncher") {
        error += "Please Save Invoice first!";
    }  
    if (error == "") {
        $('#dialogBox_Service_Detail_Form').modal('show');
        Load_Service_List();
    }
    else {
        ShowErrorBoxMessage(error);
        $('#dialogBox_Service_Detail_Form').modal('hide');
    }
}

function Load_Service_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Service.asmx/GetAllService",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'CustomerID':'" + $('#hf_customer_id').val() + "' " +
            ",'search_text':'" + "" + "' " +
            ",'search_service':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_Service_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_Service_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_new_service_row').html();

           
        allCardsCode += the_template.replace()
            .replace("[no]", rowindex)
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceDate]", JsonDateToFormat(records[key]['ServiceDate'], 'DD-MM-YYYY'))
            .replace("[ServiceNo]", records[key]['ServiceNo'])
            .replace("[ServiceStatus]", records[key]['ServiceStatus'])
            .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
            .replace("[UserName]", records[key]['UserName'])
            .replace("[TotalAmount]", records[key]['TotalAmount'] == null ? "" : NumberWithCommas(records[key]['TotalAmount']))
        
    });
    if (rowindex == 0) $('#panel_new_service_list').hide();
    else $('#panel_new_service_list').show();


  
    $('#table_list_new_service').empty();
    $('#table_list_new_service').append(allCardsCode);

    
}

function add_service_to_invoice()
{  
       var service_id = "";
       $('input:checkbox.services_chk:checked').each(function () {
            if (service_id == '') {
                service_id = $(this).attr('id');
            }
            else {
                service_id = service_id + ',' + $(this).attr('id');
            }
           });
    Change_Service_Status(service_id);
}

function Change_Service_Status(service_ids) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Service.asmx/ChangeServiceStatus",
        data: "{ " +
            "'ids':'" + service_ids + "' " +
            ",'sellvouncherId':'" + $('#tb_id').val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                //Add_to_Invoice_List(data.d);
                getServiceByInvoiceNumber();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}

function Add_to_Invoice_List(records)
    {
    var allCardsCode = '';
    rowindex = 0;
    var total_sc_amount = 0;
    var total_sc_percent = 0;
    var total_service_amount = 0;
    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_service_row').html();        
        allCardsCode += the_template.replace()
            .replace("[no]", rowindex)
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceID]", records[key]['ServiceID'])
            .replace("[ServiceDate]", JsonDateToFormat(records[key]['ServiceDate'], 'DD-MM-YYYY'))
            .replace("[ServiceNo]", records[key]['ServiceNo'])
            .replace("[ServiceStatus]", records[key]['ServiceStatus'])
            .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
            .replace("[UserName]", records[key]['UserName'])
            //.replace("[ServiceAmount]", records[key]['ServiceAmount'] == null ? "" : NumberWithCommas(records[key]['ServiceAmount']))
            .replace("[TotalAmount]", records[key]['TotalAmount'] == null ? "" : NumberWithCommas(records[key]['TotalAmount']));
        //total_sc_percent = total_sc_percent+ (records[key]['ServiceChargesPercentage'] == null ? 0 : records[key]['ServiceChargesPercentage']);
       // if (records[key]['ServiceChargesPercentage'] == null || records[key]['ServiceChargesPercentage'] == 0 ) {
            total_sc_amount = total_sc_amount + (records[key]['ServiceChargesAmount'] == null ? 0 : records[key]['ServiceChargesAmount']);
        //}
        total_service_amount = total_service_amount + records[key]['BeforeServiceChargesAmount'];
    });
    if (rowindex == 0) $('#panel_service_list').hide();
    else $('#panel_service_list').show();


  
    $('#table_list_service').empty();
    $('#table_list_service').append(allCardsCode);
    $('#tb_sc_percentage').val(total_sc_percent);
    $('#tb_sc_amount').val(NumberWithCommas(total_sc_amount));
    $('#tb_total_Service_cost').val(NumberWithCommas(total_service_amount));
    calculate_invoice_amount();
    $('#dialogBox_Service_Detail_Form').modal('hide');
    Load_Service_List();
    
}

function rowServiceCancel(service_id) {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Service.asmx/rowServiceCancel",
        data: "{ " +
            "'id':'" + service_id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                getServiceByInvoiceNumber();
                Load_Service_List();
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

function getServiceByInvoiceNumber() {
    $('#panel_service_list_background').loading();
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Service.asmx/getServiceByInvoiceNumber",
        data: "{ " +           
            "'sellvouncherId':'" + $('#tb_id').val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                Add_to_Invoice_List(data.d);
            }
            $('#panel_service_list_background').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_service_list_background').loading('stop');
        }
    });

}

function CheckAll() {
    $('.services_chk').prop('checked', true);
}
function UnCheckAll() {
    $('.services_chk input').prop('checked', false);
    $('input:checkbox.services_chk:checked').each(function () {
        $(this).prop('checked', false);
    });
}
function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[0], parts[1] - 1, parts[2]);
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
        newtodate = moment(toDate($("#tb_search_to_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    $('#tb_search_to_date').val(newtodate);
    $('#tb_search_to_date').periodpicker('change');
    Load_Service_List();
}

function GetServices(id) {
    window.open('services?id=' + id, '_blank');
}

$("#ddl_currency").change(function () {
    var price = 0;
    if ($("#ddl_currency option:selected").val() != "") {
        $('#hf_CurrencyID').val($("#ddl_currency option:selected").val());
    }
    else {
        $('#hf_CurrencyID').val($("#ddl_currency").val());
    }
    if ($('#hf_CurrencyID').val()!="" && ($("#hf_ItemCurrencyID").val() == $("#hf_CurrencyID").val())) {
        price = parseInt($('#hf_ItemPriceOri').val());
        $('#tb_ExchangeRate').val("");
    }
    else {
        var rate = getExchangeRate($("#hf_ItemCurrencyID").val(), $("#hf_CurrencyID").val());
        $('#tb_ExchangeRate').val(rate);
        price = parseInt($('#hf_ItemPriceOri').val()) * rate;
    }
    $('#tb_price').val(price);
});

function GetExchangeRate(fromCurrency, toCurrency,status) {
    $.ajax({      
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/GetExchangeRateFormTo",
        data: JSON.stringify({
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                if (status == "ddl_Change") {
                   
                  
                    $('#tb_price').val(parseFloat(data.d['ExchangeRate']) * $('#hf_ItemPriceOri').val());
                }
                else {
                    $('hf_System_ExchangeRate').val(data.d['ExchangeRate']);
                }
               
            }
            else {
                ShowBoxMessage("Oops. " + data.d);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}

var default_currency_id = "";
function LoadCurrency() {  
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetAllCurrency",

        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_currency").empty();
                $("#ddl_currency").append("<option value=''>" + "Choose Currency" + "</option>");
                $.each(data.d, function (key, val) {
                   // var value = data.d[key]['CurrencyID'] + ',' + data.d[key]['ExchangeRate'];
                    $("#ddl_currency").append("<option value=" + data.d[key]['CurrencyID'] + ">" + data.d[key]['CurrencyCode'] + "</option>");
                    if (data.d[key]['DefaultCurrency'] == true && default_currency_id == "") {
                        default_currency_id = data.d[key]['CurrencyID'];
                        $('#system_currency').html(data.d[key]['CurrencyCode']);
                    }
                });
                $("#ddl_currency").chosen().change();
                $("#ddl_currency_chosen").css({ "width": "100%" });

                if ($('#hf_CurrencyID').val() != "") {
                    $('#ddl_currency').val($('#hf_currencyid').val()).trigger("chosen:updated");
                }
                else {
                    $("#hf_CurrencyID").val("");
                    $("#ddl_currency").val(default_currency_id).trigger("chosen:updated");
                }
          
                rebuild_invoice_item_table();
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

GetAllExchangeRate();
var ER_List = [];
function GetAllExchangeRate() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/GetAllExchangeRate",
        data: JSON.stringify({
            search_text: "",
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                ER_List = data.d;


            }
            else {
                ShowBoxMessage("Oops. " + data.d);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}

function getExchangeRate(from, to) {
    var return_Val = 0;
    for (var i = 0; i < ER_List.length; i++) {
        if (ER_List[i].FromCurrency == from && ER_List[i].ToCurrency==to) {
            return_Val = ER_List[i].ExchangeRate;
            break;
        }
    }
    return return_Val;
}