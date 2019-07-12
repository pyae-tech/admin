
$('title').html(get_current_organization_title() + "Item Customer Price");

$('#menu_master').addClass('active-sub');
$('#menu_master_group').addClass('in');
$('#menu_master_CustomerGroupPricing').addClass('active-link');

$("#tab-main").tabs();

$('#tb_search_text').keyup(function (e) {
    Load_List();
});


$("#tab-main").tabs("option", "active", 0);
$(".tab-menu").removeClass("active");
$("#tab_list_menu").addClass("active");

function clearSearch() {

    $('#tb_search_text1').val('');
    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");
}


function search() {

    Load_List();
    $("#tab-main").tabs("option", "active", 0);
    $(".tab-menu").removeClass("active");
    $("#tab_list_menu").addClass("active");

}

Load_CustomerGroup();
function Load_CustomerGroup() {
    Pace.start();
    $.ajax({
        //search_text, string RequestID
        url: baseUrl() + "WebServices/WebService_CustomerGroup.asmx/GetAllCustomerGroup", 
        data: "{ " +
            "'search_text':'" + $("#tb_search_text").val() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_CustomerGrouplist(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

//#region ItemTypeList
LoadItemType();
function LoadItemType() {
    $.ajax({

        url: baseUrl() + "WebServices/WebService_ItemType.asmx/GetAllItemTypeWithPagination",
        data: "{ " +
            "'search_text':'" + $('#tb_search_text').val() + "' " +
            ",'search_itemgroup':'" + $('#tb_searchItemGroup').val()+ "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'pageNo':'" + $('#hf_current_page2').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                generate_item_type_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_item_type_list(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
        the_template = $('#template_row').html();



        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');
            $('#lbl_record_count2').html("Total Records : " + paginationInfos[0] + ", Page: ");
            $('#tb_current_page2').val(paginationInfos[2]);
            $('#lbl_page_count2').html(" of " + paginationInfos[1] + " pages");
            $('#hf_current_page2').val(paginationInfos[2]);
            $('#btn_pagination_next2').hide();
            $('#btn_pagination_previous2').hide();
            if (paginationInfos[4] == 'y') {
                $('#btn_pagination_next2').attr('actionPage', parseInt(paginationInfos[2]) + 1);
                $('#btn_pagination_next2').show();
            }
            if (paginationInfos[3] == 'y') {
                $('#btn_pagination_previous2').attr('actionPage', parseInt(paginationInfos[2]) - 1);
                $('#btn_pagination_previous2').show();
            }
        } else {
            the_template = $('#div_available_ItemType_template').html();


            allCardsCode += the_template.replace()
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[ItemTypeID]", records[key]['ItemTypeID'])
                .replace("[TypeName]", records[key]['TypeName']);
        }
        });

    $('.list_count').html(rowindex - 1);
    $('#div_available_customer').empty();
    $('#div_available_customer').append(allCardsCode);
}

//#endregion
$('#tb_searchItemsList').keyup(function (e) {
    CustomerGroup_click($("#tb_customerGroupID").val(),"", "");
});

$('#tb_searchItemGroup').keyup(function (e) {
    LoadItemType();
});

function generate_CustomerGrouplist(records) {
    var allCardsCode = '';
    rowindex = 0;

    $.each(records, function (key, val) {
        rowindex++;
       
        allCardsCode += "<a href='#' id='" + records[key]['CustomerGroupID']+"' onclick='CustomerGroup_click(\"" + records[key]['CustomerGroupID'] + "\",\"" + records[key]['GroupName'] + "\")'  class='list-group-item'><i class='demo-pli-folder-with-document icon-lg icon-fw'></i> " + records[key]['GroupName'] + "</a>";
     

    });
    $('.list_count').html(rowindex - 1);
    $('#div_customerGroup_list').empty();
    $('#div_customerGroup_list').append(allCardsCode);
}

function pageJump(control,count)//paginatin function
{
    if (count == 1) {
        $('#hf_current_page').val($(control).attr('actionPage'));
        CustomerGroup_click($("#tb_customerGroupID").val(), "","");
    }
    else {
        $('#hf_current_page2').val($(control).attr('actionPage'));
        LoadItemType();
    }
    
    
}
function pageJumpToThis(count)//paginatin function
{

    if (count == 1) {
        $('#hf_current_page').val($('.tb_current_page').val());
        Load_Item_List();
    }
    else {
        $('#hf_current_page2').val($(control).attr('actionPage'));
        LoadItemType();
    }
    
}

function CustomerGroup_click(CustomerGroupID, CustomerGroupName, ItemTypeID) {

    $(".list-group-item").removeClass("active");
    $("#tb_customerGroupID").val(CustomerGroupID);
    $("#item_Group_name").html(CustomerGroupName);
    var id = "#" + CustomerGroupID;
    $(id).addClass('active');

    Pace.start();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemCustomerPrice.asmx/GetItemCustomerPrice",
        data: "{ " +
            "'search_text':'" + $("#tb_searchItemsList").val() + "' " +
            ",'ItemTypeID':'" + ItemTypeID + "' " +
            ",'customergoupid':'" + CustomerGroupID + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            ",'PageNoString':'" + $('#hf_current_page').val() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {               
                generate_ItemPricelist(data.d);
               
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function generate_ItemPricelist(records) { 
    var allCardsCode = '';
    rowindex = 0;
    var label_class;
    var item_info;
    var status_label;
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
            the_template = $('#div_item_template').html();

            allCardsCode += the_template.replace() 
                .replace("[ItemID]", records[key]['ItemID'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemID]", records[key]['ItemID'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemCustomerID]", records[key]['ItemCustomerID'])
                .replace("[ItemPrice]", NumberWithCommas(records[key]['ItemPrice']))
                .replace("[CustomerGroupPrice]", records[key]['CustomerGroupPrice'] == null ? "0" : NumberWithCommas(records[key]['CustomerGroupPrice']))
                .replace("[CustomerGroupPrice]", records[key]['CustomerGroupPrice'] == null ? "0" : records[key]['CustomerGroupPrice'])
                .replace("[ItemName]", records[key]['ItemName']);


        }

    });
   
    $('.list_count').html(rowindex - 1);
    $('#item_price_list').empty();
    $('#item_price_list').append(allCardsCode);
}

function rowEdit(no) {
    var span_edit_id = "#sp_edit_price_" + no;
    var edit_id = "#bEdit_" + no;
    var text_id = "#tb_edit_price_" + no;
    var accept_id = "#bAcep_" + no;
    var cancel_id = "#bCanc_" + no;

    $(span_edit_id).css("display", "none");
    $(text_id).css("display", "block");
    $(text_id).focus();
    $(edit_id).css("display", "none");
    $(accept_id).css("display", "block");
    $(cancel_id).css("display", "block");  


}

function rowAcep(itemid, no) {
    var span_edit_id = "#sp_edit_price_" + no;
    var edit_id = "#bEdit_" + no;
    var text_id = "#tb_edit_price_" + no;
    var accept_id = "#bAcep_" + no;
    var cancel_id = "#bCanc_" + no;
    var ItemCustomerPriceId = "#tb_id_" + no;
    if ($(text_id).val() == 0) {
        if ($(ItemCustomerPriceId).val() != "" || $(ItemCustomerPriceId).val() != null) {
            DeleteItemCustomerPrice(ItemCustomerPriceId);
        }
    }
    else {
        saveItemCustomerPrice($(text_id).val(), itemid, ItemCustomerPriceId);
    }
    

    //$(span_edit_id).css("display", "block");
    //$(text_id).css("display", "none");
    //$(edit_id).css("display", "block");
    //$(accept_id).css("display", "none");
    //$(cancel_id).css("display", "none");  
}

function saveItemCustomerPrice(new_price, itemid, ItemCustomerPriceId) {
    
    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemCustomerPrice.asmx/SaveItemCustomerPrice",

        data: JSON.stringify({
            ItemCustomerID: $(ItemCustomerPriceId).val(),
                ItemID: itemid,
                 CustomerGroupID: $('#tb_customerGroupID').val(),
                SpecificPrice1: new_price,
            RequestID: get_current_user_id()
        }),
        // dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                ShowSuccessMessage("Saved.");
                CustomerGroup_click($('#tb_customerGroupID').val());
                scrollToDiv('#tab-main');

            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function DeleteItemCustomerPrice(ItemCustomerPriceId) {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_ItemCustomerPrice.asmx/DeleteItemCustomerPrice",

        data: JSON.stringify({
            ItemCustomerID: $(ItemCustomerPriceId).val(),
            RequestID: get_current_user_id()
        }),
        
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $('#tb_id').val(data.d.toString().split('~')[1]);
                CustomerGroup_click($('#tb_customerGroupID').val());
                ShowSuccessMessage("Saved.");
                scrollToDiv('#tab-main');

            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}

function rowCancel(no) {

    var span_edit_id = "#sp_edit_price_" + no;
    var edit_id = "#bEdit_" + no;
    var text_id = "#tb_edit_price_" + no;
    var accept_id = "#bAcep_" + no;
    var cancel_id = "#bCanc_" + no;

    $(span_edit_id).css("display", "block");
    $(text_id).css("display", "none");
    $(edit_id).css("display", "block");
    $(accept_id).css("display", "none");
    $(cancel_id).css("display", "none");  
}

function Search_Item_By_ItemGroup(id) {
   
    CustomerGroup_click($("#tb_customerGroupID").val(),"", id);
}
