$('title').html("Services");

BindImages();
function BindImages() {
    var img_arr = [];
    var images = ""; var cover_div = "";
    var css = "";
    img_arr = JSON.parse(localStorage.getItem('print_imgs'));
    length = 0;
    $.each(img_arr, function (key, val) { length++ });
    if (length <= 0) {
        $('#nodata_panel').css("display", "block");
        $('#images_panel').css("display", "none");
        
    }
    else {
      
       
      

        $('#nodata_panel').css("display", "none");
        $('#images_panel').css("display", "block");
        var page_size = 0; var size = 0;
        page_size =parseFloat(length / 6);
        page_size = Math.ceil(page_size);
        if (page_size == 0) { page_size = 1; }
        var result = "";
        cover_div = "";
        
        for (i = 0; i < page_size; i++) {
            if (page_size == 1) { css = getSize(length); }
            else {
                size = length-Math.pow(6, i);
                css = getSize(size); 
            }    
            cover_div = "";
            cover_div = "<div class='page'><div id='" + i + "' class='subpage'>"; 
            
            var start = i * 6;           
            var count = 0;
            images = "";
            for (j = start; j < 6 + start; j++) {                
                if (j >= length) { break; }
                else {                  
                    images +=
                        "<img class='img_box' src='" + img_arr[j] + "' onclick=DeleteData('" + img_arr[j] + "')" +
                        " style ='" + css + "'>";
                    count++;
                }
            }
            cover_div += images + "</div></div>";  
            
        result += cover_div;

        }

        //$.each(img_arr, function (key, val) {
            
            
        //  //  images += "<div style = 'border: 3px solid silver;'>" +
        //  //      "<img src='" + img_arr[key] + "' onclick=DeleteData('" + img_arr[key] + "')"+
        //  //" style ='width: 581.53px;height: 306.4px;'></div > <br />";
          

        //    images +=    
        //            "<img class='img_box' src='" + img_arr[key] + "' onclick=DeleteData('" + img_arr[key] + "')" +
        //        " style ='" + css + "'>";
        //    if (key == 6 && key != length) {
        //        images = "<div class='subpage'>" + images + "</div>";
        //    }
        //    else if (key == length) {
        //        images = "<div class='subpage'>" + images + "</div>";
        //    }
        //});
        $('#image_show').empty();
        $('#image_show').append(result);
    }
   
}
function getSize(size) {
    var css = "";
    if (size <= 2) { css = "width:100%;height:140mm;"; }
    else if (size == 3) { css = "width:100%;height:90mm;"; }
    else if (size == 4) { css = "width:50%;height:140mm;"; }
    else if (size > 4) { css = "width:50%;height:90mm;"; }
    
    return css;
}
function printDiv() {
    //Get the HTML of div
    var divElements = document.getElementById("image_show").innerHTML;
    //Get the HTML of whole page
    var oldPage = document.body.innerHTML;

    //Reset the page's HTML with div's HTML only
    document.body.innerHTML =
        "<html><head><title></title></head><body>" +
        divElements + "</body>";

    //Print Page
    window.print();

    //Restore orignal HTML
    document.body.innerHTML = oldPage;


}
//function printDiv() { window.print(); }

function DeleteData(url) {
    ShowConfirmation("Are you sure you want to delete?", "DeleteAttachment",url);
}

function DeleteAttachment(url) {

    $.ajax({
        url: baseUrl() + "WebServices/WebService_Image.asmx/DeleteImageWithURL",

        data: JSON.stringify({
            imageURL: url,
            RequestID: get_current_user_id()
        }),
        dataType: 'json',
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d.toString().split('~')[0] == 'Success') {
                var old_img_arr = [];
                old_img_arr = JSON.parse(localStorage.getItem('print_imgs'));
                old_img_arr.splice($.inArray(url, old_img_arr), 1);
                localStorage.removeItem("print_imgs");
                localStorage.setItem('print_imgs', JSON.stringify(old_img_arr));
                var new_img_arr = [];
                new_img_arr = JSON.parse(localStorage.getItem('print_imgs'));
                if (new_img_arr.lenght <= 0) {
                    window.close();
                }
                else {
                    BindImages();
                }
            }
        },
        error: function (xhr, msg) {
            LogJSError('Web Service Fail: ' + msg + '\n' + xhr.responseText);

        }
    });

}