$('title').html(get_current_organization_title() + "Ways");

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_WaySales').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
});


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");





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


Load_List();
//function Load_List() {
//    $('#panel_list_background').loading();
//    Pace.start();
//    $.ajax({

//        //GetAllAirLineWithPagination(string search_text, string RequestID, string pageNo)
//        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetAllWaysPagination",
//        data: "{ " +
//            "'search_text':'" + $("#tb_search_text").val() + "' " +
//            ",'search_way':'" + $("#tb_search").val() + "' " +
//            ",'from_date':'" + $("#tb_search_from_date").val() + "' " +
//            ",'RequestID':'" + get_current_user_id() + "' " +
//            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
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
//    var total_amount = 0;

//    $.each(records, function (key, val) {
//        rowindex++;
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

//            //console.log(records);
           
//            allCardsCode += the_template.replace()
//                .replace("[WayID]", records[key]['WayID'])
//                .replace("[WayDate]", JsonDateToFormat(records[key]['WayDate'], 'DD-MM-YYYY'))
//                .replace("[WayNo]", records[key]['WayNo'])
//                .replace("[CarNo]", records[key]['CarNo'] == null ? "" : records[key]['CarNo'])
//                .replace("[RouteName]", records[key]['RouteName'])
//                .replace("[Status]", records[key]['Status'])
//                .replace("[TotalCreditSale]", NumberWithCommas(records[key]['TotalCreditSale']))
//                .replace("[TotalCashSale]", NumberWithCommas(records[key]['TotalCashSale']))
//                .replace("[Balance]", NumberWithCommas(records[key]['Balance']))
//                .replace("[RouteID]", NumberWithCommas(records[key]['RouteID']));
               
//        }

//    });
//    $('.total_record').html(rowindex - 1 + ' records');
//    if (rowindex == 0) $('#panel_list').hide();
//    else {
//        $('#panel_list').show();
//    }

//    $('.list_count').html(rowindex - 1);
//  //  $('.list_total_amount').html(" : " + NumberWithCommas(total_amount) + " MMK");
//    $('#table_list').empty();
//    $('#table_list').append(allCardsCode);


  

//}
//function search() {
//    $("#tb_search_text").val();
//    $("#tb_search").val();
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}

//function clearSearch() {
//    $("#tb_search_text").val();
//    $("#tb_search").val();
//    Load_List();
//    $("#tab-main").tabs("option", "active", 0);
//    $(".tab-menu").removeClass("active");
//    $("#tab_list_menu").addClass("active");
//}



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

function GotoWayDetail(wayid, routeid)
{
    window.open('way?id=' + wayid + '&rid=' + routeid , '_blank');
}

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Ways.asmx/GetAllWaysJSON",
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'from_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
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
var Columns = [];
function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "WayDate",
            dataType: "date",
            format: 'dd-MM-yyyy',// provides values for editing
        },
        {
            dataField: "WayNo",
            caption: "Way No",
        },
        {
            dataField: "CarNo",
            caption: "Car No",
        },
        {
            dataField: "RouteName",
            caption: "Route Name",
        },
        {
            dataField: "Status",
            caption: "Status",
        },
        {
            dataField: "TotalCreditSale",
            caption: "Credit",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false

        },
        {
            dataField: "TotalCashSale",
            caption: "Cash",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false

        },
        {
            dataField: "Balance",
            caption: "Balance",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false

        },
       
        

    ];
}

function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "WayID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Ways",
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
        summary: {
            totalItems: [{
                column: "TotalAmount",
                valueFormat: 'fixedPoint',
                precision: 0,
                summaryType: "sum",
                displayFormat: "Sum :{0}",
                showInGroupFooter: true
            }]
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GotoWayDetail(data.WayID, data.RouteID);
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




