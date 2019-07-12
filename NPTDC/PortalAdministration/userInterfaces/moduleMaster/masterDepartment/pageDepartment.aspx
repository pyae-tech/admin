<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_MasterBook.Master" AutoEventWireup="true" CodeBehind="pageDepartment.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterDepartment.pageDepartment" %>

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
        <h1 class="page-header text-overflow">Department</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">Master</a></li>
        <li class="active">Departments</li>
          <li class="active"> <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
      
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li> 
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                           
                        </div>
                         <h3><i class="ion-home"></i> Departments</h3>
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
                    <h4 class="modal-title">Department - Detail Infromation</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />
                       
                     
                                                        <div class="form-group">
                                                            <label for="tb_name" class="col-md-3 control-label">Department Name</label>
                                                            <div class="col-md-5">
                                                                <input type="text" class="form-control" id="tb_name" placeholder="Enter Department Name">
                                                            </div>
                                                             <label for="tb_position_code" class="col-md-1 control-label">Code</label>
                                                            <div class="col-md-3">
                                                                <input type="text" class="form-control" id="tb_code" placeholder="Enter Department Code">
                                                            </div>
                                                        </div>
                                       <div class="form-group">
                                       <label for="tb_address" class="col-md-3 control-label">Payment Type</label>
                                       <div class="col-md-3">
                                       <select id="ddl_pay_type" class="form-control">
                                       <option value="MMK">MMK</option>
                                       <option value="USD">USD</option>
                                       </select>
                                       </div>
                          
                                        </div>
                                             

                                                        <div class="form-group">
                                                            <label for="tb_remark" class="col-md-3 control-label">မွတ္ခ်က္</label>
                                                            <div class="col-md-9">
                                                                <textarea class="form-control" rows="3" placeholder="မွတ္ခ်က္" id="tb_remark"></textarea>
                                                            </div>
                                                        </div>
                  
                        <div class="form-group">
                                <label for="tb_note" class="col-md-3 control-label"></label>
                            <div class="col-md-9" >
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
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveDepartment();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold">Delete</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">New</span></button>
                         <button  data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" ><i class="btn-label ion-close"></i><span class="bold">Close</span></button>

                     
                </div>
            </div>
        </div>
    </div>



</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
     <script src='<%= ResolveUrl("pageDepartment.js")%>'></script>
</asp:Content>
