$('title').html(get_current_CusGp_organization_title() + "Fueling PutIn");


$('#menu_sale').addClass('active-sub');
$('#menu_customer_group').addClass('in');
$('#menu_customergroupFuelPutIn').addClass('active-link');

$("#tab-main").tabs();
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
    getMyTelFuelPutInList();
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
    getMyTelFuelPutInList();
    }
});

Load_CustomerGroup();

Build_ColumnHeader();


var parent_child_customergroup = "";

function Load_CustomerGroup() {
    parent_child_customergroup = get_current_CustomerGroupIDs() + get_current_CustomerGroup_id();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_CustomerGroupLogin.asmx/GetAllCustomerGroupNameJson",
        data: JSON.stringify({
            CustomerGroupID: parent_child_customergroup,
            RequestID: get_current_Created_User_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#lookup_groupname").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'CustomerGroupID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }
                        return item.GroupName;
                    },
                    placeholder: "Select CustomerGroup",
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value === null) {
                            getMyTelFuelPutInList();
                        }
                        else {
                            getMyTelFuelPutInList('search');
                        }
                    }

                });
                restore_search();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

var allowed_menus = [];
var Columns = [];
function Build_ColumnHeader() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_CustomerGroupLogin.asmx/GetAllowedApproveGpUsersByGPID",
        data: "{ " +
            "'CustomerGroupID':'" + get_current_CustomerGroup_id() + "' " +
            ",'RequestID':'" + get_current_Created_User_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                Columns = [
                    {
                        caption: "No",
                        dataField: "No",
                        allowHeaderFiltering: false
                    },
                    {
                        caption: "Date",
                        dataField: "ServiceDate",
                        dataType: "date",
                        format: 'dd-MM-yyyy'
                    },
                    "SiteCode"];
               if (get_current_AllowedMenus() !== "" || get_current_AllowedMenus() !== null) {
                    allowed_menus = get_current_AllowedMenus().split(',');
                    for (i = 0; i < allowed_menus.length; i++) {
                        switch (allowed_menus[i]) {

                            case "fLBefore":                              
                                Columns.push({
                                    dataField: "FuelLBefore",
                                    caption: "Before(L)",
                                    allowHeaderFiltering: false
                                });
                                
                                break;

                            case "fPBefore":
                                Columns.push({
                                    dataField: "FuelPercentBefore",
                                    caption: "Before(%)",
                                    allowHeaderFiltering: false
                                });
                                 break;

                            case "fLAfter":                              
                                Columns.push({
                                    dataField: "FuelLAfter",
                                    caption: "After(L)",
                                    allowHeaderFiltering: false
                                });
                                break;

                            case "fPAfter":
                              
                                Columns.push({
                                    dataField: "FuelPercentAfter",
                                    caption: "After(%)",
                                    allowHeaderFiltering: false
                                });
                                break;

                            case "ff":
                             Columns.push({
                                    dataField: "FilledFuelL",
                                 caption: "Filled(L)",
                                 allowHeaderFiltering: false
                                });
                                break;

                            case "ppLiter":                                
                                Columns.push({
                                    dataField: "PricePerLiter",
                                    caption: "Price Per Liter",
                                    allowHeaderFiltering: false,
                                    format: {
                                        type: "fixedPoint",
                                        precision: 0
                                    }
                                });
                                break;

                            case "CF":                               
                                Columns.push({
                                    dataField: "FuelCharges",
                                    caption: "Fuel Charges",
                                    format: {
                                        type: "fixedPoint",
                                        precision: 0
                                    },
                                    allowHeaderFiltering: false
                                });
                                break;

                            case "SC":                               
                                Columns.push({
                                    dataField: "ServiceCharge",
                                    caption: "Service Charges",
                                    format: {
                                        type: "fixedPoint",
                                        precision: 0
                                    },
                                    allowHeaderFiltering: false
                                });
                                 break;

                            case "total":                              
                                Columns.push({
                                    dataField: "Total",
                                    caption: "Total",
                                    format: {
                                        type: "fixedPoint",
                                        precision: 0
                                    },
                                    allowHeaderFiltering: false
                                });
                                break;

                            case "typeTower":
                                Columns.push("TowerType");
                                break;

                        }

                    }
                }
                Columns.push("SMTHStatus");  
               
               $.each(data.d, function (key, val) {
                  Columns.push(data.d[key]['LoginName']);   
                });
              
            }
            restore_search(); 
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}



function getMyTelFuelPutInList(status) {
    var mytel_Group_list = "";
    if (status == "search") {
        mytel_Group_list = $("#lookup_groupname").dxLookup("instance").option('value');
    }
    Pace.start();
    $.ajax({
       url: baseUrl() + "WebServices/WebService_Service.asmx/getMyTelFuelPutInList",
        data: "{ " +
            "'startDate':'" + $("#tb_search_from_date").val() + "' " +
            ",'endDate':'" + $("#tb_search_to_date").val() + "' " +
            ",'CustomerGroupLoginID':'" + get_current_CustomerGroupLoginID() + "' " +
            ",'CustomerGroupID':'" + mytel_Group_list + "' " +
            ",'orgID':'" + get_current_user_org_id() + "' " +
            ",'RequestID':'" + get_current_Created_User_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                BindTable(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function BindTable(data) {

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
            fileName: "FuelPutIn",
            allowExportSelectedData: false
        },
        //filterRow: {
        //    visible: true,
        //    applyFilter: "auto"
        //},
        headerFilter: {
            visible: true
        },
        hoverStateEnabled: true,
        paging: {
            pageSize: 20
        },
        pager: {
            showPageSizeSelector: true,
            allowedPageSizes: [10, 20,30,40],
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
    do_get_data(data);
}

function GoService(id) {
    GotoPage('Portal/customergroupservice?id=' + id);
}
function do_get_data(result) {
    var mytel_Group_id = $("#lookup_groupname").dxLookup('instance').option('value');
    var last_search =
        $('#tb_search_from_date').val() + "~" +  //0
        $('#tb_search_to_date').val() + "~" +  //1
        mytel_Group_id +"~"+
        get_current_user_org_id();//4


    $.cookie('pageFuelPutInList', last_search, { expires: 1, path: '/' });
    localStorage.setItem('service_table_data', JSON.stringify(result));
   
}

function restore_search() {
    if ($.cookie('pageFuelPutInList') != '' && $.cookie('pageFuelPutInList') != undefined) {
        var search_values = $.cookie('pageFuelPutInList').split('~');
        $('#tb_search_from_date').val(search_values[0]);
        $('#tb_search_from_date').periodpicker('change');
        $('#tb_search_to_date').val(search_values[1]);
        $('#tb_search_to_date').periodpicker('change');
        group_id = search_values[2];
        $("#lookup_groupname").dxLookup('instance').option('value', group_id);
        BindTable(JSON.parse(localStorage.getItem('service_table_data')));
    }
    else {
        getMyTelFuelPutInList();
    }
}
