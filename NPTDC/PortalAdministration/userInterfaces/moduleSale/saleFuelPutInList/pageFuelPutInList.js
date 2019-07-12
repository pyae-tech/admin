$('title').html(get_current_CusGp_organization_title() + "Fueling PutIn");

//$(document).ready(function () { alert("ready!");});

$('#menu_sale').addClass('active-sub');
$('#menu_customer_group').addClass('in');
$('#menu_customergroupFuelPutIn').addClass('active-link');

$('#backdetect').backDetect(function () {
    do_get_data();
    alert("Look forward to the future, not the past!");
});

//$(function () {
//    $(document).keydown(function (e) {
//        return (e.which || e.keyCode) != 116;
//    });
//}); 
//window.addEventListener('beforeunload', function (e) {
//    // Cancel the event
//    e.preventDefault();
//    // Chrome requires returnValue to be set
//    e.returnValue = '';
//});

$("#tab-main").tabs();
$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");
$('.sortable-table').tableSorter();


$("#tb_search_from_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#tb_search_from_date').periodpicker({

    norange: true,
    cells: [1, 1],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    formatDate: 'YYYY/MM/DD',
    onAfterHide: function () {
        Load_AllowedAproveGroupUser();
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
        Load_AllowedAproveGroupUser();
    }
});

//region CustomerGroup

Load_CustomerGroup();

Load_TypeofTower();

var parent_child_customergroup = "";

function Load_CustomerGroup() {
    parent_child_customergroup =  get_current_CustomerGroupIDs()+get_current_CustomerGroup_id();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_CustomerGroupLogin.asmx/GetAllCustomerGroupName",
        data: "{ " +
            "'CustomerGroupID':'" + parent_child_customergroup + "' " +
            ",'RequestID':'" + get_current_Created_User_id() + "' " +

            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_customergroup").empty();
                $("#ddl_customergroup").append("<option value=''>" + "Choose Group Name..." + "</option>");
                $.each(data.d, function (key, val) {
                    $("#ddl_customergroup").append("<option value=" + data.d[key]['CustomerGroupID'] + ">" + data.d[key]['GroupName'] + "</option>");
                });
                $('#ddl_customergroup').chosen().change();
                $("#ddl_customergroup_chosen").css({ "width": "100%" });
                if ($('#hf_customergroup').val() != "") {
                    $('#ddl_customergroup').val($('#hf_customergroup').val()).trigger("chosen:updated");
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
   
}
var towerList = [];
function Load_TypeofTower() {
    parent_child_customergroup = get_current_CustomerGroupIDs() + get_current_CustomerGroup_id();
    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Customer.asmx/GetAllCustomerByCusGroupIDs",
        data: "{ " +
            "'cusGpIDs':'" + parent_child_customergroup + "' " +
            ",'RequestID':'" + get_current_Created_User_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                $("#ddl_typeoftower").empty();
                $("#ddl_typeoftower").append("<option value=''>" + "Choose Tower Type..." + "</option>");
                $.each(data.d, function (key, val) {
                    towerList.push(data.d[key]['ShortCode1']);
                });
                var unique = towerList.filter(onlyUnique);
                if (unique != "") {

                    $("#ddl_typeoftower").empty();
                    $("#ddl_typeoftower").append("<option value=''>" + "Choose Tower Type..." + "</option>");
                    $.each(unique, function (key, val) {

                        if (unique[key] != "undefined") {
                            $("#ddl_typeoftower").append("<option value=" + unique[key] + ">" + unique[key] + "</option>");
                        }
                    });
                    $('#ddl_typeoftower').chosen().change();
                    $("#ddl_typeoftower_chosen").css({ "width": "100%" });
                    if ($('#hf_typeoftower').val() != "") {
                        $('#ddl_typeoftower').val($('#hf_typeoftower').val()).trigger("chosen:updated");
                    }
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }

    });
}
       

$("#ddl_customergroup").change(function () {
            Load_AllowedAproveGroupUser();
        });

$("#ddl_typeoftower").change(function () {
        Load_AllowedAproveGroupUser();
});

//if ($.cookie('RefleshEvent')) {

//    alert("Refload!");   //Reload 
//}
////else {
   restore_search();   // other event
//}


    var allowed_menus = [];
    function Load_AllowedAproveGroupUser() {
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
                    do_get_data();
                    //$("#panel_list>thead>tr").empty();
                    //$("#panel_list>thead>tr").append("<th id='No' data-translate=''>No</th>");
                    //$("#panel_list>thead>tr").append("<th id='Date' data-translate=''>Date</th>");
                    //$("#panel_list>thead>tr").append("<th id='SiteID' data-translate=''>Site ID</th>");
                    //$("#template_table>tbody>tr").empty();
                    //$("#template_table>tbody>tr").append("<td id='No' >[seq]</td>");
                    //$("#template_table>tbody>tr").append("<td id='Date' >[ServiceDate]</td>");
                    //$("#template_table>tbody>tr").append("<td id='SiteID' >[CustomerNameEng]</td>");
                    //if (get_current_AllowedMenus() !== "" || get_current_AllowedMenus() !== null) {
                    //    allowed_menus = get_current_AllowedMenus().split(',');
                    //    for (i = 0; i < allowed_menus.length; i++) {
                    //        switch (allowed_menus[i]) {

                    //            case "fLBefore":
                    //                $("#panel_list>thead>tr").append("<th id='Fuel(L)Before'><p style='writing - mode: vertical - rl; text - align: center;'>Fuel(L) Before</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='Fuel(L)Before' >[FuelAmountBefore_L]</td>");
                    //                break;

                    //            case "fPBefore":
                    //                $("#panel_list>thead>tr").append("<th id='Fuel(%)Before' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Fuel (%) Before</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='Fuel(%)Before' >[FuelAmountBefore_Percentage]</td>");
                    //                break;

                    //            case "fLAfter":
                    //                $("#panel_list>thead>tr").append("<th id='Fuel(L)After' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Fuel(L) After</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='Fuel(L)After' >[FuelAmountAfter_L]</td>");
                    //                break;

                    //            case "fPAfter":
                    //                $("#panel_list>thead>tr").append("<th id='Fuel(%)After' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Fuel (%) After</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='Fuel(%)After' >[FuelAmountAfter_Percentage]</td>");
                    //                break;

                    //            case "ff":
                    //                $("#panel_list>thead>tr").append("<th id='FilledFuel(L)' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Filled Fuel (L)</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='FilledFuel(L)' >[FuelAmountFillAmount]</td>");
                    //                break;

                    //            case "ppLiter":
                    //                $("#panel_list>thead>tr").append("<th id='PricePerLiter' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Price Per Liter</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='PricePerLiter' >[PriceLiter]</td>");
                    //                break;

                    //            case "CF":
                    //                $("#panel_list>thead>tr").append("<th id='ChargesofFuel' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Charges of Fuel</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='ChargesofFuel' >[ChargesOfFuel]</td>");
                    //                break;

                    //            case "SC":
                    //                $("#panel_list>thead>tr").append("<th id='ServiceCharge' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Service Charge</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='ServiceCharge' >[ServiceChargesAmount]</td>");
                    //                break;

                    //            case "total":
                    //                $("#panel_list>thead>tr").append("<th id='Total' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Total</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='Total' >[TotalAmount]</td>");
                    //                break;

                    //            case "typeTower":
                    //                $("#panel_list>thead>tr").append("<th id='TypeTower' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>Type of Tower</p></th>");
                    //                $("#template_table>tbody>tr").append("<td id='TypeTower' >[TypeOfTower]</td>");
                    //                break;

                    //        }

                    //    }
                    //}
                    //$("#panel_list>thead>tr").append("<th id='orgCode' data-translate=''>OrgCode/Status</th>");
                    //$("#template_table>tbody>tr").append("<td><span class='label' id='orgCode_[ServiceID]'></span></td>");


                    //#region testing
                    $("#panel_list>thead>tr").empty();
                    $("#panel_list>thead>tr").append("<th  class='no-sort' id='No' data-translate=''>&nbsp;&nbsp;No</th>");
                    $("#panel_list>thead>tr").append("<th class='is-date' id='Date' data-translate=''>&nbsp;&nbsp;&nbsp;Date</th>");
                    $("#panel_list>thead>tr").append("<th class='ascending' id='SiteID' data-translate=''>&nbsp;&nbsp;&nbsp;Site ID</th>");
                    $("#template_table>tbody>tr").empty();
                    $("#template_table>tbody>tr").append("<td class='indexed' id='No'><span>&nbsp;&nbsp;&nbsp;</span></td>");
                    $("#template_table>tbody>tr").append("<td id='Date' >[ServiceDate]</td>");
                    $("#template_table>tbody>tr").append("<td id='SiteID' >[CustomerNameEng]</td>");
                    if (get_current_AllowedMenus() !== "" || get_current_AllowedMenus() !== null) {
                        allowed_menus = get_current_AllowedMenus().split(',');
                        for (i = 0; i < allowed_menus.length; i++) {
                            switch (allowed_menus[i]) {

                                case "fLBefore":
                                    $("#panel_list>thead>tr").append("<th lass='is-number' id='Fuel(L)Before'><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Fuel(L) Before</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='Fuel(L)Before' >[FuelAmountBefore_L]</td>");
                                    break;

                                case "fPBefore":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='Fuel(%)Before' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Fuel (%) Before</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='Fuel(%)Before' >[FuelAmountBefore_Percentage]</td>");
                                    break;

                                case "fLAfter":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='Fuel(L)After' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Fuel(L) After</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='Fuel(L)After' >[FuelAmountAfter_L]</td>");
                                    break;

                                case "fPAfter":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='Fuel(%)After' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Fuel (%) After</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='Fuel(%)After' >[FuelAmountAfter_Percentage]</td>");
                                    break;

                                case "ff":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='FilledFuel(L)' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Filled Fuel (L)</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='FilledFuel(L)' >[FuelAmountFillAmount]</td>");
                                    break;

                                case "ppLiter":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='PricePerLiter' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Price Per Liter</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='PricePerLiter' >[PriceLiter]</td>");
                                    break;

                                case "CF":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='ChargesofFuel' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Charges of Fuel</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='ChargesofFuel' >[ChargesOfFuel]</td>");
                                    break;

                                case "SC":
                                    $("#panel_list>thead>tr").append("<th class='is-number' id='ServiceCharge' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Service Charge</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='ServiceCharge' >[ServiceChargesAmount]</td>");
                                    break;

                                case "total":
                                    $("#panel_list>thead>tr").append("<th id='Total' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Total</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='Total' >[TotalAmount]</td>");
                                    break;

                                case "typeTower":
                                    $("#panel_list>thead>tr").append("<th class='case-sensitive' id='TypeTower' data-translate=''><p style='writing - mode: vertical - rl; text - align: center;'>&nbsp;&nbsp;&nbsp;Type of Tower</p></th>");
                                    $("#template_table>tbody>tr").append("<td id='TypeTower' >[TypeOfTower]</td>");
                                    break;

                            }

                        }
                    }
                    $("#panel_list>thead>tr").append("<th id='orgCode' data-translate=''>&nbsp;&nbsp;&nbsp;OrgCode/Status</th>");
                    $("#template_table>tbody>tr").append("<td><span class='label' id='orgCode_[ServiceID]'></span></td>");

                    //#endregion
                }





                var index = 0;
                if (data.d != null) {
                    $.each(data.d, function (key, val) {
                        index++;
                        var th_value = "<th data-translate='' id='" + data.d[key]['CustomerGroupLoginID'] + "'>&nbsp;&nbsp;&nbsp;" + data.d[key]['LoginName'] + "</th> ";
                        $("#panel_list>thead>tr").append(th_value);
                        var id_name = data.d[key]['LoginName'] + "_" + index;
                        $("#template_table>tbody>tr").append("<td><span class='label' id='" + data.d[key]['LoginName'] + "_[ServiceID]'></span></td>");
                    });

                }
                GetFuelPutInByCustomerGroup(data.d);
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });

    }

    function GetFuelPutInByCustomerGroup(LoginNameList) {

        Pace.start();
        $.ajax({

            url: baseUrl() + "WebServices/WebService_Service.asmx/getFuelPutInByCustomerGroup",
            data: "{ " +
                "'startDate':'" + $("#tb_search_from_date").val() + "' " +
                ",'endDate':'" + $("#tb_search_to_date").val() + "' " +
                ",'searchtext':'" + $("#ddl_typeoftower").val() + "' " +
                ",'CustomerGroupLoginID':'" + get_current_CustomerGroupLoginID() + "' " +
                ",'CustomerGroupID':'" + $("#ddl_customergroup").val() + "' " +
                ",'orderby':'" + $("#ddl_orderby").val() + "' " +
                ",'orgID':'" + get_current_user_org_id() + "' " +
                ",'RequestID':'" + get_current_Created_User_id() + "' " +
                ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    generate_list(data.d, LoginNameList);
                    //Load_TypeofTower();
                }
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });
    }

    var serviceIDs = "";

    function generate_list(records, LoginNameList) {
        var allCardsCode = '';
        rowindex = 0;
        total_amount = 0;

        $.each(records, function (key, val) {
            //if (records.length > 1) {
            rowindex++;
            the_template = $('#template_row').html();

            if (rowindex == 1) {//paginatin function
                paginationInfos = records[key].split('~');
                $('.lbl_record_count').html("Total Records : " + paginationInfos[0] + ", Page: ");
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
                Load_CusGroupApprovals(records[key]['ServiceID']);
                the_template = $('#template_row').html();

                if (records[key]['AppStatus'] == "Approved")
                    status = '<span class="label label-success">' + records[key]['OrgCode'] + '/Approved</span>';
                else if (records[key]['AppStatus'] == "Rejected") status = '<span class="label label-danger">' + records[key]['OrgCode'] + '/Rejected</span>';
                else status = "";

                serviceIDs += records[key]['ServiceID'] + ",";

                //  if (LoginNameList != null) {
                //  $.each(LoginNameList, function (key, val) {
                the_template = replaceAll(the_template, "[ServiceID]", records[key]['ServiceID']);
                // });
                //  }
                allCardsCode += the_template.replace()
                    // .replace("[ServiceID]", records[key]['ServiceID'])
                    //.replace("[ServiceID]", records[key]['ServiceID'])
                    //.replace("[seq]", records[key]['seq'])
                    // .replace("[ServiceID]", records[key]['ServiceID'])
                    .replace("[ServiceDate]", JsonDateToFormat(records[key]['ServiceDate'], 'DD-MM-YYYY'))
                    .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
                    .replace("[FuelAmountBefore_L]", records[key]['FuelAmountBefore_L'])
                    .replace("[FuelAmountBefore_Percentage]", records[key]['FuelAmountBefore_Percentage'] + " %")
                    .replace("[FuelAmountAfter_L]", records[key]['FuelAmountAfter_L'])
                    .replace("[FuelAmountAfter_Percentage]", records[key]['FuelAmountAfter_Percentage'] + " %")
                    .replace("[FuelAmountFillAmount]", records[key]['FuelAmountFillAmount'])
                    .replace("[PriceLiter]", records[key]['PriceLiter'])
                    .replace("[ServiceChargesAmount]", records[key]['ServiceChargesAmount'])
                    .replace("[ChargesOfFuel]", records[key]['ChargesOfFuel'])
                    .replace("[TypeOfTower]", records[key]['ShortCode1'])
                    //.replace("[Status]", status)

                    .replace("[TotalAmount]", records[key]['TotalAmount']);
            }
            //}

        });



        if (rowindex == 0) $('#panel_list').hide();
        else $('#panel_list').show();


        $('.list_count').html(rowindex - 1);
        $('#table_list').empty();
        $('#table_list').append(allCardsCode);

    }



    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    function replaceAll(str, term, replacement) {
        return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

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
        Load_AllowedAproveGroupUser();
    }

    function Load_CusGroupApprovals(serviceID) {
        Pace.start();
        $.ajax({

            url: baseUrl() + "WebServices/WebService_Approval.asmx/getApprovalListByID",
            data: "{ " +
                "'record_type':'" + "Service" + "' " +
                ",'record_id':'" + serviceID + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d != null) {
                    generate_CusGroupApprovals_list(data.d, serviceID);
                }
            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });
    }

    function generate_CusGroupApprovals_list(records, serviceID) {
        var allCardsCode = '';
        rowindex = 0;
        $.each(records, function (key, val) {

            if (records[key]['Ref_Type'] == "CusGroupUser") {
                if (records[key]['ResponseStatus'] == "Approved") {
                    $("#" + records[key]['RequestByCode'] + "_" + serviceID).addClass("label-success");
                    $("#" + records[key]['RequestByCode'] + "_" + serviceID).removeClass("label-danger");

                }
                else {
                    $("#" + records[key]['RequestByCode'] + "_" + serviceID).addClass("label-danger");
                    $("#" + records[key]['RequestByCode'] + "_" + serviceID).removeClass("label-success");
                }
                $("#" + records[key]['RequestByCode'] + "_" + serviceID).html(records[key]['ResponseStatus']);

            }
            else {
                if (records[key]['ResponseStatus'] == "Approved") {
                    $("#orgCode_" + serviceID).addClass("label-success");
                    $("#orgCode_" + serviceID).removeClass("label-danger");

                }
                else {
                    $("#orgCode_" + serviceID).addClass("label-danger");
                    $("#orgCode_" + serviceID).removeClass("label-success");
                }
                $("#orgCode_" + serviceID).html(records[key]['RequestByCode'] + "/" + records[key]['ResponseStatus']);


            }



        });
    }


    function pageJump(control)//paginatin function
    {
        $('#hf_current_page').val($(control).attr('actionPage'));
        Load_AllowedAproveGroupUser();
    }
    function pageJumpToThis()//paginatin function
    {
        $('#hf_current_page').val($('.tb_current_page').val());
        Load_AllowedAproveGroupUser();
    }

function do_get_data() {
    var last_search =
        $('#tb_search_from_date').val() + "~" +  //0
        $('#tb_search_to_date').val() + "~" +  //1
        $('#ddl_customergroup').val() + "~" +//2
        $('#ddl_typeoftower').val() + "~" +//3        
        get_current_user_org_id();//4


    $.cookie('pageFuelPutInList', last_search, { expires: 1, path: '/' });

}

function restore_search() {
    if ($.cookie('pageFuelPutInList') != '' && $.cookie('pageFuelPutInList') != undefined) {
        var search_values = $.cookie('pageFuelPutInList').split('~');
        $('#tb_search_from_date').val(search_values[0]);
        $('#tb_search_from_date').periodpicker('change');
        $('#tb_search_to_date').val(search_values[1]);
        $('#tb_search_to_date').periodpicker('change');
        $('#hf_customergroup').val(search_values[2].replace('"', ''));
        $('#ddl_customergroup').val($('#hf_customergroup').val()).trigger("chosen:Updated");
        if ($('#hf_customergroup').val() != "") {
            $('#ddl_customergroup').val($('#hf_billCustomer_id').val()).trigger("chosen:updated");
        }

        $('#hf_typeoftower').val(search_values[3].replace('"', ''));
        $('#ddl_typeoftower').val($('#hf_typeoftower').val()).trigger("chosen:Updated");
        if ($('#hf_typeoftower').val() != "") {
            $('#ddl_typeoftower').val($('#hf_typeoftower').val()).trigger("chosen:updated");
        }
      
    }
    Load_AllowedAproveGroupUser();
}

function GoService(id) {
    do_get_data();
    GotoPage('Portal/customergroupservice?id='+id);
}