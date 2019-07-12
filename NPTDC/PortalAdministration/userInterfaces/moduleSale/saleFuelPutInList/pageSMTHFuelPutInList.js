$('title').html(get_current_organization_title() + "Fueling Put In");


$('#menu_sale').addClass('active-sub');
$('#menu_customer_group').addClass('in');
$('#menu_').addClass('active-link');

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
    getSMTHFuelPutInList();
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
    getSMTHFuelPutInList();
    }
});

Load_Group_Name();



function Load_Group_Name() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_CustomerGroup.asmx/GetAllCustomerGroupJson",
        data: JSON.stringify({
            search_text: $("#tb_search_text").val(),
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                var result = JSON.parse(data.d);
                $("#lookup").dxLookup({
                    items: result,
                    showClearButton: true,
                    valueExpr: 'CustomerGroupID',
                    displayExpr: function (item) {
                        if (!item) {
                            return "";
                        }

                        return item.GroupName ;
                    },
                    placeholder: "Select CustomerGroup",
                    
                    showPopupTitle: false,
                    onValueChanged: function (e) {
                        if (e.value === "null" || e.value == null) {
                            getSMTHFuelPutInList();
                        }
                        else {
                            getSMTHFuelPutInList('search');
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


var Columns = [];
function Build_ColumnHeader() {
  
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
                    "SiteCode",
                    {
                        dataField: "FuelLBefore",
                        caption: "Before(L)",
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "FuelPercentBefore",
                        caption: "Before(%)",
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "FuelLAfter",
                        caption: "After(L)",
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "FuelPercentAfter",
                        caption: "After(%)",
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "FilledFuelL",
                        caption: "Filled(L)",
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "PricePerLiter",
                        caption: "Price Per Liter",
                        allowHeaderFiltering: false,
                        format: {
                            type: "fixedPoint",
                            precision: 0
                        }
                    },
                    {
                        dataField: "FuelCharges",
                        caption: "Fuel Charges",
                        format: {
                            type: "fixedPoint",
                            precision: 0
                        },
                        allowHeaderFiltering: false
                    },
                    {
                        dataField: "Total",
                        caption: "Total",
                        format: {
                            type: "fixedPoint",
                            precision: 0
                        },
                        allowHeaderFiltering: false
                    },
                    "TowerType"
                ];
                

            }   


function getSMTHFuelPutInList(status) {
    var sh_Group_list = "";
    if (status == "search") {
     
        sh_Group_list = $("#lookup").dxLookup("instance").option('value');
    }

    Pace.start();
    $.ajax({      
        url: baseUrl() + "WebServices/WebService_Service.asmx/getSMTHFuelPutInList",
        data: "{ " +
            "'startDate':'" + $("#tb_search_from_date").val() + "' " +
            ",'endDate':'" + $("#tb_search_to_date").val() + "' " +
            ",'CustomerGroupID':'" + sh_Group_list + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
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
            fileName: "FuelPutIn",
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
            allowedPageSizes: [10, 20, 30, 40],
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
    GotoPage('Portal/service?id=' + id);
}

function do_get_data(result) {
    var sh_Group_id = $("#lookup").dxLookup("instance").option('value');
    var last_search =
        $('#tb_search_from_date').val() + "~" +  //0
        $('#tb_search_to_date').val() + "~" +  //1
        sh_Group_id+"~"+
        get_current_user_org_id();//4


    $.cookie('pageSMTHFuelPutInList', last_search, { expires: 1, path: '/' });
    localStorage.setItem('SMTH_service_table_data', JSON.stringify(result));
}
function restore_search() {
   
    if ($.cookie('pageSMTHFuelPutInList') != '' && $.cookie('pageSMTHFuelPutInList') != undefined) {
        var search_values = $.cookie('pageSMTHFuelPutInList').split('~');
        $('#tb_search_from_date').val(search_values[0]);
        $('#tb_search_from_date').periodpicker('change');
        $('#tb_search_to_date').val(search_values[1]);
        $('#tb_search_to_date').periodpicker('change');
        group_id = search_values[2];
        $("#lookup").dxLookup('instance').option('value', group_id);
       
        BindTable(JSON.parse(localStorage.getItem('SMTH_service_table_data')));
       
        

    }
    else {
       
        getSMTHFuelPutInList();
    }
}
function ShowReport() {
    var report_search =
        $('#tb_search_from_date').val() + "~" +  //0
        $('#tb_search_to_date').val() + "~" +  //1
        //$('#ddl_customergroup').val() + "~" +//2
        get_current_user_org_id() + "~" +
        "" + "~" +//3
        "AutoFire";
    $.cookie('report_fuelingputin', report_search, { expires: 1, path: '/' });
    GotoPage('Portal/fuelingPutInReport');
    }