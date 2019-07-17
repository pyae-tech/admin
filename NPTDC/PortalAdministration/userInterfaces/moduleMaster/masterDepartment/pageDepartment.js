$('title').html(get_current_organization_title() + "Departments");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_department').addClass('active-link');

$("#tab-main").tabs();

var user_Control = [];
user_Control = JSON.parse(localStorage.getItem('UserControl'));
if (user_Control != null) {
    if (user_Control.AllowCreate) {
        $(".usercontrol_create").css("display", "block");
    }
    if (user_Control.AllowDelete) {
        $(".usercontrol_delete").css("display", "block");
    }
   
};


$('#tb_search_text').keyup(function (e) {
    Load_List();
});


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_List();






function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Department.asmx/GetAllDepartmentJSON",
        data: "{ " +
            "'RequestID':'" + get_current_user_id() + "' " +
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
        rowAlternationEnabled: true,
        showRowLines: true,
        loadPanel: {
            enabled: true
        },   
        showBorders: true,
        focusedRowEnabled: true,
        keyExpr: "DepartmentID",
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
        height: 700,
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
                GoDepartmentDetail(data.DepartmentID);
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
            dataField: "DepartmentName",
            caption: "ဌာန အမည်",
            cssClass: 'cls',
        },
        {
            dataField: "NotifyEmail",
            caption: "အီးမေး(လ်)",
            cssClass: 'cls',

        },
        {
            dataField: "Protocol",
            caption: "Protocol",
            cssClass: 'cls',
        },
        {
            dataField: "Description",
            caption: "အကြောင်းအရာ",
            allowHeaderFiltering: false,
             cssClass: 'cls',
        },
    ];
}

function GoDepartmentDetail(id) {
    GotoPage('Portal/departmentdetail?id=' + id);


}

