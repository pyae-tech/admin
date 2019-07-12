<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.Master" AutoEventWireup="true" CodeBehind="pageScoutInformation.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmScoutInformation.pageScoutInformation" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Scout Information</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="">Marketing Scout</a></li>
        <li class="active" data-translate="">Scout Information</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="NewScoutInfo()"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control" style="display:none;">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab" data-translate="">Listing <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <%--                          <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Advanced search</a></li>--%>
                                </ul>
                            </div>
                            <h3 class="panel-title" data-translate="">Search on Scout Information</h3>
                        </div>
                        <div class="panel-body" style="height: 110px;">
                            <div class="tab-content">
                                <div class="col-md-12">

                                   <form class="form-horizontal">


                                        <div class="row">
                                            <div class="form-group">
                                                <div class="col-md-2" style="width: 200px;">
                                                    <div id="btn_search_all_dates"></div>
                                                     </div>

                                                <div class="col-md-2" style="width: 200px;">
                                                    <%--<input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">--%>
                                                        <div id="tb_search_from_date"></div>
                                                </div>                                              

                                                <div class="col-md-3 col-sm-3" style="width: 220px;">
                                                    <div id="tb_TownshipName"></div>                                                   
                                                </div>

                                                <div class="col-md-2" style="width: 200px;">
                                                     <div id="tb_search_uploadedId"></div>                                                </div>

                                                <div class="form-group">
                                                    <div class="col-md-1" style="width: 20px;">
                                                        <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search(); return false;">
                                                            <i class="ion-search"></i>
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>                          
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="row" id="infoList">

            <div class="col-md-12">
                <div class="panel panel-filled" id="ScoutInfoList">
                    <div class="panel-heading">
                        <h3 class="panel-title" data-translate="">Scout Information</h3>

                    </div>
                    <div class="  panel-body panel-body-layer " style="min-height: 450px;">
                      <%--  <table style="display: none">
                            <tbody id="template_row">
                                <tr style="cursor: pointer;" onclick="GetDetailScoutInfoById('[ScoutID]');return false;">
                                    <td style="width: 14%"><small>[ScoutOn]</small><br />
                                        <small style="font-size: small; color: red">&nbsp;   ([ScoutOnMoment])</small>
                                    </td>
                                    <td>[TownshipName]</td>
                                    <td>[ScoutTypeNameEng]</td>
                                    <td style="width: 20%">[CompanyName]</td>
                                    <td>[UploadByName]</td>

                                </tr>
                            </tbody>
                        </table>
                        <div class="table-responsive">
                            <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                <thead>
                                    <tr>
                                        <th style="width: 14%">Scout On</th>
                                        <th>Township</th>
                                        <th>Scout Type</th>
                                        <th>Company</th>
                                        <th>Upload By</th>
                                    </tr>
                                </thead>
                                <tbody id="table_list">
                                </tbody>
                            </table>
                        </div>--%>

                           <div class="dx-viewport demo-container">
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

   <%--     <div class="row">
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


    </div>









</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("pageScoutInformation.js")%>'></script>
</asp:Content>
