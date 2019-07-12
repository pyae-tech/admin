$('title').html(get_current_organization_title() + "SMTH Service Invoices");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_SaleInvoices').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});





$("#dtp_DailyExpense_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#dtp_DailyExpense_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
});

$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
    }

});
$("#tb_search_to_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_to_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_List();
    }
});
$("#btn_search_all_dates").change(function () {

    Load_List();
});
$("#tb_Remark").keydown(function (event) {
    if (event.which == 13) {
        var test = $("#tb_Remark").val() + "\n";
        $("#tb_Remark").val(test);
    }
});


default_wallet_id = "";
is_wallet_list_ready = false;
is_supplier_list_ready = false;
is_customer_list_ready = false;
is_staff_list_ready = false;
is_inType_list_ready = false;



Load_finance_In_Type_List();
Load_Supplier_List();
Load_Customer_List();
Load_StaffName1_List();
Load_Wallet_List();

//#region follow up on parent from action

function Load_All_Listing_Ready_To_Load() {
    if (is_wallet_list_ready && is_supplier_list_ready && is_inType_list_ready && is_customer_list_ready && is_staff_list_ready) {
        if (GetURLData("action") == 'plus') {
            LoadNew();
        }
        else if (GetURLData("action") == 'open') {
            GetDailyExpenseById(GetURLData("id"));
        } else {//Normal 
            Load_List();
        }
    }
}
//#endregion
function SelectChange() {
     Load_List();
}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
        url: baseUrl() + "WebServices/WebService_SaleVouncher.asmx/GetAllInvoices",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'search_invoice_text':'" + $("#tb_search_invoice_text").val() + "' " +
            ",'from_date':'" + $("#tb_search_from_date").val() + "' " +
            //",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'status':'" +"All" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'CustomerID':'" + $('#tb_customer_name').val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
            }
            $('#panel_list_background').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#panel_list_background').loading('stop');
        }
    });
}

 


function generate_list(records) {

    var allCardsCode = '';
    rowindex = 0;
    var total_amount = 0;

    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('.tb_current_page').val(paginationInfos[2]);
            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page').val(paginationInfos[2]);
            $('.btn_pagination_next').hide();
            $('.btn_pagination_previous').hide();
            if (paginationInfos[4] == 'y') {
                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('.btn_pagination_next').show();
            }
            if (paginationInfos[3] == 'y') {
                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('.btn_pagination_previous').show();
            }
        } else {
            status_color = "label-warning";
            if (records[key]['InvoiceStatus'] == 'Order')
                status_color = "label-purple";
            else if (records[key]['InvoiceStatus'] == 'Completed')
                status_color = "label-primary";
            else if (records[key]['InvoiceStatus'] == 'Cancelled')
                status_color = "label-danger";
            
            the_template = $('#template_row').html();
            console.log(records);
            total_amount = total_amount + records[key]['VouncherPayAmount'];
            allCardsCode += the_template.replace()
                .replace("[SellVouncherID]", records[key]['SellVouncherID'])
                .replace("[VouncherNo]", records[key]['VouncherNo'])
                .replace("[statusColor]", status_color)
                .replace("[CustomerName]", records[key]['CustomerName'])
                .replace("[InvoiceStatus]", records[key]['InvoiceStatus'])
                .replace("[VouncherPayAmount]", NumberWithCommas( records[key]['VouncherPayAmount']))
                .replace("[Seq]", rowindex - 1); 
        }

    });
    $('.total_record').html(rowindex - 1 + ' records');
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex - 1);
    $('.list_total_amount').html(" : " + NumberWithCommas(total_amount) + " MMK");
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);


    goToListTab();

}



 

function Load_finance_In_Type_List() {

    $.ajax({

        url: baseUrl() + "WebServices/WebService_FinInType.asmx/GetAllInType",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log("type---" + data.d);
            if (data.d != null) {

                $("#tb_intype_name").empty();
                //generate_finance_in_type_name_list(data.d);
                $.each(data.d, function (key, val) {
                    $("#tb_intype_name").append("<option value=" + data.d[key]['InTypeID'] + ">" + data.d[key]['Title'] + "</option>");

                });
                is_inType_list_ready = true;
                Load_All_Listing_Ready_To_Load();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
        }
    });
}



 
function Load_Supplier_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Supplier.asmx/GetAllSupplier",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_suppliername").empty();
                $.each(data.d, function (key, val) {
                    $("#tb_suppliername").append("<option value=" + data.d[key]['SupplierID'] + ">" + data.d[key]['SupplierName'] + "</option>")

                });

                is_supplier_list_ready = true;
                Load_All_Listing_Ready_To_Load();

            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}



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
                    var name = data.d[key]['CustomerNameEng'] == "" ? data.d[key]['CustomerNameZawgyi'] : data.d[key]['CustomerNameEng']
                    $("#tb_customer_name").append("<option value=" + data.d[key]['CustomerID'] + ">" + name + "</option>");

                });
                $('#tb_customer_name').chosen().change();
                $("#tb_customer_name_chosen").css({ "width": "100%" });
                is_customer_list_ready = true;
                Load_All_Listing_Ready_To_Load();


            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}



function search() {
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}

function clearSearch() {
    $("#tb_search_text").val("");
    $("#tb_search_invoice_text").val(""); 
    $("#tb_customer_name").val("");
    $('#tb_customer_name').val("").trigger("chosen:updated");
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}

function goToListTab() {
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}

function GoToLog() {

    if ($("#tb_OutID").val() == "") {
        window.open('log?id=', '_blank');
    }
    else {
        window.open('log?id=' + $("#tb_OutID").val(), '_blank');
    }
}

function toDate(dateStr) {
    var parts = dateStr.split("/")
    return new Date(parts[0], parts[1] - 1, parts[2])
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
    Load_List();
}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));

    Load_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_List();
}

//#region StaffName1
function Load_StaffName1_List() {
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
                $("#tb_name1").empty();
                $("#tb_name2").empty();
                $("#tb_name3").empty();
                $.each(data.d, function (key, val) {
                    $("#tb_name1").append("<option value=" + data.d[key]['StaffID'] + ">" + data.d[key]['StaffName'] + "</option>")
                    $("#tb_name2").append("<option value=" + data.d[key]['StaffID'] + ">" + data.d[key]['StaffName'] + "</option>")
                    $("#tb_name3").append("<option value=" + data.d[key]['StaffID'] + ">" + data.d[key]['StaffName'] + "</option>")
                });
                is_staff_list_ready = true;
                Load_All_Listing_Ready_To_Load();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//#endregion


//#region Wallet
function Load_Wallet_List() {
    Pace.start();
    $.ajax({
        // GetAllWallet(string search_text, string RequestID)
        url: baseUrl() + "WebServices/WebService_Wallet.asmx/GetAllWallet",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_wallet").empty();
                $.each(data.d, function (key, val) {
                    $("#tb_wallet").append("<option value=" + data.d[key]['WalletID'] + ">" + data.d[key]['WalletName'] + " (" + data.d[key]['Currency'] + ")" + "</option>")
                    if (data.d[key]['IsDefaultWallet'] && default_wallet_id == "") {
                        default_wallet_id = data.d[key]['WalletID'];
                    }
                });
                is_wallet_list_ready = true;
                Load_All_Listing_Ready_To_Load();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}



//#endregion