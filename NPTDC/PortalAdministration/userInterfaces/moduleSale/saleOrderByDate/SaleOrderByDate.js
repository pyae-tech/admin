$('title').html(get_current_organization_title() + "SaleOrderByDate");

$('#menu_salevan').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_OrderByDate').addClass('active-link');

$("#tb_search_from_date").val(moment(new Date()).format('YYYY/MM/DD'));
$('#tb_search_from_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        GetOrderByDate1();
    }
});
$("#tb_search_from_date").val(moment(new Date()).format('YYYY/MM/DD'));
var orgid = get_current_user_org_id();
$("[id$=tb_orgid]").val(orgid);

Load_Route_List();
Load_Customer_List();




//GetOrderByDate();

function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[0], parts[1] - 1, parts[2]);
}
function change_date(status) {
    if (status == 'next') {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).add(1, 'day').format('YYYY/MM/DD');
    }
    else {
        newfromdate = moment(toDate($("#tb_search_from_date").val())).subtract(1, 'day').format('YYYY/MM/DD');
    }
    $('#tb_search_from_date').val(newfromdate);
    $('#tb_search_from_date').periodpicker('change');
    GetOrderByDate1();
    // GetOrderByDate();
}




function GetOrderByDate() {
    $('#div_result').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/GetOrderByDate",
        data: "{ " +
            "'selected_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'orgid':'" + get_current_user_org_id() + "' " +
            ",'routeid':'" + $("#tb_route").val() + "' " +
            ",'customer_id':'" + $("#tb_customer_name").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {

                $('#div_result').html(data.d);
                $('[id$=tb_selecteddate]').val($("#tb_search_from_date").val());
                $('[id$=tb_routeid]').val($("#tb_route").val());
                $('[id$=tb_customerid]').val($("#tb_customer_name").val());
                // $('[id$=tb_orgid]').val(orgid);

                ShowSuccessMessage("Loaded.");

            } else {
                ShowBoxMessage("Oops, we can't find the record. ");
            }
            $('#div_result').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#div_result').loading('stop');
        }
    });
}

function Load_Route_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRouteOrderRoute",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_route").empty();
                $("#tb_route").append("<option value=''>" + "Choose Route" + "</option>");
                $.each(data.d, function (key, val) {
                    $("#tb_route").append("<option value=" + data.d[key]['RouteID'] + ">" + data.d[key]['RouteName'] + "</option>")

                });
                $('#tb_route').chosen().change();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function Load_Customer_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllCustomers",
        data: "{ " +
            "'search_text':'" + "" + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_customer_name").empty();
                $("#tb_customer_name").append("<option value=''>" + "Choose Customer" + "</option>");
                $.each(data.d, function (key, val) {
                    var name = data.d[key]['CustomerNameEng'] == "" ? data.d[key]['CustomerNameZawgyi'] : data.d[key]['CustomerNameEng']
                    $("#tb_customer_name").append("<option value=" + data.d[key]['CustomerID'] + ">" + name + "</option>");

                });
                $('#tb_customer_name').chosen().change();
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function test() {

    $("[id$=tb_orgid]").val(get_current_user_org_id());


    var last_search =
        get_current_user_org_id() + "~" +  //0
        $('#tb_search_from_date').val() + "~" + //1
        $("#tb_customer_name").val() + "~" + //2
        $('#tb_route').val();

    $.cookie('saleorderByDate', last_search, { expires: 1, path: '/' });
    $('[id$=hf_selected_value]').val(last_search);
}

restore_search();
function restore_search() {
    if ($.cookie('saleorderByDate') != '' && $.cookie('saleorderByDate') != undefined) {
        var search_values = $.cookie('saleorderByDate').split('~');
        $('#tb_search_from_date').val(search_values[1]);
        $('#tb_search_from_date').periodpicker('change');
        $("#tb_customer_name").val(search_values[2]);
        $('#tb_customer_name').val(search_values[2]).trigger("chosen:updated");
        $('#tb_route').val(search_values[3]);
        $('#tb_route').val(search_values[3]).trigger("chosen:updated");
    }
}

function SelectChange() {
    GetOrderByDate1();
    // GetOrderByDate();
}


function GetOrderByDate1() {
    $('#My_room').loading();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/GetOrderByDate1",
        data: "{ " +
            "'selected_date':'" + $("#tb_search_from_date").val() + "' " +
            ",'orgid':'" + get_current_user_org_id() + "' " +
            ",'routeid':'" + $("#tb_route").val() + "' " +
            ",'customer_id':'" + $("#tb_customer_name").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            if (data.d != null) {
                //  $('#example').clear().draw();
                //var datatable = $('#example').DataTable();
                //datatable.clear().draw();
                //datatable.rows.add(NewlyCreatedData); // Add new data
                //datatable.columns.adjust().draw();
                bindTable(data.d);

                ShowSuccessMessage("Loaded.");

            } else {
                ShowBoxMessage("Oops, we can't find the record. ");
            }
            $('#My_room').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#My_room').loading('stop');
        }
    });
}
table_name = "";
running_no = 0;
function bindTable(data) {
    var HeadersData = data.splice(0, 1);
    var dataSet = data;
    $('#My_room').html("");

    table_name = "my_table_" + running_no;
    $('#My_room').html('<table id="' + table_name + '" class="table table-striped table-bordered" cellspacing="0" width="100%"></table>');

    running_no = running_no + 1;


    $('#img_no_data').show();
    if (data.length != 0) {

        $('#img_no_data').hide();
        table = $('#' + table_name).DataTable({
            paging: false,
            data: dataSet,
            columns: HeadersData[0],
            // scrollY: "300px",
            scrollX: true,
            // scrollCollapse: true,
            fixedColumns: {
                leftColumns: 1,
                // rightColumns: 1
            }
        });

        //$('#example').DataTable({

        //    data: dataSet,
        //    columns: HeadersData[0]
        //});
    }

}

