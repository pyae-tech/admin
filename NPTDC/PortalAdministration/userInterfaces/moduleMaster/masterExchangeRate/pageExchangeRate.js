$('title').html(get_current_organization_title() + "Exchange Rate");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_ExchangeRate').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});

if (GetURLData('id') != null && GetURLData('id') != "") {
    GetExchangeRate(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_List();


function SaveRecordVerification() {
    error_message = "";
    if ($("#ddl_from_currency").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "From Currency Need To Be Fill"
    }
    if ($("#ddl_to_currency").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "To Currency Need To Be Fill"
    }
    if ($("#tb_exc_rate").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Exchange Rate Need To Be Fill"
    }


    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveExchangeRate() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();
   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/SaveExchangeRate",
        data: "{ " +
            "'exchange_rateid':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'fromCurrency':'" + $("#ddl_from_currency").val() + "' " +
            ",'toCurrency':'" + $("#ddl_to_currency").val() + "' " +
            ",'exc_rate':'" + $("#tb_exc_rate").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_List();
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
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Create New Exchange Rate');
    $("#tb_id").val("");
    $("#ddl_from_currency").val("").trigger("chosen:updated");
   
    $('#ddl_to_currency').val("").trigger("chosen:updated");
    $("#tb_exc_rate").val("");


    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");

    $('#dialogBox_Detail_Form').modal('show');
    $("#ddl_from_currency").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#ddl_from_currency').focus();
    });


}
//#region New Record



function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteExchangeRate");
}
function DeleteExchangeRate() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/DeleteExchangeRate",
        data: "{ " +
            "'exchange_rateid':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                LoadNew();
                Load_List();
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

function GetExchangeRate(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/GetExchangeRate",
        data: "{ " +
            "'exchange_rateid':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["ExchangeRateID"]);

                $("#tab_detail_header").html(data.d["FromCurrency"]);

                $('#hf_fromCurrencyID').val(data.d["FromCurrency"]);
                var from_CurrencyID = data.d['FromCurrency'];
                $('#ddl_from_currency').val(from_CurrencyID).trigger("chosen:updated");

                $('#hf_toCurrencyID').val(data.d["ToCurrency"]);
                var to_CurrencyID = data.d['ToCurrency'];
                $('#ddl_to_currency').val(to_CurrencyID).trigger("chosen:updated");

                
                $("#tb_exc_rate").val(NumberWithCommas(data.d["ExchangeRate"]));
                
                $("#lbl_created").text("Created By : " + data.d["CreatedByCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
               
                ShowSuccessMessage("Loaded.");
                $('#dialogBox_Detail_Form').modal('show');
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



LoadCurrency();
function LoadCurrency() {
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetAllCurrency",

        data: JSON.stringify({
            search_text: '',
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_from_currency").empty();
                $("#ddl_from_currency").append("<option value=''>" + "Choose Currency" + "</option>");
                $("#ddl_to_currency").empty();
                $("#ddl_to_currency").append("<option value=''>" + "Choose Currency" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_from_currency").append("<option value=" + data.d[key]['CurrencyID'] + ">" + data.d[key]['CurrencyCode'] + "</option>");
                    $("#ddl_to_currency").append("<option value=" + data.d[key]['CurrencyID'] + ">" + data.d[key]['CurrencyCode'] + "</option>");

                    });
                $("#ddl_from_currency").chosen().change();
                $("#ddl_from_currency_chosen").css({ "width": "100%" });

                $("#ddl_to_currency").chosen().change();
                $("#ddl_to_currency_chosen").css({ "width": "100%" });

                if ($('#hf_fromCurrencyID').val() != "") {
                    $('#ddl_from_currency').val($('#hf_fromCurrencyID').val()).trigger("chosen:updated");
                }
                else {
                    $("#ddl_from_currency").val().trigger("chosen:updated");
                }

                if ($('#hf_toCurrencyID').val() != "") {
                    $('#ddl_to_currency').val($('#hf_toCurrencyID').val()).trigger("chosen:updated");
                }
                else {
                    $("#ddl_to_currency").val().trigger("chosen:updated");
                }


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
function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ExchangeRate.asmx/GetAllExchangeRateJSON",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindTable(data.d);
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "ExchangeRateID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Brand",
            allowExportSelectedData: false
        },
        headerFilter: {
            visible: true
        },
        hoverStateEnabled: true,
        paging: {
            pageSize: 20
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [20, 40, 60],
            showInfo: true
        },

        allowColumnReordering: true,
        allowColumnResizing: true,
        columnResizingMode: "nextColumn",
        columnMinWidth: 50,
        columnAutoWidth: true,
        grouping: {
            autoExpandAll: true
        },

        searchPanel: {
            visible: true
        },
        groupPanel: {
            visible: true
        },
        columns: Columns,
        onContentReady: function (options) {
            var $dataGridElement = options.element,
                isNoData = $dataGridElement.find(".dx-datagrid-nodata").is(":visible");

            $dataGridElement.find(".dx-datagrid-rowsview").toggleClass("customClass", isNoData);
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GoExchangeRateDetail(data.ExchangeRateID);
            }
        }
    }).dxDataGrid("instance");
    $("#autoExpand").dxCheckBox({
        value: true,
        text: "Expand All Groups",
        onValueChanged: function (data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
        }
    });
}
var Columns = [];
function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "FromCurrency",
            caption: "From Currency",
        },
        {
            dataField: "ToCurrency",
            caption: "To Currency",

        },
        {
            dataField: "ExchangeRate",
            caption: "Exchange Rate",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false
        },
    ];
}

function GoExchangeRateDetail(id) {
    GotoPage('Portal/exchangerates?id=' + id);


}