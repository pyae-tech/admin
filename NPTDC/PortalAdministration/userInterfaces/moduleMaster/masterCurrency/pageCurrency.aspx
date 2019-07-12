<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.Master" AutoEventWireup="true" CodeBehind="pageCurrency.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterCurrency.pageCurrency" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
     <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
         .customClass {
       height: 300px !important;
}

    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Currency</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li data-translate=""><a href="#">Master</a></li>
        <li class="active" data-translate="">Currency</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translator="_new">New</span></button>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="panel">
            <div class="panel-body">



                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading" style="display:none;">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab" data-translate="">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                          
                        </div>
                          <h3><i class="ion-social-usd"></i>&nbsp;&nbsp;<span data-translate="">Currency</span></h3>
                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                  <div class="tab-pane fade in " id="tab-list" style="min-height:700px;">
                                    <div class="dx-viewport demo-container" id="panel_list_background" style="min-height: 300px;">
                                        <div id="gridContainer"></div>
                                        <div class="options">

                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>



                               
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </div>




    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title" data-translate="">Currency - Detail Infromation</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />

                        <div class="form-group">
                            <label for="tb_currencyname" class="col-md-2 control-label" data-translate="">Currency Name</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_currencyname" placeholder="Enter Currency Name">
                            </div>
                              <label for="tb_currencycode" class="col-md-2 control-label" data-translate="">Currency Code</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_currencycode" placeholder="Enter Currency Code">
                            </div>
                        </div>

                       <div class="form-group">
                           <%-- <label for="tb_seq" class="col-md-2 control-label" data-translate="">Exchange Rate</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_exchangerate" style="text-align:right;"  onkeypress="return NumberExpressionWithoutSign(event.key)" placeholder="Enter Exchange Rate" >
                            </div>--%>
                             <label for="tb_description" class="col-md-2 control-label"></label>
                            <div class="col-md-4">
                                 <input id="cb_defaultcur" class="magic-checkbox" type="checkbox">
                                 <label for="cb_defaultcur">Default Currency</label>&nbsp
                            </div>
                           
                        </div>

                      


                        <div class="form-group">
                            <label for="tb_remark" class="col-md-2 control-label" data-translate="_remark">Remark</label>
                            <div class="col-md-10">
                                <textarea class="form-control" rows="3" placeholder="Enter Remark" id="tb_remark"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_note" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <small><span id="lbl_created"></span></small>
                                <br />
                                <small><span id="lbl_modified"></span></small>
                                <br />
                            </div>
                        </div>
                    </form>
                </div>
                <!--Modal footer-->
                <div class="modal-footer">
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                     <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>


                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
       <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%= ResolveUrl("pageCurrency.js")%>'></script>
</asp:Content>
