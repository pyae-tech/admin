$('title').html(get_current_Customer_Name() + " | Sale Order");

$('#menu_sale').addClass('active-sub');
$('#menu_customer_group').addClass('in');
$('#menu_advanceSaleOrder').addClass('active-link');

//var hdnfldCustid = document.getElementById('');
//hdnfldCustid.value = ;
//var hdnfldRequestid = document.getElementById('');
//hdnfldRequestid.value = ;
$('[id$=hdnfldCustid]').val(get_current_Customer_id());
$('[id$=hdnfldRequestid]').val(get_current_user_id());
if (GetURLData('id') != null && GetURLData('id') != "") {
    $("#tb_orderid").val(GetURLData('id'));
    $('[id$=hdnfldOrderid]').val(GetURLData('id'));
   
  
    Load_Item_List("");
}

else { 
    LoadNew();
    //$("#hf_copylast").val("");
    //$("#copyLast").css("display", "none");
}
function pageJump(control)//paginatin function
{
    $('#hf_current_page').val($(control).attr('actionPage'));

    Load_Item_List("");
}
function pageJumpToThis()//paginatin function
{
    $('#hf_current_page').val($('.tb_current_page').val());
    Load_Item_List("");
}
  
$("#dtp_order_date").val(moment(new Date()).format('YYYY.MM.DD'));
$('#dtp_order_date').periodpicker({
    todayButton: true,
    norange: true,
    cells: [1, 2],
    okButton: false,
    hideOnBlur: true,
    hideAfterSelect: true,
    format: "DD/MM/YYYY",
    onAfterHide: function () { 
     generateDate(this.val());

    }

});
$('#dtp_order_date').periodpicker('change');
generateDate($('#dtp_order_date').val());

var oldOrderid = "";
var oldItemid = "";
function rowEdit(no,sid,eid,itemid) {

    //if ($("#tb_orderid").val() != "" && $("#tb_order_no").val() != "") {
    
    //var edit_id = "#bEdit_" + no;
    //var accept_id = "#bAcep_" + no;
    //var cancel_id = "#bCanc_" + no;

    //$('.ShowOrderQty_' + no).css("display", "none");
    //$('.editOrderQty_' + no).css("display", "block");

    //$(edit_id).css("display", "none");
    //$(accept_id).css("display", "block");
    //$(cancel_id).css("display", "block");
    ////}
    ////else {
    ////    ShowErrorBoxMessage("Please save the order first!");
    ////}
    //if (oldOrderid != "" && oldItemid != "") {
    //    add_order_item($(oldOrderid).val(), oldItemid, no);
    //}
    //oldItemid = itemid;
    //oldOrderid = "#tb_oritemid_"  + no;
    var spanID = sid + no;
    var editID = eid + no;
    $(spanID).css("display", "none");
    $(editID).css("display", "block");

}

function SaveOrderItemsVerification(no) {
    var error_count = 0;
    if ($("#tb_edit_monQty_" + no).val() == "" || $("#tb_edit_monQty_" + no).val() == "0") {
        error_count ++;
    }
    if ($("#tb_edit_tueQty_" + no).val() == "" || $("#tb_edit_tueQty_" + no).val() == "0") {
        error_count++;
    }
    if ($("#tb_edit_wedQty_" + no).val() == "" || $("#tb_edit_wedQty_" + no).val() == "0") {
        error_count++;
    }
    if ($("#tb_edit_thuQty_" + no).val() == "" || $("#tb_edit_thuQty_" + no).val() == "0") {
        error_count++;
    }
    if ($("#tb_edit_friQty_" + no).val() == "" || $("#tb_edit_friQty_" + no).val() == "0") {
        error_count++;
    } 
    if ($("#tb_edit_satQty_" + no).val() == "" || $("#tb_edit_satQty_" + no).val() == "0") {
        error_count++;
    }
    if ($("#tb_edit_sunQty_" + no).val() == "" || $("#tb_edit_sunQty_" + no).val() == "0") {
        error_count++;
    }
    if (error_count < 7) { return true; }
    else {        
        return false;
    }
}

function rowAcep(itemid, no) {
    //if (SaveOrderItemsVerification(no) == false) {
    //    if ($("#tb_oritemid_" + no).val() != "") {
    //        ShowConfirmation("Do you want to delete  this order item?", "DeleteRecord", $("#tb_oritemid_" + no).val());

    //    }
    //    rowCancel(no);
    //    return false;
    //}
    //else {
       // rowCancel(no);
        add_order_item($("#tb_oritemid_" + no).val(),itemid, no);
    //}   
}

function rowCancel(no) {

    var edit_id = "#bEdit_" + no;
    var accept_id = "#bAcep_" + no;
    var cancel_id = "#bCanc_" + no;

    //$(span_edit_id).css("display", "block");
    //$(text_id).css("display", "none");
    $('.ShowOrderQty_' + no).css("display", "block");
    $('.editOrderQty_' + no).css("display", "none");

    $(edit_id).css("display", "block");
    $(accept_id).css("display", "none");
    $(cancel_id).css("display", "none");
}
//#region load items

function Load_Item_List(status) {
    $('#item_price_list').loading();
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/GetAllAdvancedOrderItemsWithPagination",

        data: JSON.stringify({
            search_text: $('#tb_searchItemsList').val(),
            order_id: $('#tb_orderid').val(),
            customer_id: get_current_Customer_id(),
            isCopy: status,
            RequestID: get_current_user_id(),
            PageNoString: $('#hf_current_page').val()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data.d);
            if (data.d != null) {
                generate_list(data.d);
            }
            else {
                ShowBoxMessage("Oops. " + data.d.toString().split('~')[1]);
            }
            $('#item_price_list').loading('stop');
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);
            $('#item_price_list').loading('stop');
        }
    });
}

function generate_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    var item_info;
    arr_order_item = [];
    $.each(records, function (key, val) {
        rowindex++;
        if (rowindex == 1) {//paginatin function
            paginationInfos = records[key].split('~');

            if (paginationInfos.length > 5) {
                if (paginationInfos[5] != "") {
                    $("#tb_orderid").val(paginationInfos[5]);
                    $("#tb_order_no").val(paginationInfos[6]);
                    $("#dtp_order_date").val(moment(paginationInfos[9]).format('YYYY.MM.DD'));
                    $('#dtp_order_date').periodpicker({
                        todayButton: true,
                        norange: true,
                        cells: [1, 2],
                        okButton: false,
                        hideOnBlur: true,
                        hideAfterSelect: true
                    });
                    $('#dtp_order_date').periodpicker('change');
                    generateDate($('#dtp_order_date').val());
                    $("#ddl_status").val(paginationInfos[7]);
                    $("#tb_remark").val(paginationInfos[8]);
                }
               
                    if (paginationInfos[11]=="True") {
                        $(".MonHeader").css("background-color","#74deb769");
                    }
                    if (paginationInfos[12] == "True") {
                        $(".TueHeader").css("background-color", "#74deb769");
                    }
                    if (paginationInfos[13] == "True") {
                        $(".WedHeader").css("background-color", "#74deb769");
                    }
                    if (paginationInfos[14] == "True") {
                        $(".ThuHeader").css("background-color", "#74deb769");
                    }
                    if (paginationInfos[15] == "True") {
                        $(".FriHeader").css("background-color", "#74deb769");
                    }
                    if (paginationInfos[16] == "True") {
                        $(".SatHeader").css("background-color", "#74deb769");
                    }
                    if (paginationInfos[17] == "True") {
                        $(".SunHeader").css("background-color", "#74deb769");
                }
                if (paginationInfos[18] == 'NoOrder') { alert("There is no previous order.This is the first order!");}
               
                
            }
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


            // var src = records[key]['ImagePath'];
            var src = "/PortalAdministration/img/Item_Images/" + records[key]['ItemImage'];


            allCardsCode += the_template.replace()
                .replace("[ItemID1]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID2]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID3]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID4]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID5]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID6]", records[key]['ItemID'])//[ItemID

                .replace("[ItemID7]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID8]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID9]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID10]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID11]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID12]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID13]", records[key]['ItemID'])//[ItemID
                .replace("[ItemID14]", records[key]['ItemID'])//[ItemID


                .replace("[ItemNo]", records[key]['ItemNo'])
                .replace("[ItemType]", records[key]['ItemTypeName'])
                .replace("[ItemName]", records[key]['ItemName'])
                .replace("[ItemImage]", src)
                .replace("[ItemPrice]", NumberWithCommas(parseInt(records[key]['ItemPrice'])))
                .replace("[item-info]", item_info)

                .replace("[Mon_OrderQty]", records[key]['Mon_OrderQty'] == "" ? 0 : records[key]['Mon_OrderQty'])
                .replace("[Mon_OrderQty]", records[key]['Mon_OrderQty'] == "" ? 0 : records[key]['Mon_OrderQty'])

                .replace("[Tue_OrderQty]", records[key]['Tue_OrderQty'] == "" ? 0 : records[key]['Tue_OrderQty'])
                .replace("[Tue_OrderQty]", records[key]['Tue_OrderQty'] == "" ? 0 : records[key]['Tue_OrderQty'])

                .replace("[Wed_OrderQty]", records[key]['Wed_OrderQty'] == "" ? 0 : records[key]['Wed_OrderQty'])
                .replace("[Wed_OrderQty]", records[key]['Wed_OrderQty'] == "" ? 0 : records[key]['Wed_OrderQty'])

                .replace("[Thu_OrderQty]", records[key]['Thu_OrderQty'] == "" ? 0 : records[key]['Thu_OrderQty'])
                .replace("[Thu_OrderQty]", records[key]['Thu_OrderQty'] == "" ? 0 : records[key]['Thu_OrderQty'])

                .replace("[Fri_OrderQty]", records[key]['Fri_OrderQty'] == "" ? 0 : records[key]['Fri_OrderQty'])
                .replace("[Fri_OrderQty]", records[key]['Fri_OrderQty'] == "" ? 0 : records[key]['Fri_OrderQty'])

                .replace("[Sat_OrderQty]", records[key]['Sat_OrderQty'] == "" ? 0 : records[key]['Sat_OrderQty'])
                .replace("[Sat_OrderQty]", records[key]['Sat_OrderQty'] == "" ? 0 : records[key]['Sat_OrderQty'])

                .replace("[Sun_OrderQty]", records[key]['Sun_OrderQty'] == "" ? 0 : records[key]['Sun_OrderQty'])
                .replace("[Sun_OrderQty]", records[key]['Sun_OrderQty'] == "" ? 0 : records[key]['Sun_OrderQty'])

                .replace("[Mon_OrderQty]", records[key]['Mon_OrderQty'] == "" ? 0 : records[key]['Mon_OrderQty'])
                .replace("[Tue_OrderQty]", records[key]['Tue_OrderQty'] == "" ? 0 : records[key]['Tue_OrderQty'])
                .replace("[Wed_OrderQty]", records[key]['Wed_OrderQty'] == "" ? 0 : records[key]['Wed_OrderQty'])
                .replace("[Thu_OrderQty]", records[key]['Thu_OrderQty'] == "" ? 0 : records[key]['Thu_OrderQty'])
                .replace("[Fri_OrderQty]", records[key]['Fri_OrderQty'] == "" ? 0 : records[key]['Fri_OrderQty'])
                .replace("[Sat_OrderQty]", records[key]['Sat_OrderQty'] == "" ? 0 : records[key]['Sat_OrderQty'])
                .replace("[Sun_OrderQty]", records[key]['Sun_OrderQty'] == "" ? 0 : records[key]['Sun_OrderQty'])

                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? "" :"seq-"+ records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])
                .replace("[OrderQtySequence]", records[key]['OrderQtySequence'] == null ? 0 : records[key]['OrderQtySequence'])

                .replace("[moq]", records[key]['MOQ'] == null ? "" : "MOQ-" + records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])
                .replace("[moq]", records[key]['MOQ'] == null ? 0 : records[key]['MOQ'])

                .replace("[ItemNo1]", records[key]['ItemNo'])
                .replace("[ItemNo2]", records[key]['ItemNo'])
                .replace("[ItemNo3]", records[key]['ItemNo'])
                .replace("[ItemNo4]", records[key]['ItemNo'])
                .replace("[ItemNo5]", records[key]['ItemNo'])
                .replace("[ItemNo6]", records[key]['ItemNo'])
                .replace("[ItemNo7]", records[key]['ItemNo'])
                .replace("[ItemNo8]", records[key]['ItemNo'])
                .replace("[ItemNo9]", records[key]['ItemNo'])

                .replace("[ItemNo10]", records[key]['ItemNo'])
                .replace("[ItemNo11]", records[key]['ItemNo'])
                .replace("[ItemNo12]", records[key]['ItemNo'])
                .replace("[ItemNo13]", records[key]['ItemNo'])
                .replace("[ItemNo14]", records[key]['ItemNo'])
                .replace("[ItemNo15]", records[key]['ItemNo'])
                .replace("[ItemNo16]", records[key]['ItemNo'])
                .replace("[ItemNo17]", records[key]['ItemNo'])
                .replace("[ItemNo18]", records[key]['ItemNo'])

                .replace("[ItemNo19]", records[key]['ItemNo'])
                .replace("[ItemNo20]", records[key]['ItemNo'])
                .replace("[ItemNo21]", records[key]['ItemNo'])
                .replace("[ItemNo22]", records[key]['ItemNo'])
                .replace("[ItemNo23]", records[key]['ItemNo'])
                .replace("[ItemNo24]", records[key]['ItemNo'])
                .replace("[ItemNo25]", records[key]['ItemNo'])
                .replace("[ItemNo26]", records[key]['ItemNo'])
                .replace("[ItemNo27]", records[key]['ItemNo'])
                .replace("[ItemNo28]", records[key]['ItemNo'])

                .replace("[ItemNo29]", records[key]['ItemNo'])
                .replace("[ItemNo30]", records[key]['ItemNo'])
                .replace("[ItemNo31]", records[key]['ItemNo'])
                .replace("[ItemNo32]", records[key]['ItemNo'])
                .replace("[ItemNo33]", records[key]['ItemNo'])
                .replace("[ItemNo34]", records[key]['ItemNo'])
                .replace("[ItemNo35]", records[key]['ItemNo'])

                .replace("[ItemNo36]", records[key]['ItemNo'])
                .replace("[ItemNo37]", records[key]['ItemNo'])
                .replace("[ItemNo38]", records[key]['ItemNo'])
                .replace("[ItemNo39]", records[key]['ItemNo'])
                .replace("[ItemNo40]", records[key]['ItemNo'])
                .replace("[ItemNo41]", records[key]['ItemNo'])
                .replace("[ItemNo42]", records[key]['ItemNo'])

                .replace("[ItemNo43]", records[key]['ItemNo'])
                .replace("[ItemNo44]", records[key]['ItemNo'])
                .replace("[ItemNo45]", records[key]['ItemNo'])
                .replace("[ItemNo46]", records[key]['ItemNo'])
                .replace("[ItemNo47]", records[key]['ItemNo'])
                .replace("[ItemNo48]", records[key]['ItemNo'])
                .replace("[ItemNo49]", records[key]['ItemNo'])
                .replace("[ItemNo50]", records[key]['ItemNo'])

                .replace("[ItemNo51]", records[key]['ItemNo'])
                .replace("[ItemNo52]", records[key]['ItemNo'])
                .replace("[ItemNo53]", records[key]['ItemNo'])
                .replace("[ItemNo54]", records[key]['ItemNo'])
                .replace("[ItemNo55]", records[key]['ItemNo'])
                .replace("[ItemNo56]", records[key]['ItemNo'])

                .replace("[OrderItemID1]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID2]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID3]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID4]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID5]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID6]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])
                .replace("[OrderItemID7]", records[key]['OrderItemID'] == "" ? "" : records[key]['OrderItemID'])

                .replace("[row_number]", rowindex - 1);

            if (records[key]['OrderItemID'] != "") {
                arr_order_item.push({
                    OrderItemID: records[key]['OrderItemID'],
                    ItemID: records[key]['ItemID'],
                    Mon_OrderQty: records[key]['Mon_OrderQty'],
                    Tue_OrderQty: records[key]['Tue_OrderQty'],
                    Wed_OrderQty: records[key]['Wed_OrderQty'],
                    Thu_OrderQty: records[key]['Thu_OrderQty'],
                    Fri_OrderQty: records[key]['Fri_OrderQty'],
                    Sat_OrderQty: records[key]['Sat_OrderQty'],
                    Sun_OrderQty: records[key]['Sun_OrderQty']
                });
            }



        }

    });
    if (rowindex == 0) $('#panel_list').hide();
    else {
        $('#panel_list').show();
    }

    $('.list_count').html(rowindex - 1);
    $('#item_price_list').empty();
    $('#item_price_list').append(allCardsCode);
    
    $('[id$=hdnfldOrderid]').val($('#tb_orderid').val());



    $('.checksequence').blur(function () {
        //$('input[id^="tb_edit"]').each(function () {
        if (parseInt($(this).val()) != 0){

            var getSequences = [];
            getSequences = $(this).attr('sequence_value').split(',');

            var getMOQ = $(this).attr('moq_value');

            var equal = false;
            if (getSequences.length == 1) {
                if (parseInt(getSequences[0]) != 0 && getSequences[0] != "") {
                    if (parseInt($(this).val()) % parseInt(getSequences[0]) == 0) {
                        equal = true;
                    }
                }
                else {
                    equal = true;
                }

            }
            else {
                equal = $(this).attr('sequence_value').includes($(this).val());
            }

            var lessMOQ = true;
            if (getMOQ != "") {
                if (parseInt(getMOQ) != 0) {
                    if (parseInt($(this).val()) >= parseInt(getMOQ)) {
                        lessMOQ = false;
                    }

                }
                else { lessMOQ = false; }
            }
            else { lessMOQ = false; }
            var error = "";
            if (!equal) {
                error += "Order Qty is not correct <br>";
            }
            if (lessMOQ) {
                error += "Order Qty must greater than MOQ.";
            }

            if (error != "") {
                //ShowErrorMessage(error);
                toastr.options = {
                    "showDuration": "200"
                };
                toastr.error(error);
                $(this).css("border-color", "red");
                $(this).focus();
                $("#checkStatus").val("false");
            }
            else {
                $(this).css("border-color", "");
                $(this).blur();
                $("#checkStatus").val("true");
            }
        }
        else {
            $(this).css("border-color", "");
            $(this).blur();
            $("#checkStatus").val("true");
        }
            
          
      
        return false;
        //});
    });

   
}
//#endregion
function CheckSequence(val) {
   //
}
function RebineItemsArray() {
   
}
function OnImageError(source) {
    var src = [];
    src = source.src.split('/');

    if (src[source.src.split('/').length - 1] != "[ItemImage]") {
        source.src = "/PortalAdministration/img/bg-img/default_item.jpg";
    }

    return true;
}

//#region Save
function SaveRecordVerification() {
    error_message = "";
    if (parseInt($("#checkStatus").val()) > 0) {
       error_message += "Check your order qty!";
    }
    if (error_message == "") { return true; }
    else {
        ShowErrorBoxMessage(error_message);
        return false;
    }

}

function SaveRecord() {
    if (SaveRecordVerification() == false) {
        return false;
    }
    else {
       
            save_all_order_item();
       

        Pace.start();
        var item_notes = '';
        $.each(arr_order_item, function (key, val) {
            rowindex++;
            if (item_notes != "") item_notes = item_notes + "~";
            item_notes = item_notes +
                arr_order_item[key]['OrderItemID'] + "^" +
                arr_order_item[key]['ItemID'] + "^" +
                arr_order_item[key]['Mon_OrderQty'] + "^" +
                arr_order_item[key]['Tue_OrderQty'] + "^"+
                arr_order_item[key]['Wed_OrderQty'] + "^" +
                arr_order_item[key]['Thu_OrderQty'] + "^" +
                arr_order_item[key]['Fri_OrderQty'] + "^" +
                arr_order_item[key]['Sat_OrderQty'] + "^" +
                arr_order_item[key]['Sun_OrderQty'] + "^"
        });

        //record_id,, issueDate, carid, routeid, locationid, loadInDate, preparedby, preparedOn, status, remark, RequestID, itemNotes
        $.ajax({
            url: baseUrl() + "WebServices/WebService_Order.asmx/SaveAdvanceOrderRecord",
            data: "{ " +
                "'order_id':'" + $("#tb_orderid").val() + "' " +
                ",'order_no':'" + $("#tb_order_no").val() + "' " +
                ",'order_date':'" + $("#dtp_order_date").val() + "' " +
                ",'Mon_Date':'" + $("#hf_mondate").val() + "' " +
                ",'Tue_Date':'" + $("#hf_tuedate").val() + "' " +
                ",'Wed_Date':'" + $("#hf_weddate").val() + "' " +
                ",'Thu_Date':'" + $("#hf_thudate").val() + "' " +
                ",'Fri_Date':'" + $("#hf_fridate").val() + "' " +
                ",'Sat_Date':'" + $("#hf_satdate").val() + "' " +
                ",'Sun_Date':'" + $("#hf_sundate").val() + "' " +
                ",'customer_id':'" + get_current_Customer_id() + "' " +
                ",'order_status':'" + $("#ddl_status").val() + "' " +
                ",'remark':'" + $("#tb_remark").val() + "' " +
                ",'RequestID':'" + get_current_user_id() + "' " +
                ",'itemNotes':'" + item_notes + "' " +
                " }",
            dataType: 'json',
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.d.toString().split('~')[0] == "Success") {
                    $("#tb_orderid").val(data.d.toString().split('~')[1]);
                    $("#tb_order_no").val(data.d.toString().split('~')[2]);
                    $("#tb_order_no_name").html(data.d.toString().split('~')[2]);

                    $('[id$=hdnfldOrderid]').val(data.d.toString().split('~')[1]);
                   
                    //Comment-----------------------------------------
                    //request_comment_id = data.d["OrderID"];
                    //request_comment_type = "SaleOrder";
                    //Load_Comments();
                    //--------------

                    ShowSuccessMessage("Saved.");     
                    $("#hf_copylast").val("");
                    $("#copyLast").css("display", "none");
                    Load_Item_List("");
                }
                else if (data.d.toString().split('~')[0] == "Order Already Exit") {
                    ShowErrorBoxMessage("Oops. " + data.d.toString().split('~')[0]);
                }
                else {
                    ShowBoxMessage("Oops. " + data.d.toString().split('~')[0]);
                }

            },
            error: function (xhr, msg) {
                LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

            }
        });
    }
}

//#endregion

//#region temp data calculation
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

var arr_order_item = [];
var current_orderitem_id = '';
function add_order_item(order_itemid,id, no) {
    current_orderitem_id = order_itemid;   
        if (current_orderitem_id == '') {
            current_orderitem_id = generateQuickGuid();
            arr_order_item.push({

                OrderItemID: current_orderitem_id,
                ItemID: id,
                Mon_OrderQty: $('#tb_edit_monQty_' + no).val(),
                Tue_OrderQty: $('#tb_edit_tueQty_' + no).val(),
                Wed_OrderQty: $('#tb_edit_wedQty_' + no).val(),
                Thu_OrderQty: $('#tb_edit_thuQty_' + no).val(),
                Fri_OrderQty: $('#tb_edit_friQty_' + no).val(),
                Sat_OrderQty: $('#tb_edit_satQty_' + no).val(),
                Sun_OrderQty: $('#tb_edit_sunQty_' + no).val()

            });
            $('#tb_oritemid_' + no).val(current_orderitem_id);
           
        }
        else {
            $.each(arr_order_item, function (key, val) {
                if (arr_order_item[key]['OrderItemID'] == current_orderitem_id) {
                    arr_order_item[key]['ItemID'] = id;
                    arr_order_item[key]['Mon_OrderQty'] = $('#tb_edit_monQty_' + no).val();
                    arr_order_item[key]['Tue_OrderQty'] = $('#tb_edit_tueQty_' + no).val();
                    arr_order_item[key]['Wed_OrderQty'] = $('#tb_edit_wedQty_' + no).val();
                    arr_order_item[key]['Thu_OrderQty'] = $('#tb_edit_thuQty_' + no).val();
                    arr_order_item[key]['Fri_OrderQty'] = $('#tb_edit_friQty_' + no).val();
                    arr_order_item[key]['Sat_OrderQty'] = $('#tb_edit_satQty_' + no).val();
                    arr_order_item[key]['Sun_OrderQty'] = $('#tb_edit_sunQty_' + no).val();
                    return;
                }
            });
        }
        current_invoice_id = '';
        return false;  
}


function DeleteRecordConfirmation() {
    ShowConfirmation("Are you sure you want to delete?", "DeleteRecord");
}
function DeleteRecord() {
    Pace.start();
    //DeleteInvoice(InvoiceID,  user_id,  RequestID);
    $.ajax({
        url: baseUrl() + "WebServices/WebService_Order.asmx/DeleteRecord",
        data: "{ " +
            "'order_id':'" + $("#tb_orderid").val() + "' " +
            ",'user_id':'" + get_current_user_id() + "' " +
            ",'RequestID':'" + get_current_user_id() + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == "Success") {
                $("#tb_id").val(data.d.toString().split('~')[1]);
                LoadNew();
                ShowSuccessMessage("Deleted.");
                window.close();
            }
            else {
                ShowBoxMessage("Oops, we can't save. " + data.d.toString().split('~')[1]);
            }

        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });


}
//#endregion

//#region New Record
function LoadNew() {
    Pace.start();
    $("#tb_orderid").val("");
    $("#tb_order_no").val("Order No");

    $("#dtp_order_date").val(moment(new Date()).format('YYYY.MM.DD'));
    $('#dtp_order_date').periodpicker({
        todayButton: true,
        norange: true,
        cells: [1, 2],
        okButton: false,
        hideOnBlur: true,
        hideAfterSelect: true
    });
    $('#dtp_order_date').periodpicker('change');
    generateDate($('#dtp_order_date').val());
    $("#ddl_status").val("New");
    $("#tb_remark").val("");

    arr_order_item = [];
    
    Load_Item_List("");
    //Comment-------------------------
   // New_Comments();
    $("#copyLast").css("display", "block");
   
}
//#endregion
$('#tb_searchItemsList').keyup(function (e) {
    if ($('#tb_searchItemsList').val() == "") {
        Load_Item_List("");
    }
});

function SearchItem() {
    Load_Item_List("");
}


function save_all_order_item() {
    $('input[id^="tb_edit"]').each(function () {

        var oldValue = $(this).attr('orginal_value').split(',')[0];
        var itemID = $(this).attr('orginal_value').split(',')[1];
        var itemNO = $(this).attr('orginal_value').split(',')[2];
        if ($("#hf_copylast").val() != "Copy") {
            if ($.isNumeric(oldValue) &&
                $(this).val() != oldValue) {
                //save
                add_order_item($("#tb_oritemid_" + itemNO).val(), itemID, itemNO);

                //element.onchange();
            }
        }
        else {
            //save
            add_order_item($("#tb_oritemid_" + itemNO).val(), itemID, itemNO);
        }
    });    
}

function CheckSequence1() {
    $('input[id^="tb_edit"]').each(function () {
        var getSequences = [];
        getSequences = $(this).attr('sequence_value').split(',');

        var equal = false;
        if (getSequences.length == 1) {
            if (getSequences[0] != 0) {
                if ($(this).val() / getSequences[0] == 0) {
                    equal = true;
                }
            }
            else {
                equal = true;
                }
            
        }
        else {           
                equal = $(this).attr('sequence_value').includes($(this).val());               
            }

        return equal;     
    });    
}

function generateDate(orderDate) {
    var d = new Date(orderDate);
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    
    $("#mon_date").html(formatDateToShow(d));
    $("#hf_mondate").val(formatDateValue(d));

    d.setDate(d.getDate() + (2 + 7 - d.getDay()) % 7);
    $("#tue_date").html(formatDateToShow(d));
    $("#hf_tuedate").val(formatDateValue(d));

    d.setDate(d.getDate() + (3 + 7 - d.getDay()) % 7);
    $("#wed_date").html(formatDateToShow(d));
    $("#hf_weddate").val(formatDateValue(d));

    d.setDate(d.getDate() + (4 + 7 - d.getDay()) % 7);
    $("#thu_date").html(formatDateToShow(d));
    $("#hf_thudate").val(formatDateValue(d));

    d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
    $("#fri_date").html(formatDateToShow(d));
    $("#hf_fridate").val(formatDateValue(d));

    d.setDate(d.getDate() + (6 + 7 - d.getDay()) % 7);
    $("#sat_date").html(formatDateToShow(d));
    $("#hf_satdate").val(formatDateValue(d));

    d.setDate(d.getDate() + (7 + 7 - d.getDay()) % 7);
    $("#sun_date").html(formatDateToShow(d));
    $("#hf_sundate").val(formatDateValue(d));


}

function formatDateValue(date) {
   
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}
//var d = new Date();
function formatDateToShow(date) {
    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.",
        "Jul.", "Aug.", "Se.p", "Oct.", "Nov.", "Dec."
    ];   
   
    var d = new Date(date),
        month = '' + (d.getMonth()),
        day = '' + d.getDate(),
        year = d.getFullYear();

     month = monthNames[month];
    if (day.length < 2) day = '0' + day;

    return [day, month].join(' ');
}

function CopyLastOrder() {
    $("#hf_copylast").val("Copy");
    Load_Item_List("Copy");
}