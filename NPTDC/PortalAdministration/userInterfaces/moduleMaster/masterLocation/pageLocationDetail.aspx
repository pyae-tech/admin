<%@ Page Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.Master" AutoEventWireup="true" CodeBehind="pageLocationDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterLocation.pageLocationDetail" %>


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
        <h1 class="page-header text-overflow" data-translate="_warehouse">Warehouse</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_materbook">Master Data</a></li>
        <li class="active" data-translate="_warehouse">Warehouse</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab" data-translate="_Listing">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            
                        </div>
                        <h3><i class="ion-location" data-translate="_warehouse">&nbsp;Warehouse</i></h3>
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
                    <h4 class="modal-title" data-translate="_warehousedetInfo">Warehouse - Detail Information</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />

                        <div class="form-group">

                            <label for="tb_name" class="col-md-2 control-label" data-translate="_locationcode">Location Code</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_name1" placeholder="Enter Location Code">
                            </div>

                            <label for="tb_code" class="col-md-2 control-label" data-translate="_locationname">Location Name</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="tb_name2" placeholder="Enter Location Name">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="tb_code" class="col-md-2 control-label" data-translate="_contactinfo">Contact Info</label>
                            <div class="col-md-10">
                                <input type="text" class="form-control" id="tb_code" placeholder="Enter info">
                            </div>
                          <%--  <label for="tb_seq" class="col-md-2 control-label" data-translate="_agent">Agent</label>
                            <div class="col-md-4">
                                <input type="hidden" id="hf_agent_id" />
                                <select id="tb_agent" class="form-control"></select>
                            </div>--%>
                        </div>

                           <div class="form-group">
                                          
                                        <label for="tb_location" class="col-md-2 control-label" style="text-align: right;" data-translate="_isdefloc">Is DefaultLocation</label>
                                       <div class="col-md-1" style="width:5%;" >
                                            <input type="checkbox" class="form-control" id="cb_deflocation">
                                        </div>
                                      
                                    </div>

                        <div class="form-group">
                            <label for="tb_description" class="col-md-2 control-label" data-translate="_remark">Remark</label>
                            <div class="col-md-10">
                                <textarea class="form-control" rows="2" placeholder="Enter remark" id="tb_description"></textarea>
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
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveLocation();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
                     <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GoToLog();return false;"><i class="btn-label ion-clock"></i><span class="bold" data-translate="_log">Log</span></button>
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
    <script src='<%= ResolveUrl("masterLocationDetail.js")%>'></script>
</asp:Content>

