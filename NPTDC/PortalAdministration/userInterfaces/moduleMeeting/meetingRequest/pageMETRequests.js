$('title').html(get_current_organization_title() + "Request");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_request_letter').addClass('active-link');
$("#tab-main").tabs();

getRequestList();
function getRequestList() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Request.asmx/GetAllRequestJSON",
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
var Columns = [];
function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "RequestTitle",
            caption: "ခေါင်းစဉ်",
            cssClass: 'cls',
        },
        {
            dataField: "RequestType",
            caption: "အမျိုးအစား",
            cssClass: 'cls',
            width:130,
        },
        {
            dataField: "RequestStatus",
            caption: "Status",
            cssClass: 'cls',
            width: 130,
        },
        {
            dataField: "RequestOn",
            caption: "တင်ပြချိန်",
            dataType: "date",
            format: 'dd-MM-yyyy',
            cssClass: 'cls',
            width: 130,
        },
        {
            dataField: "RequestUserName",
            caption: "တင်ပြသူ",
            cssClass: 'cls',

        },
        {
            dataField: "DepartmentName",
            caption: "ဌာန",
            //allowHeaderFiltering: false,
            cssClass: 'cls',
        }
    ];
}

function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);

    var dataGrid = $("#gc_requestList").dxDataGrid({
        dataSource: result,
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true, 
        height: 500,
        loadPanel: {
            enabled: true
        },   
        keyExpr: "RequestID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Request",
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
                GetRequest(data.RequestID);
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

function GetRequest(id) {
    window.open('request?id=' + id, '_blank');
}
function NewRequest() {
    window.open('request?id=', '_blank');
}


function Refresh() {
    getRequestList();
}