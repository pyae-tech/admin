$('title').html(get_current_organization_title() + "Agenda");

$('#menu_request').addClass('active-sub');
$('#menu_meeting_group').addClass('in');
$('#menu_agenda').addClass('active-link');
$("#tab-main").tabs();

getRequestList();
function getRequestList() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Agenda.asmx/GetAllAgendaJSON",
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
            dataField: "AgendaNo",
            caption: "အမှတ်စဉ်",
            cssClass: 'cls',
        },
        {
            dataField: "AgendaStatus",
            caption: "အခြေအနေ",
            cssClass: 'cls',
        },
        {
            dataField: "AgendaDate",
            caption: "တင်ပြချိန်",
            dataType: "date",
            format: 'dd-MM-yyyy',
            cssClass: 'cls',
        }
    ];
}

function BindTable(data) {
    Build_ColumnHeader();
    var result = JSON.parse(data);

    var dataGrid = $("#gc_agendaList").dxDataGrid({
        dataSource: result,
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true,
        height: 500,
        loadPanel: {
            enabled: true
        },
        keyExpr: "AgendaID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "Agendas",
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
                GetAgenda(data.AgendaID);
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

function GetAgenda(id) {
    window.open('agenda?id=' + id, '_blank');
}
function NewAgenda() {
    window.open('agenda?id=', '_blank');
}