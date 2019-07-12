$('title').html(get_current_organization_title() +  " Sale Orders");

$('#menu_sale').addClass('active-sub');
$('#menu_sale_group').addClass('in');
$('#menu_sale_SaleOrder').addClass('active-link');


$("#tab-main").tabs();


$('#tb_search_text').keyup(function (e) {
    Load_List();
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
        Load_List();
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
        Load_List();
    }
});
$("#btn_search_all_dates").change(function () {

    Load_List();
});
Load_List();
 


function Load_List() {
    Pace.start();
    $.ajax({ 
        //GetAllByDate(string from_date, string to_date, string search_all_date, string search_text,
        //string search_order, string customer_id, string RequestID, string PageNoString)
        url: baseUrl() + "WebServices/WebService_Order.asmx/GetAllByDate",
        data: "{ " + 
              "'from_date':'" + $("#tb_search_from_date").val() + "' " +
              ",'to_date':'" + $("#tb_search_to_date").val() + "' " +
              ",'search_all_date':'" + $("#btn_search_all_dates").is(":checked") + "' " +
              ",'search_text':'" + $("#tb_search_text").val() + "' " +
             ",'search_order':'" + $("#tb_search").val() + "' " +
             ",'customer_id':'" +"" + "' " +
              ",'RequestID':'" + get_current_user_id() + "' " +  
              ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_list(data.d);
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
    var total_amount = 0;

    $.each(records, function (key, val) {
        rowindex++;
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
            status_color = "label-warning";
            if (records[key]['OrderStatus'] == 'Order')
                status_color = "label-purple";
            else if (records[key]['OrderStatus'] == 'Completed')
                status_color = "label-primary";
            else if (records[key]['OrderStatus'] == 'New')
                status_color = "label-danger";
            
            the_template = $('#template_row').html();
            console.log(records); 
            allCardsCode += the_template.replace()
                .replace("[OrderID]", records[key]['OrderID'])
                .replace("[OrderNo]", records[key]['OrderNo'])
                .replace("[statusColor]", status_color)
                .replace("[OrderDate]", JsonDateToFormat(records[key]['OrderDate'], 'DD/MM/YYYY'))
                .replace("[CustomerNameEng]", records[key]['CustomerNameEng'])
                .replace("[OrderStatus]", records[key]['OrderStatus']);

             
        }

    });
    $('.total_record').html(rowindex - 1 + ' records');
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex - 1); 
    $('#table_list').empty();
    $('#table_list').append(allCardsCode);


    goToListTab();

}


 

function search() {
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}

function clearSearch() {
    $("#tb_search_text").val("");
    $("#tb_search").val("");
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}

function goToListTab() {
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
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
    Load_List();
}

function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));

    Load_List();
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_List();
}
 
 