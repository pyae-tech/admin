<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.master" AutoEventWireup="true" CodeBehind="pageMposSellingItem.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMPOS.mposItems.pageMposSellingItem" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
       <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
        .ImageContainer {
            min-height: 150px;
            border: 2px solid rgba(0,0,0,0.3);
            background: white;
            padding: 20px 20px;
            background: rgba(0,0,0,0.025);
            border-style: dashed;
            border-width: 1px;
            border-radius: 3px;
            text-align: center;
        }
    </style>
    <link href='<%= ResolveUrl("../../../plugins/unitegallery/css/unitegallery.min.css")%>' rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <br />
    <br />
    <br />
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_items">Items </h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook">Master Data</a></li>
        <li class="active" data-translate="">Selling Items</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <div id="page-content">
        <div class="row">
            <div class="col-md-4">
                <h3><i class="ion-briefcase">&nbsp;</i><span data-translate="">Item :</span> <span id="item_name_sp"></span></h3>

            </div>
            <div class="col-md-8"><br />
                <div class="form-group">
                    <input type="hidden" id="tb_imageid" value="" />
                    <label class="col-md-3 control-label"></label>
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveItem();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>

                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="window.close();"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>
                    <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
                    <button class="btn btn-success btn-rounded  btn-labeled" type="button" onclick="RefreshItem();return false;"><i class="btn-label ion-refresh"></i><span class="bold" data-translate="_reflesh">Reflesh</span></button>


                </div>
            </div>

        </div>

        <div class="row">
            <div class="col-md-9 sortable-list tasklist list-unstyled">
                <div class="panel  ">

                    <div class="panel-body">
                        <form class="form-horizontal">
                            <input type="hidden" id="tb_id" value="" />
                            <div class="form-group">
                                <label for="tb_code" class="col-md-1 control-label" data-translate="">Name</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="tb_item_name" placeholder="Item Name">
                                </div>
                                <div class="col-md-1"></div>
                                <label for="tb_name" class="col-md-1 control-label" data-translate="_itemno">Item No.</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" id="tb_item_no">
                                </div>

                            </div>

                            <div class="form-group">
                                <label for="tb_name" class="col-md-1 control-label" data-translate="">Group</label>
                                <div class="col-md-2">
                                    <input type="hidden" id="hf_itemgroupid" value="" />
                                    <select id="dd_itemtype" class="form-control demo_select2"></select>
                                </div>
                                <div class="col-md-1">
                                    <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('itemgroups');return false;"></i></span>&nbsp;  
                                                         <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="LoadItemType();return false;"></i></span>&nbsp;  
                         
                                </div>

                                <label for="tb_name" class="col-md-1 control-label" data-translate="_Brand">Brand</label>
                                <div class="col-md-2">
                                    <input type="hidden" id="hf_brandid" value="" />
                                    <select id="dd_brand" class="form-control demo_select2"></select>

                                </div>

                                <div class="col-md-1">
                                    <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('brands');return false;"></i></span>&nbsp;  
                                                         <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="LoadBrand();return false;"></i></span>&nbsp;  
                                </div>
                                <label for="tb_name" class="col-md-1 control-label" data-translate="_supplier">Supplier</label>
                                <div class="col-md-2">
                                    <input type="hidden" id="hf_supplierid" value="" />
                                    <select id="dd_supplier" class="form-control demo_select2"></select>

                                </div>
                                <div class="col-md-1">
                                    <span><i class="ion-ios-plus urllink" style="font-size: 21px;" onclick="OpenNewURLInNewTab('suppliers');return false;"></i></span>&nbsp;  
                                                         <span><i class="ion-ios-refresh urllink" style="font-size: 21px;" onclick="LoadSupplierNameList();return false;"></i></span>&nbsp;  
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="tb_ShortDescription" class="col-md-1 control-label" data-translate="">Short Info</label>
                                <div class="col-md-11">
                                    <textarea id="tb_ShortDescription" rows="3" cols="50" class="form-control" placeholder="ShortDescription"></textarea>
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_description" class="col-md-1 control-label" data-translate="_remark">Remark</label>
                                <div class="col-md-11">
                                    <textarea id="tb_remark" rows="1" cols="50" class="form-control" placeholder="Remark"></textarea>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="">Price Information</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="tb_code" class="col-md-1 control-label" data-translate="">Price </label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_price1" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="0">
                                </div>
                                <div class="col-md-2">
                                    <input type="hidden" id="hf_currencyid" value="" />
                                    <select id="ddl_currency" class="form-control demo_select2"></select>
                                </div>

                                <div class="col-md-3">
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_price2" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="0">
                                </div>

                                <div class="col-md-3">
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_price3" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="0">
                                </div>
                                                            </div>
                            <div class="form-group">
                                 <div class="col-md-1"></div>
                                <div class="col-md-2">

                                    <input id="chk_Ecommerce" class="toggle-switch" type="checkbox" checked>
                                    <label for="chk_Ecommerce"></label>
                                   

                                </div>
                                <label class="col-sm-2 control-label" style="text-align: left;">Ecommerce Item</label>
                                <div class="col-md-1">

                                    <input id="ch_not_avaliable" class="toggle-switch" type="checkbox" checked>
                                    <label for="ch_not_avaliable" class="label-lg"></label>

                                </div>
                                <label class="col-sm-1 control-label" style="text-align: left;">Unavailable</label>
                            </div>
                            <div class="form-group">

                                <label for="tb_uom" class="col-md-1 control-label" data-translate="_itemuom">UOM</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_uom">
                                </div>
                                <label for="tb_moq" class="col-md-1 control-label" data-translate="_itemmoq">MOQ</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_moq">
                                </div>
                                <label for="countrylist" class="col-md-1 control-label" data-translate="">Warning</label>
                                <div class="col-md-2">
                                    <%-- <input type="number" class="form-control" id="tb_warning_level" placeholder="0">--%>
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_warning_level" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="0">
                                </div>
                                <label for="tb_ShortDescription" class="col-md-1 control-label" data-translate="">Seq</label>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="tb_orderseq" placeholder="OrderSequence">
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

                <div class="panel  ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="">Packing</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-md-2 control-label" data-translate="_packagelevel1">Level 1</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_packagelv1_name" placeholder="Label">
                                </div>

                                <div class="col-md-2">
                                    <%-- <input type="number" class="form-control" id="tb_packagelv1_qty" style="text-align: right;" placeholder="Qty">--%>
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv1_qty" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Qty">
                                </div>

                                <div class="col-md-2">
                                    <%-- <input type="number" class="form-control" id="tb_packagelv1_price" style="text-align: right;" placeholder="Price">--%>
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv1_price" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Qty">
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="col-md-2 control-label" data-translate="_packagelevel2">Level 2</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_packagelv2_name" placeholder="Label">
                                </div>
                                <div class="col-md-2">
                                    <%--                                                        <input type="number" class="form-control" id="tb_packagelv2_qty" style="text-align: right;" placeholder="Qty">--%>
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv2_qty" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Qty">
                                </div>
                                <div class="col-md-2">
                                    <%--     <input type="number" class="form-control" id="tb_packagelv2_price" style="text-align: right;" placeholder="Price">--%>
                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv2_price" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Price">
                                </div>
                            </div>


                            <div class="form-group">
                                <label class="col-md-2 control-label" data-translate="_packagelevel3">Level 3</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" id="tb_packagelv3_name" placeholder="Label">
                                </div>

                                <div class="col-md-2">

                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv3_qty" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Qty">
                                </div>

                                <div class="col-md-2">

                                    <input type="text" class="form-control" style="text-align: right;" id="tb_packagelv3_price" onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Price">
                                </div>
                            </div>

                        </form>

                    </div>
                </div>

                <div class="panel" id="ecommerce_item" style="display: block;">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                        <h3 class="panel-title" data-translate="">E-commerce Images</h3>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                            </div>

                            <div class="form-group">

                                <div class="col-md-12">
                                    <p data-translate="_editDesc">You can edit Description.</p>
                                    <button id="demo-edit-text" class="btn btn-primary" data-translate="_edit" type="button">Edit</button>
                                    <button id="demo-save-text" class="btn btn-primary" data-translate="_save" type="button">Save</button>

                                
                                    <!--Summernote-->
                                    <!--===================================================-->
                                    <div id="demo-summernote-edit">
                                        <h4 class="text-main">Description</h4>
                                        <p>
                                            Enter Detail Descriptions for your item.....
                                        </p>
                                    </div>
                                    <!--===================================================-->
                                    <!-- End Summernote -->

                                </div>
                            </div>

                        </form>

                    </div>
                </div>
                <%--<div class="form-group">
                    <label for="countrylist" class="col-md-3 control-label" data-translate="_shortcode1">Short Code</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="tb_shortcode1">
                    </div>
                    <label for="countrylist" class="col-md-3 control-label" data-translate="_shortcode2">Short Code</label>
                    <div class="col-md-3">
                        <input type="text" class="form-control" id="tb_shortcode2">
                    </div>
                </div>--%>
            </div>
        </div>
        <div class="col-md-3">

            <div class="panel  ">
                <div class="panel-heading">
                    <div class="panel-control">
                    </div>
                    <h3 class="panel-title" data-translate="">Item Picture</h3>
                </div>
                <div class="panel-body">
                    <div class="col-md-12 ImageContainer" id="item_image_zone" style="display: none;">
                        <label class="col-md-12 control-label">Upload Item's Image</label>

                        <div id="image_item" style="display: block;">

                            <img id="bind_item_image_src" src='' style="width: 60%; height: 66%;" /><br />
                            <br>
                            <button id="btn_changeImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemImage();"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">Edit</span></button>
                            &nbsp &nbsp
                                                    <button id="btn_deleteImage" class="btn btn-dark btn-icon btn-sm btn-rounded " onclick="deleteImage();"><i class="ion-close-circled icon-lg"></i>&nbsp;<span class="bold" data-translate="_delete">Delete</span></button>
                        </div>
                        <div id="Image_drop_zone" style="display: block;">
                            <button id="btn_uploadImage" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemImage1();" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel  ">
                <div class="panel-heading">
                    <div class="panel-control">
                    </div>
                    <h3 class="panel-title" data-translate="">Barcode</h3>
                </div>
                <div class="panel-body">
                    <div class="col-md-12 ImageContainer" id="item_barcode_zone" style="display: block;">
                        <label class="col-md-12 control-label">Upload Item's Barcode</label>
                        <div id="barcode_item_image" style="display: block;">
                            <input type="hidden" id="tb_bcimageid" value="" />
                            <img id="bind_barcode_image_src" style="width: 60%; height: 66%;" /><br />
                            <br>
                            <button id="btn_changeBarcode" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="changeItemBarcode();"><i class="demo-psi-pen-5 icon-lg"></i>&nbsp; <span class="bold" data-translate="_edit">Edit</span></button>
                            &nbsp &nbsp
                                                    <button id="btn_deleteBarcode" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="deleteBarcode();"><i class="ion-close-circled icon-lg"></i>&nbsp; <span class="bold" data-translate="_delete">Delete</span></button>
                        </div>
                        <div id="barcode_drop_zone" style="display: block;">
                            <button id="btn_uploadbarcode" class="btn btn-dark btn-icon btn-sm btn-rounded" onclick="UploadItemBarcode();" style="padding-left: 3px;"><i class="ion-upload icon-lg"></i>&nbsp;<span class="bold" data-translate="_upload">Upload</span></button>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

    </div>
</asp:Content>

<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
         <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/unitegallery/js/unitegallery.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/unitegallery/themes/tilesgrid/ug-theme-tilesgrid.js")%>'></script>


    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <!--Summernote [ OPTIONAL ]-->
    <link href='<%= ResolveUrl("../../../plugins/summernote/summernote.min.css")%>' rel="stylesheet">
    <!--Summernote [ OPTIONAL ]-->
    <script src='<%= ResolveUrl("../../../plugins/summernote/summernote.min.js")%>'></script>

    <script src='<%= ResolveUrl("../../../plugins/dropzone/dropzone.min.js")%>'></script>
    <link href='<%= ResolveUrl("../../../plugins/dropzone/dropzone.min.css")%>' rel="stylesheet">
    <script src='<%= ResolveUrl("pageMposSellingItem.js")%>'></script>
</asp:Content>
