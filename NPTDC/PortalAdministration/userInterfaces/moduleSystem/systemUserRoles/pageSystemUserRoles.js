$('title').html(get_current_organization_title() + "System Roles");

$('#menu_system').addClass('active-sub');
$('#menu_system_group').addClass('in');
$('#menu_system_role').addClass('active-link');


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
Load_List();

function Load_List() {
    $('#panel_list_background').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_UserRole.asmx/GetAllUserRoleJSON",
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
        showBorders: true,
        rowAlternationEnabled: true,
        showRowLines: true,
        focusedRowEnabled: true,
        loadPanel: {
            enabled: true
        },
        keyExpr: "RoleID",
        selection: {
            mode: "single"
        },
        "export": {
            enabled: true,
            fileName: "User Role",
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
                GoUserRole(data.RoleID);
            }
        }
    }).dxDataGrid("instance");
    $("#autoExpand").dxCheckBox({
        value: true,
        text: "Expand All Groups",
        onValueChanged: function (data) {
            dataGrid.option("grouping.autoExpandAll", data.value);
            dataGrid.clearSelection();
        }
    });
}
var Columns = [];
function Build_ColumnHeader() {
    Columns = [
        {
            dataField: "RoleName",
            caption: "သုံးစွဲခွင့် အမည်",
            cssClass: 'cls',
        },
        {
            dataField: "RoleCode",
            caption: "ကုဒ်နံပါတ်",
            cssClass: 'cls',

        },

    ];
}

function GoUserRole(id) {
    GotoPage('Portal/roledetail?id=' + id);
}






