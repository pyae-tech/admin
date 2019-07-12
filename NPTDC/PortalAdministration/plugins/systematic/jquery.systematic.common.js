/* Default Date Format  */
var DefaultDateFormat = 'dd/mm/yy';
/*Json Date to JS Date*/
function JsonDateToNormal(theDate) {
    if (theDate == null) return null;
    var value = theDate;
    if (value.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(value.substring(6, value.length - 2)));

        return dt;
    }

}
function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}
 
function page_loading_start() 
{
    $('#loading').show();   
}
function page_loading_start(diaplay) {
    //$.isLoading({ text: diaplay });
    //$('#whole_page').waitMe({ text: diaplay });
}
function page_loading_stop() {

   // $.isLoading('hide');
    //$('#whole_page').waitMe('hide');
}
function GetCurrentUser() {
    return $.cookie('userid');
}

function GetCurrentMember() {
    return $.cookie('member_id');
}
function GetWebMemberDefaultUser() {
    return '0001';
}
function JsonDateToNormalWithFormat(theDate) {
    
    var value = theDate;
    if (value.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(value.substring(6, value.length - 2)));

        return dt.toString(DefaultDateFormat);
    }
}
//Change Page title
function setPageTitleHeader(theTitle) {
    document.getElementsByTagName('title')[0].innerHTML = 'YGN-link | ' + theTitle;
}

//Require Moment
function JsonDateToFormat(theDate, format) {
    if (theDate == undefined || theDate == null) return "";
    var value = theDate;
    if (value.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(value.substring(6, value.length - 2)));

        return moment(dt).format(format);
    }

}

function TimeObjectToString(time) {
    if (time == undefined || time == null) return "";
    var value = time; var rtime = "";
    if (value.Hours<9) {
        rtime += '0' + value.Hours+':';
    }
    else {
        rtime += value.Hours + ':';
    }

    if (value.Minutes<=9) {
        rtime += '0' + value.Minutes + ':';
    }
    else {
        rtime += value.Minutes + ':';
    }

    if (value.Seconds<=9) {
        rtime += '0' + value.Seconds;
    }
    else {
        rtime += value.Seconds;
    }
    return rtime;
}

function CheckTime(time) {
    
    var pattern = new RegExp(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/i);
    return pattern.test(time);
}
/*Get type of Object*/
function GetType(theObject) {
    return Object.prototype.toString.call(theObject)
}

function OpenDialogWindow(LinkURL,CallBackFunction) {
    var w = window.location;
    var url = w.protocol + "//" + w.host + "/" + LinkURL;  
  //  return window.showModalDialog(url, "tinyWindow", "dialogWidth:900px; dialogHeight:500px;");
    return _showModalDialog(url, 900, 900, CallBackFunction);
    //return window.open(url, "tinyWindow", "dialogWidth:900px; dialogHeight:500px;");
}
function OpenBigDialogWindow(LinkURL, CallBackFunction) {
    var w = window.location;
    var url = w.protocol + "//" + w.host + "/" + LinkURL;
    //  return window.showModalDialog(url, "tinyWindow", "dialogWidth:900px; dialogHeight:500px;");
    return _showModalDialog(url, screen.width, screen.height, CallBackFunction);
    //return window.open(url, "tinyWindow", "dialogWidth:900px; dialogHeight:500px;");
}

function _showModalDialog(url, width, height, closeCallback) {
     
    var modalDiv,
        dialogPrefix = window.showModalDialog ? 'dialog' : '',
        unit = 'px',
        maximized = width === true || height === true,
        w = width || 600,
        h = height || 500,
        border = 5,
        taskbar = 40, // windows taskbar
        header = 20,
        x,
        y;

    if (maximized) {
        x = 0;
        y = 0;
        w = screen.width;
        h = screen.height;
    } else {
        x = window.screenX + (screen.width / 2) - (w / 2) - (border * 2);
        y = window.screenY + (screen.height / 2) - (h / 2) - taskbar - border;
    }

    var features = [
            'toolbar=no',
            'location=no',
            'directories=no',
            'status=no',
            'menubar=no',
            'scrollbars=no',
            'resizable=no',
            'copyhistory=no',
            'center=yes',
            dialogPrefix + 'width=' + w + unit,
            dialogPrefix + 'height=' + h + unit,
            dialogPrefix + 'top=' + y + unit,
            dialogPrefix + 'left=' + x + unit
    ],
        showModal = function (context) {
            if (context) {
                modalDiv = context.document.createElement('div');
                modalDiv.style.cssText = 'top:0;right:0;bottom:0;left:0;position:absolute;z-index:50000;';
                modalDiv.onclick = function () {
                    if (context.focus) {
                        context.focus();
                    }
                    return false;
                }
                window.top.document.body.appendChild(modalDiv);
            }
        },
        removeModal = function () {
            if (modalDiv) {
                modalDiv.onclick = null;
                modalDiv.parentNode.removeChild(modalDiv);
                modalDiv = null;
            }
        };

    // IE
    if (window.showModalDialog) {
        window.showModalDialog(url, null, features.join(';') + ';');

        if (closeCallback) {
            closeCallback();
        }
        // Other browsers
    } else {
        var win = window.open(url, '', features.join(','));
        if (maximized) {
            win.moveTo(0, 0);
        }

        // When charging the window.
        var onLoadFn = function () {
            showModal(this);
        },
            // When you close the window.
            unLoadFn = function () {
                window.clearInterval(interval);
                if (closeCallback) {
                    closeCallback();
                }
                removeModal();
            },
            // When you refresh the context that caught the window.
            beforeUnloadAndCloseFn = function () {
                try {
                    unLoadFn();
                }
                finally {
                    win.close();
                }
            };

        if (win) {
            // Create a task to check if the window was closed.
            var interval = window.setInterval(function () {
                try {
                    if (win == null || win.closed) {
                        unLoadFn();
                    }
                } catch (e) { }
            }, 500);

            if (win.addEventListener) {
                win.addEventListener('load', onLoadFn, false);
            } else {
                win.attachEvent('load', onLoadFn);
            }

            window.addEventListener('beforeunload', beforeUnloadAndCloseFn, false);
        }
    }
}

/*Go To Page*/
function GotoPage(LinkURL) {
    var w = window.location;
    var url = w.protocol + "//" + w.host + "/" + LinkURL;
    window.location.href = url;
    return false;
}
function OpenNewURLInNewTab(url) {
    window.open(url, '_blank');
}
function GetProjectImageURL(imageName) {

    var w = window.location;
    return w.protocol + "//" + w.host + "/Images/ProjectImages/" + imageName;
}
function GotoPageNewTab(LinkURL) {
    var w = window.location;
    var url = w.protocol + "//" + w.host + "/" + LinkURL;
    window.open(url, '_blank');
}
/*Get Ajax Base URL*/
function GetAjaxBaseUrl() {
    var href = window.location.href.split('/');
    return href[0] + '//' + href[2] + '/';
}
// Get Server URL
function baseUrl() {
    var href = window.location.href.split('/');
    //return href[0] + '//' + href[2] + '/';
    return 'http://localhost:2231/';
}

// Get Server URL
function go_with_base_url(remain_url_path) {
    window.location.href = baseUrl() + remain_url_path;
}

//Check Null Underfined or blank
function GetDatabaseValue(theValue) {
    if (theValue == '' || theValue == null || theValue == undefined)
        return '';
    else
        return theValue;
}

// #region Validate Email Address
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
//#endregion

// #region Convert to DateTimePicker
function ConvertDateTime(ControlID) {
    $(ControlID).datepicker(
                       {
                           dateFormat: DefaultDateFormat,
                           changeMonth: false,
                           changeYear: true,
                           yearRange: "c-100:c",
                           showOn: "both",
                           numberOfMonths: 1
                       });
}
//#endregion

//#region Convert To Number TextBox
function ConvertToNumberTextBox(ControlID) {
    $(ControlID).keyup(function () {
        this.value = this.value.replace(/[^0-9\.]/g, '');
    });
}
//#endregion
//#region Get URL Path 
function GetURLPath(theIndex) {
    if (window.location.pathname.split("/").length >= theIndex + 1) {
        return window.location.pathname.split("/")[theIndex];
    }
    else {
        return "";
    }
}
//#endregion
//#region Get URL Data  
function GetURLData(Name) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == Name) {
            var reSpace = new RegExp('%20', 'g');
            return sParameterName[1].replace(reSpace, ' ');
        }
    }
    return '';
}



//#endregion

//#region Scroll To Div
function scrollToDiv(divID) {
    $('html, body').animate({
        scrollTop: $(divID).offset().top
    , duration: 1000, easing: "linear"
    });
}
//#endregion

//#region Log Javascript Error
function LogJSError(errorMessage) {
   // $.isLoading('hide');
   // var w = window.location;
    //page_loading_stop();
    //do_loading_hide();
   // ShowErrorBoxMessage(errorMessage);
    bootbox.alert({
        title: "ERROR",
        message: errorMessage
    });
    //ShowBoxMessage("Oops, we can't save. " + errorMessage);
    //addErrorLog(errorMessage, w.protocol + "," + w.host + "," + w.pathname);
}
//#endregion

//#region Encoding Decoding for Invalid Characters
function EncodeText(theText) {
 
        if (theText == undefined || theText == null) return '';
        return theText
             .replace(/'/g, '&apos;')
         .replace(/"/g, '&quot;');
 

}
function DecodeText(theText) {
 

    if (theText == undefined || theText == null) return '';
    return theText
        .replace(/&apos;/g, '\'')
        .replace(/&quot;/g, '\"');
 
}
//#endregion

//#region Random Number
function GetRandomNumber(min, max) {

    return Math.floor(Math.random() * (1 + max - min)) + min;

}
//#endregion

//#region Replace Special Character
function esc_quot(text) {
    return (text + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}
//#endregion  Replace Special Character
// #region Get Number with Comman Sperator
function NumberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//#endregion
function CommasToNumber(controlName) {
    var value = $('#' + controlName).val();

    if (value == null || value == "") 
        return parseInt(0);

    value = value.replace(/[,_]/g, '');
    var regex = /^[+-]?\d+[.]?[\d+]?$/;
    var isSave = regex.test(value);  
    //var isSave = $.isNumeric(value);

    if (!isSave)
        return parseInt(0);

    //if (value.length > 4) {
    //    value = value.replace(",", "");
    //}
    
    return parseFloat(value);


}

function convert_count_with_symbol(the_value) {
    var count = parseInt(the_value);
    if (count >= 1000) {
        return ReplaceNumberWithCommas(parseInt(count / 1000)) + ' K';
    }
    else {
        return ReplaceNumberWithCommas(count);
    }

}
function ReplaceNumberWithCommas(yourNumber) {
    //Seperates the components of the number
    var n = yourNumber.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
}


function get_cookie_value(cookie_name) {
    if ($.cookie(cookie_name) != "" && $.cookie(cookie_name) != undefined)
        return "";
    else
        return $.cookie(cookie_name);

}

function check_blank_value_array(textbox_array, error_box_array) {
    return_result = true;
    for (i = 0; i < textbox_array.length; i++) {
        $("#" + error_box_array[i]).html("");
        if ($("#" + textbox_array[i]).val() == "") {
            $("#" + error_box_array[i]).html(" Require.");
            return_result = false;
        }
    }
    return return_result;
}


function IsValidImageUrl(path, url, index, success_script, fail_script) {
    $("<img>", {
        src: baseUrl() + path + url,
        error: function () {
            alert(url + ': ' + false);
        },
        load: function () {
            alert(url + ': ' + true);
        }
    });
}

function BackToLastPage() {
    parent.history.back();
    return false;
}
function GoToNextPage() {
    parent.history.forward();
    return false;
}

function GetCurDate_YYYYMMDD() {
    var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth() + 1;
    var yy = d.getFullYear();
    var newDate = yy + "/" + mm + "/" + dd;
    return newDate;
}

function ConvertDBDate(theDate) {
    if (theDate == undefined || theDate == null) return "";
    var value = theDate;
    if (value.substring(0, 6) == "/Date(") {
        var dt = new Date(parseInt(value.substring(6, value.length - 2)));
        return dt;
        
    }

}

//#regoin Alert 



function ShowSuccessMessage(Message)
{ 
    toastr.success(Message);
}

function ShowErrorMessage(Message) { 
    
    //toastr.options = {        
    //    "showDuration": "300"
    //};
    toastr.error(Message);
}


function ShowWarningMessage(Message) {
    toastr.warning(Message);
}

//#endregion

function getInt(controlName)
{
    var value = $('#' + controlName).val();
    if (value == "" || value == "NaN")
        return 0;
    else
        return parseInt($('#' + controlName).val());
}


function getFloat(controlName) {
    var value = $('#' + controlName).val();
    if (value == "" || value == "NaN")
        return 0;
    else
        return parseFloat($('#' + controlName).val());
}

function ShowInfoMessage(message) {
    bootbox.alert({
        title: "INFORMATION",
        message: message
    });
}

function NumberExpressionWithoutSign(key) {
    var isValid = false;
    var regex = /^[0-9.]*$/;
    isValid = regex.test(key);  
    return isValid;
    
}

function NumberExpressionWithSign(key) {
    //var value = $('#' + controlName).val();
    var isValid = false;
    var regex = /^[0-9-+.]*$/;
    isValid = regex.test(key);
      
    return isValid;

}



//function test(event) {
//    var isValid = false;
//    var key = event.charCode;
//    if (key >= 48 && key <= 57) {
//        return true;

//    }
//    if (key >= 96 && key <= 105) {
//        return true;
//    }
//    if (key == 190 && key == 110) {
//        return true;
//    }
//    return isValid;

//}