$('title').html(get_current_organization_title() + "Way Detail");

$('#menu_sale').addClass('active-sub');
$('#menu_salevan_group').addClass('in');
$('#menu_salevan_RoutePlan').addClass('active-link');


$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_WayPlan_List();
});


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

Load_WayPlan_List();

//#region Listing
function clearSearch() {

    $('#tb_search_text1').val('');
    Load_WayPlan_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}


function search() {

    Load_WayPlan_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}


function Load_WayPlan_List() {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetAllRoute",
        data: "{ " +
        "'search_text':'" + $("#tb_search_text").val() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
                route_click(data.d[0].RouteID, data.d[0].OrgID);//For showing first page load
            }
            else {
                ShowErrorBoxMessage("Ways Need To Be Created.");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        allCardsCode += '        <a href="#" id="' + records[key]['RouteID'] + '"  onclick=route_click("' + records[key]['RouteID'] + '",\"' + records[key]['OrgID'] + '")  class="list-group-item node_way"><i class="ti-location-pin icon-lg icon-fw"></i> ' + records[key]['RouteName'] + '</a>'

    });
    $('.list_count').html(rowindex - 1);
    $('#div_way_list').empty();
    $('#div_way_list').append(allCardsCode);

}


function route_click(route_id, orgid, routecus_id) {
    $('#customer_routes').loading();
    Pace.start();
    $('.node_way').removeClass('active');
        var id = "#" + route_id;
        $(id).addClass('active');
    //}   
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/GetCustomersByRoute",
        data: "{ " +
        "'route_id':'" + route_id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                load_customerlist_byroute(data.d, routecus_id);
                Get_RouteIdName(route_id);
                //Load_available_customer_List(route_id, orgid);
                Load_Search_Customer_List();
            }
            $('#customer_routes').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#customer_routes').loading('stop');
        }
    });
}

function load_customerlist_byroute(records, routecus_id) {
    var allCusRoute = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;

        the_template = $('#div_customer_route_template').html();
        allCusRoute += the_template.replace()
            .replace("[no]", rowindex)
            .replace("[RouteCustomerID]", records[key]['RouteCustomerID'])
            .replace("[RouteCustomerID]", records[key]['RouteCustomerID'])
            .replace("[CustomerName]", records[key]['CustomerNameEng'] == "" ? records[key]['CustomerNameZawgyi'] : records[key]['CustomerNameEng'])
            .replace("[PhoneNo]", records[key]['PhoneNo'])
            .replace("[CustomerAddress]", records[key]['CustomerAddress'])
            .replace("[CustomerRemark]", records[key]['CustomerRemark']);
    });
    $('.list_count').html(rowindex - 1);
    $('#customer_routes').empty();
    $('#customer_routes').append(allCusRoute);
    if (routecus_id != "undefined") {
        $('#' + routecus_id).attr('checked', true);
    }
   
}

function Get_RouteIdName(id) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RoutePlan.asmx/GetRoute",
        data: "{ " +
        "'route_id':'" + id + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#tb_routeid").val(data.d["RouteID"]);
                $("#tb_orgid").val(data.d["OrgID"]);
                $("#tb_wayname").text(data.d["RouteName"]);
                $("#tb_waycustomers").text(data.d["RouteName"] + " Customers");
            }
            else {
                ShowBoxMessage("Oops, we can't find the Route. ");
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


//#endregion

//#region Available Customer List
//Load_available_customer_List();
function Load_available_customer_List(route_id, orgid) {
    $('#div_available_customer').loading();
    Pace.start();
    $.ajax({
        //search_text, string RequestID
        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAvailableWayCustomersList",
        data: "{ " +
        "'routeid':'" + route_id + "' " +
        ",'orgid':'" + orgid + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_available_customer_list(data.d);
            }
            $('#div_available_customer').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#div_available_customer').loading('stop');
        }
    });
}

//var temp_customer_right = [];

function generate_available_customer_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('.lbl_record_count').html("Total: " + paginationInfos[0] + ", Page: ");
            $('.tb_current_page').val(paginationInfos[2]);
            $('.lbl_page_count').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page').val(paginationInfos[2]);
            $('.btn_pagination_next').hide();
            $('.btn_pagination_previous').hide();
            if (paginationInfos[4] == 'y') {
                $('.btn_pagination_next').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('.btn_pagination_next').show();
            }
            if (paginationInfos[3] == 'y') {
                $('.btn_pagination_previous').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('.btn_pagination_previous').show();
            }
        } else {
            the_template = $('#div_available_customer_template').html();


            allCardsCode += the_template.replace()
                .replace("[CustomerID]", records[key]['CustomerID'])
                .replace("[CustomerID]", records[key]['CustomerID'])
                .replace("[CustomerID]", records[key]['CustomerID'])
                .replace("[CustomerID]", records[key]['CustomerID'])
                .replace("[CustomerName]", records[key]['CustomerNameEng'] == "" ? records[key]['CustomerNameZawgyi'] : records[key]['CustomerNameEng'])
                .replace("[PhoneNo]", records[key]['PhoneNo'])
                .replace("[Address]", records[key]['Address']);
        }
    });
    $('.list_count').html(rowindex - 1);
    $('#div_available_customer').empty();
    $('#div_available_customer').append(allCardsCode);

}
//#endregion


function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));
    Load_Search_Customer_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_Search_Customer_List();
}

//#endregion

function Add_Customer_To_Way() {
    var checkcount = 0;
    var customer_id = "";
    $('input:checkbox.available_customer:checked').each(function () {
        if (customer_id == '') {
            customer_id = $(this).attr('id');
        }
        else {
            customer_id = customer_id + ',' + $(this).attr('id');
        }
        checkcount = $('input:checkbox.available_customer:checked').length;
    });

    SaveRouteCustomer($("#tb_routeid").val(), $("#tb_orgid").val(), customer_id, get_current_user_id(), get_current_user_id(), checkcount);
}

function SaveRouteCustomer(route_id, orgid, customer_id, user_id, request_id, routecustomerseq) {

    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/SaveRouteCustomer",
        data: "{ " +
        "'route_id':'" + route_id + "' " +
        ",'customer_id':'" + customer_id + "' " +
        ",'user_id':'" + user_id + "' " +
        ",'RequestID':'" + request_id + "' " +
        ",'routecustomerseq':'" + routecustomerseq + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                route_click(route_id, orgid)
                Load_available_customer_List(route_id, orgid)
                ShowSuccessMessage("Added.");
                $("input:checkbox.available_customer").prop("checked", false);
            }
            else if (data.d.toString().split('~')[0] =="Already Exist"){
                ShowErrorBoxMessage("Oops. Already Exist");
                $("input:checkbox.available_customer").prop("checked", false);
            }
            
            else {
                ShowErrorBoxMessage("Oops. Something is wrong in adding Way Customers");
                $("input:checkbox.available_customer").prop("checked", false);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}


function Remove_Customer_From_Way() {
    var count = 0;
    $('input:checkbox.route_customers:checked').each(function () {
        count++;
      
    });
    if (count > 0) {
        ShowConfirmation("Are you sure you want to delete?", "ConfirmRemoveCustomers");
    }
      
}
var routecustomerids = "";
function ConfirmRemoveCustomers() {
    $('input:checkbox.route_customers:checked').each(function () {
        var routecustomer_id = $(this).attr('id');
        routecustomerids += routecustomer_id + ",";
       
    });
    DeleteRouteCustomer(routecustomerids, $("#tb_routeid").val(), get_current_user_id(), get_current_user_id(), $("#tb_orgid").val());
}

function DeleteRouteCustomer(routecustomerids, route_id, user_id, request_id, orgid) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/DeleteRouteCustomer",
        data: "{ " +
        "'routecustomer_id':'" + routecustomerids + "' " +
        ",'user_id':'" + user_id + "' " +
        ",'RequestID':'" + request_id + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {

                ShowSuccessMessage("Removed.");
                $("input:checkbox.route_customers").prop("checked", false);
                route_click(route_id, orgid);
               // Load_available_customer_List(route_id, orgid)
                Load_Search_Customer_List();
            }
            else {
                ShowBoxMessage("Oops, we can't remove. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

$('#tb_searchroutecustomers').keyup(function (e) {
    Load_RouteCustomer_List();
});

function Load_RouteCustomer_List() {
    Pace.start();
    $.ajax({

        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/GetRouteCustomersByRoute",
        data: "{ " +
        "'search_route_customer':'" + $("#tb_searchroutecustomers").val() + "' " +
        ",'route_id':'" + $("#tb_routeid").val() + "' " +
        ",'RequestID':'" + get_current_user_id() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                load_customerlist_byroute(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

$('#tb_searchcustomers').keyup(function (e) {
    Load_Search_Customer_List();
});

function Load_Search_Customer_List() {
    $('#div_available_customer').loading();
    Pace.start();
    $.ajax({
       //(string search_text, string search_customer, string RequestID, string )
        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllCustomerWithPagination",
        data: "{ " +
        "'search_text':'" + $("#tb_searchcustomers").val() + "' " +
        ",'search_customer':'" + "" + "' " +       
        ",'RequestID':'" + get_current_user_id() + "' " +
        ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_available_customer_list(data.d);
            }

            $('#div_available_customer').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#div_available_customer').loading('stop');
        }
    });
}


function Move_Up_Customer() {
    var moveupcount = 0;
    var routecus_id = "";
    $('input:checkbox.route_customers:checked').each(function () {
        if (routecus_id == '') {
            routecus_id = $(this).attr('id');
        }
        else {
            routecus_id = routecus_id + ',' + $(this).attr('id');
        }
        moveupcount = $('input:checkbox.route_customers:checked').length;
    });
    Move_Up_Customer_Seq(routecus_id, $("#tb_routeid").val(), $("#tb_orgid").val(), get_current_user_id(), moveupcount);
}


function Move_Up_Customer_Seq(routecus_id, route_id, orgid, request_id, moveupcount) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/MoveUpRouteCustomer",
        data: "{ " +
        "'routecus_id':'" + routecus_id + "' " +
        ",'routeid':'" + route_id + "' " +
        ",'orgid':'" + orgid + "' " +
        ",'moveupcount':'" + moveupcount + "'" +
        ",'RequestID':'" + request_id + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {               
                route_click(route_id, orgid, routecus_id);
               // Load_available_customer_List(route_id, orgid);                
                ShowSuccessMessage("Moved.");
               // $("input:checkbox.available_customer").prop("checked", false);
                $('#' + routecus_id).attr('checked', true); 
            }
            else {
                ShowBoxMessage("Oops. Something is wrong in Moving up Customers");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function Move_Down_Customer() {
    var movedowncount = 0;
    var routecus_id = "";
    $('input:checkbox.route_customers:checked').each(function () {
        if (routecus_id == '') {
            routecus_id = $(this).attr('id');
        }
        else {
            routecus_id = routecus_id + ',' + $(this).attr('id');
        }
        movedowncount = $('input:checkbox.route_customers:checked').length;
    });
    Move_Down_Customer_Seq(routecus_id, $("#tb_routeid").val(), $("#tb_orgid").val(), get_current_user_id(), movedowncount)
}


function Move_Down_Customer_Seq(routecus_id, route_id, orgid, request_id, movedowncount) {
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_RouteCustomer.asmx/MoveDownRouteCustomer",
        data: "{ " +
        "'routecus_id':'" + routecus_id + "' " +
        ",'routeid':'" + route_id + "' " +
        ",'orgid':'" + orgid + "' " +
        ",'movedowncount':'" + movedowncount + "' " +
        ",'RequestID':'" + request_id + "' " +
        " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $('#' + routecus_id).attr('checked', true);    
                route_click(route_id, orgid, routecus_id);
               // Load_available_customer_List(route_id, orgid);
                ShowSuccessMessage("Move Down.");
              //  $("input:checkbox.available_customer").prop("checked", false);
            }
            else {
                ShowBoxMessage("Oops. Something is wrong in Moving Down Customers");
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function CheckAll() {
    $('.route_customers').prop('checked', true);  
}
function UnCheckAll() {  
    $('.route_customers input').prop('checked', false);
    $('input:checkbox.route_customers:checked').each(function () {
        $(this).prop('checked', false);
    });
}

function CheckAllCustomer() {
    $('.available_customer').prop('checked', true); 
}
function UnCheckAllCustomer() {   
    $('.available_customer input').prop('checked', false);
    $('input:checkbox.available_customer:checked').each(function () {
        $(this).prop('checked', false);
    });
}
