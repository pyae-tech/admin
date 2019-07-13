$('title').html("Attachment");

//#region New Record
function LoadNew() {

    $('#dialogBox_Detail_Form').modal('show');
}

//#endregion
var loginRemoteCheckTimeout = null;
var validationFunction = function (options) {
    if (options.value.length == 0) {
        options.rule.message = "Image is required";
        return false;
    }
    if (options.value.length > 0) {
        var file = options.value[0];
        if (file.size / 1024 > 256) {
            options.rule.message = "Only images up to 0.5 Mb are allowed for uploading";
            return false;
        }
        if (file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/jpg") {
            options.rule.message = "Only images with following extensions are valid - png, jpeg, jpg";
            return false;
        }
    }
    if (loginRemoteCheckTimeout) {
        clearTimeout(loginRemoteCheckTimeout);
    }
    var timeoutId = setTimeout(function () {
        loginRemoteCheckTimeout = null;
        var img = new Image();

        img.src = window.URL.createObjectURL(options.value[0]);

        img.onload = function () {
          
            var width = img.naturalWidth,    //675*900
                height = img.naturalHeight;   //900*675

            window.URL.revokeObjectURL(img.src);

            
            if (width != height) {
                options.rule.message = "Dimension issue";
                options.rule.isValid = false;
                options.validator.validate();
            }
            else {
                options.rule.isValid = true;
                options.validator.validate();
            }
        };
    }, 1000);
    loginRemoteCheckTimeout = timeoutId;

    return true;
};
var fileUploader = $("#file-uploader").dxFileUploader({
    multiple: false,
    accept: "*",
    value: [],
    uploadUrl: window.location.href,    //"attachment",
    uploadMode: "instantly",
    onValueChanged: function (e) {
        var files = e.value;
        if (files.length > 0) {
            $("#selected-files .selected-item").remove();
            $.each(files, function (i, file) {
                var $selectedItem = $("<div />").addClass("selected-item");
                $selectedItem.append(
                    $("<span />").html("Name: " + file.name + "<br/>"),
                    $("<span />").html("Size:" + file.size + " bytes" + ","),
                    $("<span />").html("Type : " + file.type + "<br/>"),
                    //$("<span />").html("Last Modified Date: " + file.lastModifiedDate)
                );
                $selectedItem.appendTo($("#selected-files"));
            });
            $("#selected-files").show();
        }
        else
            $("#selected-files").hide();

        $('#myform').submit();

    }
}).dxFileUploader("instance");
//}).dxValidator({
    //validationRules: [
    //    {
    //        type: "custom", validationCallback: validationFunction
    //    }
    //]
//});

$("#accept-option").dxSelectBox({
    dataSource: [
        { name: "All types", value: "*" },
        { name: "Images", value: "image/*" },
        { name: "Videos", value: "video/*" }
    ],
    valueExpr: "value",
    displayExpr: "name",
    value: "*",
    onValueChanged: function (e) {
        fileUploader.option("accept", e.value);
    }
});


$("#upload-option").dxSelectBox({
    items: ["instantly", "useButtons"],
    value: "instantly",
    onValueChanged: function (e) {
        fileUploader.option("uploadMode", e.value);
    }
});


$("#multiple-option").dxCheckBox({
    value: false,
    text: "Allow multiple files selection",
    onValueChanged: function (e) {
        fileUploader.option("multiple", e.value);
    }
});
