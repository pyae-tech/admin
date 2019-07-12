$('title').html(get_current_organization_title() + "Sale Order");


$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_order').addClass('active-link');

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetRecord(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

//function PrintIssueNote()
//{
//    window.open('printissuenote?id=' + $("#tb_id").val(), '_blank');
//}


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

$('#tb_search_text').keyup(function (e) {
    Load_List();
});

$("#dtp_order_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#dtp_order_date').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 2],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY"

});
$('#dtp_order_date').periodpicker('change');

//#region Save
function SaveRecordVerification() {
    error_message = "";

    if ($("#hf_customer_id").val() == "") {
        if (error_message != "") error_message += "<br/>";
        error_message += "Please fill customer."
    }
    

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

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
            arr_invoice_item[key]['item_qty'] + "^" +
            arr_invoice_item[key]['item_remark'] + "^"
    });

        //record_id,, issueDate, carid, routeid, locationid, loadInDate, preparedby, preparedOn, status, remark, RequestID, itemNotes
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/SaveRecord",
        data: "{ " +
            "'order_id':'" + $("#tb_id").val() + "' " +
            ",'order_no':'" + $("#tb_order_no").val() + "' " +
            ",'order_date':'" + $("#dtp_order_date").val() + "' " +
            ",'customer_id':'" + $("#hf_customer_id").val() + "' " +
            ",'order_status':'" + $("#ddl_status").val() + "' " +
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
                $("#tb_order_no").val(data.d.toString().split('~')[2]);

                //Comment-----------------------------------------
                request_comment_id = data.d["OrderID"];
                request_comment_type = "SaleOrder";
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
}

//#endregion

//#region New Record
function LoadNew() {

    Pace.start();
    $("#tb_id").val("");
    $("#tb_order_no").val("Order No");

    $("#dtp_order_date").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#dtp_order_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#dtp_order_date').periodpicker('change');
    $("#ddl_status").val("New");
    $("#hf_customer_id").val("");
    $("#tb_customer_name").val("").trigger("chosen:updated");


    $("#tb_remark").val("");
   
    arr_invoice_item = [];
    rebuild_invoice_item_table();
    //Comment-------------------------
    New_Comments();
    $("#tb_customer_name").focus();
}
//#endregion



//#region Load Record
function GetRecord(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/GetRecord",
        data: "{ " +
            "'order_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["OrderID"]);
                $("#tb_order_no").val(data.d["OrderNo"]);
                $('title').html(data.d["IssueNoteNo"]);
                $("#dtp_order_date").val(moment(data.d["OrderDate"]).format('YYYY.MM.DD'));
                $('#dtp_order_date').periodpicker({
                    todayButton: true,
                    norange: true,
                    cells: [1, 2],
                    okButton: false,
                    hideOnBlur: true,
                    hideAfterSelect: true
                });
                $('#dtp_order_date').periodpicker('change');
                $("#ddl_status").val(data.d["OrderStatus"]);
                $("#hf_customer_id").val(data.d["CustomerID"]);
                var customer_id = data.d["CustomerID"];
                $("#tb_customer_name").val(customer_id).trigger("chosen:updated");
                $("#tb_remark").val(data.d["Remark"]);

               
                //Comment-----------------------------------------
                request_comment_id = data.d["OrderID"];
                request_comment_type = "SaleOrder";
                Load_Comments();
                //-----------------------------------------------------

                arr_invoice_item = [];


                //#region Invoice Item
                $.ajax({
                    url: baseUrl() + "WebServices/WebService_Order.asmx/GetOrderItem",
                    data: "{ " +
                        "'order_id':'" + id + "' " +
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
                                    id: records[key]['OrderItemID'],
                                    item_id: records[key]['ItemID'],
                                    item_name: records[key]['ItemName'],
                                    item_qty: records[key]['OrderQty'],
                                    item_remark: records[key]['OrderRemark'],
                                });
                            });
                        }
                        rebuild_invoice_item_table(); 
                    },
                    error: function (xhr, msg) {
                        LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText); 
                    }
                });

                //#endregion



                //Load_DO_List();

                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));

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
                    $("#tb_item").append("<option value=" + data.d[key]['ItemID'] + " > " + data.d[key]['ItemName'] +"</option>");
                });

                $('#tb_item').chosen().change();
                $("#tb_item_chosen").css({ "width": "100%" });
                $('#tb_qty').focus();
               

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//function generate_item_list(records) {
//    var allCardsCode = '';
//    rowindex = 0;

//    var arrItemServer = [];
//    $.each(records, function (key, val) {
//        rowindex++;
//        arrItemServer.push({
//            Code: records[key]['ItemNo'],
//            Name: records[key]['ItemName'] + ' / ' + records[key]['ItemPrice'] + ' Ks',
//            id: records[key]['ItemID'],
//            price: records[key]['ItemPrice']
//        });
//    });

//    var options = {
//        data: arrItemServer,
//        getValue: "Name",
//        list: {
//            match: {
//                enabled: true
//            },
//            onChooseEvent: function () {
//                $("#hf_item_id").val($("#tb_item").getSelectedItemData().id);
//                $('#tb_qty').focus();
//            },
//            onHideListEvent: function () {

//            }
//        },
//        adjustWidth: false,
//        template: {
//            type: "Name",
//            fields: {
//                description: "Code"
//            }
//        }
//    };
//    $("#tb_item").easyAutocomplete(options);

//}

//#endregion







//#region temp data calculation
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

var arr_invoice_item = [];
var current_invoice_id = '';
function add_order_item() {
    if (current_invoice_id == '') {
        current_invoice_id = generateQuickGuid();
        arr_invoice_item.push({
            id: current_invoice_id,
            item_id: $('#hf_item_id').val(),
            item_name: $('#tb_item option:selected').text(),
            item_qty: $('#tb_qty').val(),
            item_remark: $('#tb_item_remark').val(),
        });
    }
    else {
        $.each(arr_invoice_item, function (key, val) {
            if (arr_invoice_item[key]['id'] == current_invoice_id) {
                arr_invoice_item[key]['item_id'] = $('#hf_item_id').val();
                arr_invoice_item[key]['item_name'] = $('#tb_item option:selected').text();
                arr_invoice_item[key]['item_qty'] = $('#tb_qty').val();
                arr_invoice_item[key]['item_remark'] = $('#tb_item_remark').val();
                return;
            }
        });
    }
    add_new_order_item();
    rebuild_invoice_item_table();
    $('#dialogBox_Detail_Form').modal('show');
    $('#tb_qty').focus();
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_qty').focus();
    });


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
                .replace("[OrderItemID]", arr_invoice_item[key]['id'])
                .replace("[Seq]", rowindex)
                .replace("[ItemName]", arr_invoice_item[key]['item_name'])
                .replace("[OrderQty]", arr_invoice_item[key]['item_qty']);

           
        }
    });

    
    $('.itemCount').html(rowindex);
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);
}
function showorderitems(OrderItemID) {
    current_invoice_id = OrderItemID;
    $.each(arr_invoice_item, function (key, val) {
        if (arr_invoice_item[key]['id'] == OrderItemID) {
            $('#hf_item_id').val(arr_invoice_item[key]['item_id']),
            $('#tb_item').val(arr_invoice_item[key]['item_id']).trigger("chosen:updated");
            $('#tb_qty').val(arr_invoice_item[key]['item_qty']);
            $('#tb_item_remark').val(arr_invoice_item[key]['item_remark']);

            $('#dialogBox_Detail_Form').modal('show');
            $('#tb_item_remark').focus();
            $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
                $(this).find('#tb_item_remark').focus();
            });

            return;
        }
    });
}
function add_new_order_item() {

    current_invoice_id = '';
    $('#hf_item_id').val('');
    $('#tb_item').val('');
    $('#tb_qty').val('');
    $('#tb_item_remark').val('');
    $('#tb_item').focus();
    $('#dialogBox_Detail_Form').modal('show');
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_qty').focus();
    });
}

function delete_order_item() {

    if (current_invoice_id == "") {
        add_new_order_item();
    } else {
        $.each(arr_invoice_item, function (key, val) {
            if (arr_invoice_item[key]['id'] == current_invoice_id) {
                arr_invoice_item.splice(key, 1);
                add_new_order_item();
                rebuild_invoice_item_table();
                return false;
            }
        });
    }
}

//#endregion

//#region Delete Invoice

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteRecord");
}
function DeleteRecord() {
    Pace.start();
    //DeleteInvoice(InvoiceID,  user_id,  RequestID);
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/DeleteRecord",
        data: "{ " +
            "'order_id':'" + $("#tb_id").val() + "' " +
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
                $("#tb_customer_name").empty();
                $("#tb_customer_name").append("<option value=''>" + "Choose Customer" + "</option>");
                $.each(data.d, function (key, val) {
                    var customer_name = data.d[key]['CustomerNameEng'] == '' ? data.d[key]['CustomerNameZawgyi'] : data.d[key]['CustomerNameEng']
                    $("#tb_customer_name").append("<option value=" + data.d[key]['CustomerID'] + ">" + customer_name + "</option>")

                });
                $("#tb_customer_name").chosen().change();
                $("#tb_customer_name_chosen").css({ "width": "100%" });
                if ($('#hf_customer_id').val() != "") {
                    $('#tb_customer_name').val($('#hf_customer_id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_customer_id').val("");
                    $("#tb_customer_name").val("").trigger("chosen:updated");
                }

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//function generate__customer_list(records) {
//    var allCardsCode = '';
//    rowindex = 0;
//    var arrCarServer = [];
//    $.each(records, function (key, val) {
//        rowindex++;
//        arrCarServer.push({
//            Code: records[key]['CustomerNameEng'],
//            Name: records[key]['CustomerNameEng'],
//            id: records[key]['CustomerID']
//        });
//    });


//    var options = {
//        data: arrCarServer,
//        getValue: "Name",
//        list: {
//            match: {
//                enabled: true
//            },
//            onChooseEvent: function () {
//                $("#hf_customer_id").val($("#tb_customer_name").getSelectedItemData().id);
//                $('#tb_customer_name').focus();
//            },
//            onHideListEvent: function () {

//            }
//        },
//        adjustWidth: false,
//        template: {
//            type: "Name",
//            fields: {
//                description: "Code"
//            }
//        }
//    };
//    $("#tb_customer_name").easyAutocomplete(options);
//}


//#endregion

function GoToLog() {

    if ($("#tb_id").val() == "") {
        window.open('logs?id=', '_blank');
    }
    else {
        window.open('logs?id=' + $("#tb_id").val(), '_blank');
    }
}



