<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.master" AutoEventWireup="true" CodeBehind="pageDepartmentDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleMaster.masterDepartment.pageDepartmentDetail" %>
<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
      <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><i class="ion-home"></i> ဌာနများ</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">စနစ် စီမံခြင်း </a></li>
        <li class="active">ဌာနများ</li>
          <li class="active"> <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">အသစ်</span></button>
      
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
                        <div class="panel-heading">
                            <div class="panel-control" style="display: none;">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                              <h3><i class="ion-briefcase"></i>&nbsp;<span data-translate="">ဌာန - အချက်အလက် အသေးစိတ်</span></h3>

                        </div>
                      
                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list" style="min-height:700px;">
                                     <div class="modal-body">


                                        <div class="col-md-9">
                                            <form id="form" class="form-horizontal">
                                                <input type="hidden" id="tb_id" value="" />

                                                <div class="form-group">
                                                            <label for="tb_name" class="col-md-3 control-label">ဌာန အမည်</label>
                                                            <div class="col-md-9">
                                                                <input type="text" class="form-control" id="tb_name" placeholder="ဌာန အမည်">
                                                            </div>
                                                        </div>
                                       <div class="form-group">
                                       <label for="tb_address" class="col-md-3 control-label">အီးမေး(လ်)</label>
                                      <div class="col-md-9">
                                          <input type="text" class="form-control" id="tb_notifyemail" placeholder="အီးမေး(လ်)"/>
                                      </div>
                          
                                        </div>
                           <div class="form-group">
                                                            <label for="tb_remark" class="col-md-3 control-label">Protocol</label>
                                                            <div class="col-md-9">
                                                                <input type="text" class="form-control" placeholder="Protocol" id="tb_protocol"/>
                                                            </div>
                                                        </div>
                                  <div class="form-group">
                                                            <label for="tb_remark" class="col-md-3 control-label">အကြောင်းအရာ</label>
                                                            <div class="col-md-9">
                                                                <input type="text" class="form-control" placeholder="အကြောင်းအရာ" id="tb_description"/>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label for="tb_remark" class="col-md-3 control-label">မှတ်ချက်</label>
                                                            <div class="col-md-9">
                                                                <textarea class="form-control" rows="5" placeholder="မှတ်ချက်" id="tb_remark"></textarea>
                                                            </div>
                                                        </div>


                                                <div class="form-group">
                                                    <label for="tb_note" class="col-md-3 control-label"></label>
                                                    <div class="col-md-4">
                                                        <small><span id="lbl_created"></span></small>
                                                        <br />
                                                        <small><span id="lbl_modified"></span></small>
                                                        <br />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label class="col-md-3"></label>
                                                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveDepartment();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">စာရင်းသိမ်းရန်</span></button>
                    <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;">
                        <i class="btn-label ion-trash-b"></i><span class="bold">ဖျက်ရန်</span></button>
                    <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="LoadNew();return false;"><i class="btn-label ion-plus-round"></i><span class="bold">အသစ်</span></button>
                    <button data-dismiss="modal" class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/departments');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">ပိတ်မည်</span></button>
                                                

                                                </div>
                                                
                                            </form>                                

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
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%= ResolveUrl("pageDepartmentDetail.js")%>'></script>
</asp:Content>
