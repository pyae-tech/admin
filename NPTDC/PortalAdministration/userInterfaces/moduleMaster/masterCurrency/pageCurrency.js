$('title').html(get_current_organization_title() + "Currency");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_Currency').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});
if (GetURLData('id') != null && GetURLData('id') != "") {
    GetCurrency(GetURLData('id'));
}
else {
    LoadNew();
    $('#dialogBox_Detail_Form').modal('hide');
}

$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");
Load_List();

////#region Listing
//function clearSearch() {
//    $('#tb_search_text').val('');
//    $('#tb_search').val('');
   
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}
//function search() {

//    $('#tb_search_text').val();
//    $('#tb_search').val();
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");

//}

//function Load_List() {
//    $('#panel_list_background').loading();
//    Pace.start();
//    $.ajax({

//        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
//        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetAllCurrencyWithPagination",
//        data: "{ " +
//            "'search_text':'" + $("#tb_search_text").val() + "' " +
//            ",'search_currency':'" + $("#tb_search").val() + "' " +
//            ",'RequestID':'" + get_current_user_id() + "' " +
//            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
//            " }",
//        dataType: 'json',
//        type: "POST",
//        contentType: "application/json; charset=utf-8",
//        success: function (data) {
//            if (data.d != null) {
//                generate_list(data.d);
//                $('#panel_list_background').loading('stop');
//            }
//        },
//        error: function (xhr, msg) {
//            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
//            $('#panel_list_background').loading('stop');
//        }
//    });
//}

//function generate_list(records) {
//    var allCardsCode = '';
//    rowindex = 0;

//    $.each(records, function (key, val) {
//        rowindex++;
//        the_template = $('#template_row').html();

//        if (rowindex == 1) {//paginatin function
//            paginationInfos = records[key].split('~');
//            $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
//            $('.tb_current_page').val(paginationInfos[2]);
//            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
//            $('#hf_current_page').val(paginationInfos[2]);
//            $('.btn_pagination_next').hide();
//            $('.btn_pagination_previous').hide();
//            if (paginationInfos[4] == 'y') {
//                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
//                $('.btn_pagination_next').show();
//            }
//            if (paginationInfos[3] == 'y') {
//                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
//                $('.btn_pagination_previous').show();
//            }
//        } else {

//            the_template = $('#template_row').html();
//            if (records[key]['DefaultCurrency'] == true) {
//                var mark = "<i class='ion-checkmark'></i>";
//            }
//            else {
//                var mark = '';
//            }
            

//            allCardsCode += the_template.replace()
//                .replace("[CurrencyID]", records[key]['CurrencyID'])
//                .replace("[CurrencyCode]", records[key]['CurrencyCode'] == null ? '' : records[key]['CurrencyCode'])
//                .replace("[CurrencyName]", records[key]['CurrencyName'] == null ? '' : records[key]['CurrencyName'])
//                //.replace("[ExchangeRate]", records[key]['ExchangeRate'] == null ? '' : NumberWithCommas(records[key]['ExchangeRate']))
//                .replace("[DefaultCurrency]", mark)
//                //.replace("[Remark]", records[key]['Remark'] == null ? '' : records[key]['Remark']);

//        }

//    });
//    if (rowindex == 0) $('#panel_list').hide();
//    else $('#panel_list').show();



//    $('.list_count').html(rowindex - 1);
//    $('#table_list').empty();
//    $('#table_list').append(allCardsCode);



//}

//function pageJump(control)//paginatin function
//{
//    $('#hf_current_page').val($(control).attr('actionPage'));
//    Load_List();
//}
//function pageJumpToThis()//paginatin function
//{
//    $('#hf_current_page').val($('.tb_current_page').val());
//    Load_List();
//}

////#endregion

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if ($("#tb_currencycode").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Currency Code Need To Be Fill"
    }
    if ($("#tb_currencyname").val() == "") {
        if (error_message != "") error_message += "\n";
        error_message += "Currency Name Need To Be Fill"
    }

    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}
//#endregion
function SaveRecord() {
    if (SaveRecordVerification() == false)
        return;
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/SaveCurrency",
        data: "{ " +
            "'currency_id':'" + $("#tb_id").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'currency_code':'" + $("#tb_currencycode").val() + "' " +
            ",'currency_name':'" + $("#tb_currencyname").val() + "' " +
            //",'exchange_rate':'" + $("#tb_exchangerate").val() + "' " +
            ",'remark':'" + esc_quot($("#tb_remark").val()) + "' " +
            ",'defaultcurrency':'" + $("#cb_defaultcur").is(":checked") + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                Load_List();
                $("#tb_id").val(data.d.toString().split('~')[1]);
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

//#region New Record
function LoadNew() {
    Pace.start();
    $("#tab_detail_header").html('Create New Currency');
    $("#tb_id").val("");
    $("#tb_currencyname").val("");
    $("#tb_currencycode").val("");
    //$("#tb_exchangerate").val("");
    $("#tb_remark").val("");
    $("#cb_defaultcur").prop("checked", false);
    $("#lbl_created").text("");
    $("#lbl_modified").text("");
    $("#lbl_lastlogin").text("");
    $('#dialogBox_Detail_Form').modal('show');
    $("#tb_currencyname").focus();

    //for focus on first page load
    $('#dialogBox_Detail_Form').on('shown.bs.modal', function () {
        $(this).find('#tb_currencyname').focus();
    });
   
}
//#endregion

//#region Delete

function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteCurrency");
}
function DeleteCurrency() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/DeleteCurrency",
        data: "{ " +
            "'currency_id':'" + $("#tb_id").val() + "' " +
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

//#endregion

//#region Load Record
function GetCurrency(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetCurrency",
        data: "{ " +
            "'currency_id':'" + id + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $("#tb_id").val(data.d["CurrencyID"]);

                $("#tab_detail_header").html(data.d["CurrencyName"]);
                $("#tb_currencyname").val(data.d["CurrencyName"]);
                $("#tb_currencycode").val(data.d["CurrencyCode"]);
                if (data.d['DefaultCurrency'] == true)
                    $("#cb_defaultcur").prop("checked", true);
                else
                    $("#cb_defaultcur").prop("checked", false);
                $("#tb_remark").val(data.d["Remark"]);
                $("#lbl_created").text("Created By : " + data.d["CreatedByUserCode"] + " on " + JsonDateToFormat(data.d["CreatedOn"], 'DD/MM/YYYY HH:mm'));
                $("#lbl_modified").text("Modified By : " + data.d["ModifiedByUserCode"] + " on " + JsonDateToFormat(data.d["ModifiedOn"], 'DD/MM/YYYY HH:mm'));
               
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
//#endregion


Load_User_List();
//#region Users
function Load_User_List() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_User.asmx/GetAllUser",
        data: "{" +
            "'search_text':'" + "" + "'" +
            ",'org_id':'" + get_current_user_org_id()+ "'" +
            ",'RequestID':'" + get_current_user_id() + "'" +
            "}",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                $("#ddl_saleperson1").empty();
                $("#ddl_saleperson2").empty();
                $("#ddl_saleperson1").append("<option value=''>" + "Choose Sale Person 1" + "</option>");
                $("#ddl_saleperson2").append("<option value=''>" + "Choose Sale Person2" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_saleperson1").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option");
                    $("#ddl_saleperson2").append("<option value=" + data.d[key]['UserID'] + ">" + data.d[key]['UserName'] + "</option>");
                });
                $("#ddl_saleperson1").chosen().change();
                $("#ddl_saleperson2").chosen().change();
                $("#ddl_saleperson1_chosen").css({ "width": "100%" });
                $("#ddl_saleperson2_chosen").css({ "width": "100%" });
                if ($('#hf_sale1id').val() != "") {
                    $('#ddl_saleperson1').val($('#hf_sale1id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_sale1id').val("");
                    $('#ddl_saleperson1').val("").trigger("chosen:updated");
                }
                if ($('#hf_sale2id').val() != "") {
                    $('#ddl_saleperson2').val($('#hf_sale2id').val()).trigger("chosen:updated");
                }
                else {
                    $('#hf_sale2id').val("");
                    $('#ddl_saleperson2').val("").trigger("chosen:updated");
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
        url: baseUrl() + "WebServices/WebService_Currency.asmx/GetAllCurrencyJSON",
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
        keyExpr: "CurrencyID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Currency",
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
                GoCurrencyDetail(data.CurrencyID);
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
            dataField: "CurrencyCode",
            caption: "Currency Code",
        },
        {
            dataField: "CurrencyName",
            caption: "Currency Name",

        },
        {
            dataField: "DefaultCurrency",
            caption: "Default Currency",
            allowHeaderFiltering: false
        },
    ];
}

function GoCurrencyDetail(id) {
    GotoPage('Portal/currencys?id=' + id);


}


