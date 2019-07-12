function new_Attachment() {
    request_attachment_type = "";
    request_attachment_id = "";
    request_attachment_no = "";
    $('#attachment_box_header').hide();
    $('#attachment_box_action').hide();
}
function UploadAttachment() {
    switch (request_attachment_type) {
       case "Daily Expense":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no+ '&UserId=' + get_current_user_id() + '&refType=expense', '_blank');
             break;

        case "Daily Income":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no+ '&UserId=' + get_current_user_id() + '&refType=income', '_blank');
            break;

        case "Assess":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no + '&UserId=' + get_current_user_id() + '&refType=assess', '_blank');
            break;

        case "Item":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no + '&UserId=' + get_current_user_id() + '&refType=item', '_blank');
            break;

        case "EcommerceItem":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no + '&UserId=' + get_current_user_id() + '&refType=ecommerceItem', '_blank');
            break;

        case "ItemType":
            window.open('attachment?id=' + request_attachment_id + '&No=' + request_attachment_no + '&UserId=' + get_current_user_id() + '&refType=itemtype', '_blank');
            break;

        case "Brand":
            window.open('attachment?id=' +request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=brand','_blank');
            break;

        case "Service":
            window.open('attachment?id=' + request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=service', '_blank');
            break;

        case "SaleVouncher":
            window.open('attachment?id=' + request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=saleVouncher', '_blank');
            break;

        case "IssueNote":
            window.open('attachment?id=' + request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=issuenote', '_blank');
            break;

        case "Logo":
            window.open('attachment?id=' + request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=logo', '_blank');
            break;

        case "DailyOpportunity":
            window.open('attachment?id=' + request_attachment_id + '&UserId=' + get_current_user_id() + '&refType=dailyopportunity', '_blank');
            break;
            
        default:
            break;
    }
}

function AttachmentRefresh() {
    Load_Attachment();
}

function Load_Attachment() {
    Pace.start();

    //$('#approval_box_action').show();
    $('#attachment_box_header').show();
    $('#attachment_box_action').show();
    $('#comment_box').show();
    $.ajax({
        //record_type, record_id
        url: baseUrl() + "WebServices/WebService_Attachment.asmx/getAllAttachment",
        data: "{ " +
            "'record_type':'" + request_attachment_type + "' " +
            ",'record_id':'" + request_attachment_id + "' " +
            " }",
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != null) {
                //row_index = 0;
                //$("#img_plugin").empty();
                //$.each(data.d, function (key, val) {
                //    row_index++;
                //        if (data.d[key]['ImageName'].split('/')[1] != undefined) {
                //            $("#img_plugin").append("<option  data-img-src='http://" + data.d[key]['Path'] + "' value='" + key + "'>" + data.d[key]['ImageName'].split('/')[0] + "</option>");
                //        }
                //});
            //    if (row_index == 0) {
            //        $("#attach_images").css("display", "none");
            //}
            //else {
            //    $("#attach_images").css("display", "block");             

            //        $("select.image-picker").imagepicker({
            //            hide_select: false,
            //        });

            //        $("select.image-picker").css("display", "none");
            //    }
              
                
               generate_Attachment_list(data.d);
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });
}
var Images = [];
function generate_Attachment_list(records) {
    var allCardsCode = '';
    rowindex = 0;
    $.each(records, function (key, val) {
        rowindex++;
        
        the_template = $('#template_Attachment_row').html();
        //if (records[key]['ImageName'].split('/')[1] != undefined) {
        //    $("#img_plugin").append("<option  data-img-src='http://" + records[key]['Path']+"' value='"+ data.d[key]['ItemTypeID'] + "'>" + records[key]['ImageName'].split('/')[0] + "</option>");
           
        allCardsCode += the_template.replace()
            //.replace("[Path]", records[key]['Path'].substring(records[key]['Path'].indexOf('/'), records[key]['Path'].length))
            .replace("[Path]", "https://" + records[key]['Path'])
            .replace("[Path]", "https://" + records[key]['Path'])            //.replace("[Path]", "http://" + records[key]['Path'])
            .replace("[ID]", records[key]['ID'])
            .replace("[File]", records[key]['ImageName'].split('/')[0]);
                //.replace("[Size]", records[key]['ImageName'].split('/')[1] == "" ? "" : records[key]['ImageName'].split('/')[1]);
        //}
    });

    if (rowindex == 0) {
        $('#attachment_box_header').hide();
    }
    else {
        $('#attachment_box_header').show();

    }

    $('#table_attachment_list').empty();
    $('#table_attachment_list').append(allCardsCode);

    $(".image-checkbox").each(function () {
        if ($(this).find('input[type="checkbox"]').first().attr("checked")) {
            $(this).addClass('image-checkbox-checked');
        }
        else {
            $(this).removeClass('image-checkbox-checked');
        }
    });   
    $(".image-checkbox").on("click", function (e) {
        $(this).toggleClass('image-checkbox-checked');
        var $checkbox = $(this).find('input[type="checkbox"]');
        $checkbox.prop("checked", !$checkbox.prop("checked"));
        var id = e.currentTarget.id;
        if ($checkbox.prop("checked")) {
            Images.push(e.currentTarget.children[0].currentSrc);
        }
        else {
            for (var i = 0; i < Images.length; i++) {
                if (Images[i] === e.currentTarget.children[0].currentSrc) {
                    Images.splice(i, 1);
                }
            }
        }
        
        e.preventDefault();
    });
    //$("#demo_img").unitegallery({
    //    tile_border_color: "#7a7a7a",
    //    tile_outline_color: "#8B8B8B",
    //    tile_overlay_opacity: 0.3,
    //    tile_show_link_icon: true,
    //    tile_image_effect_type: "sepia",
    //    tile_image_effect_reverse: true,
    //    tile_enable_textpanel: true,
    //    lightbox_textpanel_title_color: "e5e5e5"
    //});
}

// sync the state to the input


function OpenAttachment(path) {
    window.open(path);

}

function DeleteAttachment(id) {
   
    //$.ajax({
    //    url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImage",

    //    data: JSON.stringify({
    //        imageID: id,
    //        RequestID: get_current_user_id()
    //    }),
    //    dataType: 'json',
    //    type: "POST",
    //    contentType: "application/json; charset=utf-8",
    //    success: function (data) {
    //        if (data.d.toString().split('~')[0] == 'Success') {
    //            Load_Attachment();
    //        }
    //    },
    //    error: function (xhr, msg) {
    //        LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

    //    }
    //});

}


function AttachmentPrint() {

    //$("*[multiple=multiple]").find("option:selected").each(function (index, item) {
    //    Images[index]=$(item).attr("data-img-src");
    //});
    localStorage.setItem('print_imgs', JSON.stringify(Images));
   window.open('printandpreview', '_blank');
    
}

//$("select.image-picker").imagepicker({
//    hide_select: false,
//   });

//$("#demo_img").unitegallery({
//    tile_border_color: "#7a7a7a",
//    tile_outline_color: "#8B8B8B",
//    tile_overlay_opacity: 0.3,
//    tile_show_link_icon: true,
//    tile_image_effect_type: "sepia",
//    tile_image_effect_reverse: true,
//    tile_enable_textpanel: true,
//    lightbox_textpanel_title_color: "e5e5e5"
//});



