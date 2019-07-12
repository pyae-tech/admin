$('title').html(get_current_organization_title() + "Services");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_ServiceFFS').addClass('active-link');


$("#tab-main").tabs();
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");



$('#tb_search_text').keyup(function (e) {
    getServiceList();
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
        getServiceList();
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
        getServiceList();
    }
});




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

$("#btn_search_all_dates").change(function () {
    getServiceList();
});




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
    getServiceList();
}

getServiceList();
function getServiceList() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Service.asmx/GetAllServiceJSON",
        data: "{ " +
            "'from_date':'" + $("#tb_search_from_date").val() + "' " +
           ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
            ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
            ",'search_text':'" + $("#tb_search_text").val() + "' " +
           ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindTable(data.d);
                //generate_list_Total(data.d);
                $('#panel_list_background').loading('stop');
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
 
function Build_ColumnHeader() {
    Columns = [
        {
            dataType: "date",
            format: 'dd-MM-yyyy',
            dataField: "ServiceDate",
            dataType: "date",
            format: 'dd-MM-yyyy',// provides values for editing
            calculateDisplayValue: function (rowData) { // combines display values
                return rowData.ServiceDate + " (" + rowData.StartOn  + " to " + rowData.EndOn+")";
            }
           
        },
        {
            dataField: "ServiceNo",
            caption: "Service No",
        },
        {
            dataField: "ServiceStatus",
            caption: "Service Status",
        },
        {
            dataField: "CustomerNameEng",
            caption: "Customer",
        },
        {
            dataField: "TotalAmount",
            caption: "Total",
            format: {
                type: "fixedPoint",
                precision: 0
            },
            allowHeaderFiltering: false

        },
        {
            dataField: "UserName",
            caption: "Service User",
        },
        {
            dataField: "AppStatus",
            caption: "Status",
            allowHeaderFiltering: false,
            cellTemplate: function (cellElement, cellInfo) {
                if (cellInfo.data.AppStatus === "Approved") {
                    $('<span class="label label-success">').text(cellInfo.data.AppStatus).appendTo(cellElement);
                }
                else if (cellInfo.data.AppStatus === "Rejected") {
                    $('<span class="label label-danger">').text(cellInfo.data.AppStatus).appendTo(cellElement);
                }
            }
        }

    ];
}

function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);
    var dataGrid = $("#gridContainer").dxDataGrid({
        dataSource: result,
        showBorders: true,
        keyExpr: "ServiceID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Service",
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
        summary: {
            totalItems: [{
                column: "TotalAmount",
                valueFormat: 'fixedPoint',
                precision: 0,
                summaryType: "sum",
               // displayFormat: "Sum :{0}",
               // showInGroupFooter: false,
                customizeText: function (data) {
                    return generate_list_Total(data);
                }
            },
                {
                    column: "TotalAmount",
                    valueFormat: 'fixedPoint',
                    precision: 0,
                    summaryType: "sum",
                    displayFormat: "Sum :{0}",
                    showInGroupFooter: true,
                }
            ]
        },
        onSelectionChanged: function (selectedItems) {
            var data = selectedItems.selectedRowsData[0];
            if (data) {
                GoService(data.ServiceID);
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


function GoService(id) {
    GotoPage('Portal/service?id=' + id);
}
//Approval
function Add_Instant_Decision_Completed() {
    getServiceList();
}

function generate_list_Total(records) {
    $('.list_total_amount').html(" : " + NumberWithCommas(records.value) + " MMK");




}

