<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.master" AutoEventWireup="true" CodeBehind="pageScoutType.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmScoutType.pageScoutType" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">    
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">Scout Types</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#">Van Sale</a></li>
        <li class="active">Scout Types</li>
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
                        <div class="panel-heading">
                            <div class="panel-control">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li> 
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-location"></i> Scout Types</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list" >
                                      <div class="dx-viewport demo-container" id="panel_list_background" style="min-height:300px;" >
                                        <div id="grid_scoutType"></div>
                                        <div class="options">

                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                                    </div>

                                 <%--   <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GetScoutType('[ScoutTypeID]');return false;">
                                                <td>[ScoutTypeNameEng]</td>
                                                <td>[ScoutTypeNameZawGyi]</td>
                                                <td>[ScoutTypeNameUnicode]</td>
                                                <td>[Description]</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th>ScoutType Name(Eng)</th>
                                                    <th>ScoutType Name(Zawgyi)</th>
                                                    <th>ScoutType Name(Unicode)</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>--%>

                                      </div>
                            <%--         <div class="row">
                                                <div id="div_pagination" style="padding: 10px;" class="row pull-right">
                <input type="hidden" id="hf_current_page" value="1" />
                <ul class="pager pager-rounded">
                    <li><span id="lbl_record_count" class="lbl_record_count"></span></li>
                    <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                    </li>
                    <li>
                        <input type="number" id="tb_current_page" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                    <li><a href="#" class="btn_pagination_next" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                    <li><span id="lbl_page_count" class="lbl_page_count"></span></li>
                    <li><a class=" btn_pagination_jump" href="#" onclick="pageJumpToThis();return false;"><i class="ion-refresh"></i></a></li>
                </ul>
            </div>

                                    </div>--%>

                              
                    


                                <div class="tab-pane fade" id="tab-search" style="display:none;">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">

                                                    <div class="form-group">

                                                        <label for="tb_search_text" class="col-md-2 control-label">Name / Code</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search" placeholder="">
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <div class="col-md-6">


                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                                <i class="btn-label ion-backspace"></i>
                                                                <span class="bold">Show All</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold">Search</span></button>


                                                        </div>

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
    </div>




    <div class="modal fade" id="dialogBox_Detail_Form" role="dialog" tabindex="-1" aria-labelledby="demo-default-modal" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!--Modal header-->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"><i class="pci-cross pci-circle"></i></button>
                    <h4 class="modal-title">Scout Types - Detail Infromation</h4>
                </div>

                <!--Modal body-->
                <div class="modal-body">
                    <form class="form-horizontal">
                        <input type="hidden" id="tb_id" value="" />
                       
                        <div class="form-group">

                            <label for="tb_name" class="col-md-3 control-label">Scout Type (English)</label>
                            <div class="col-md-5">
                                <input type="text" class="form-control" id="tb_eng_name" placeholder="Enter Name (English)">
                            </div>
                        </div>
                            
                          <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">Scout Type (Zawgyi)</label>
                                  <div class="col-md-5">
                                 <input type="text" class="form-control" id="tb_zawgyi_name" placeholder="Enter Name (ZawGyi)">
                                    </div>
                              </div>

                        <div class="form-group">
                                <label for="tb_code" class="col-md-3 control-label">Scout Type (Unicode)</label>
                                  <div class="col-md-5">
                                 <input type="text" class="form-control" id="tb_unicode_name" placeholder="Enter Name (Unicode)">
                                    </div>
                              </div>

                          <div class="form-group">
                                <label for="tb_description" class="col-md-3 control-label">Description</label>
                                   <div class="col-md-9">
                                    <textarea class="form-control" rows="3" placeholder="Enter Description" id="tb_description"></textarea>
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
                    <button class="btn btn-primary  btn-rounded  btn-labeled" type="button" onclick="SaveCity();return false;"><i class="btn-label ion-checkmark"></i><span class="bold">Save</span></button>
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
     <script src='<%= ResolveUrl("pageScoutType.js")%>'></script>
</asp:Content>
