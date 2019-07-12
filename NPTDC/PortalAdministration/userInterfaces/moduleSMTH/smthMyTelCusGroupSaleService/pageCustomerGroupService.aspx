<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_CustomerGroupLogin.Master" AutoEventWireup="true" CodeBehind="pageCustomerGroupService.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthMyTelCusGroupSaleService.pageCustomerGroupService" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemApproval/controlApproval.ascx" TagPrefix="uc1" TagName="controlApproval" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Services</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="">Sale</a></li>
        <li class="active" data-translate="">Service</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/MyTelServiceDetail');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">New</span></button>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span><span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-archive"></i>&nbsp;<span data-translate="_Services">Services</span><span  class="list_total_amount"></span></h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-3">
                                                <div class="btn-group">
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                        <i class="btn-label ion-chevron-left"></i>
                                                        <span data-translate="" class="bold">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">

                                                        <span data-translate="" class="bold">ေနာက္</span>&nbsp;
                                                        <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>

                                            </div>



                                            <div class="col-md-4">
                                            </div>

                                            <div class="col-md-1">

                                                <div class="checkbox pad-btm text-left">
                                                    <input value="" type="checkbox" id="btn_search_all_dates" class="magic-checkbox" />
                                                    <label for="btn_search_all_dates">Range</label>
                                                </div>

                                            </div>

                                            <div class="col-md-2  col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>

                                        </div>





                                    </form>
                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GotoPage('Portal/MyTelServiceDetail?id=[ServiceID]');return false;">
                                                <td>[ServiceDate]&nbsp&nbsp<small><span>([ServiceStartOn] to [ServiceEndOn])</span></small></td>
                                                <td>[ServiceNo]</td>
                                                <td>[ServiceStatus]</td>
                                                <td>[CustomerNameEng]</td>
                                                <%--<td style="text-align:right;">[TotalAmount]</td>--%>
                                                <td>[UserName]</td>
                                                <td>[AppStatus]</td>
                                                <%-- <td>[ServiceDescription]</td>--%>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="_Service_Date">Service Date</th>
                                                    <th data-translate="_ServiceNo">Service No</th>
                                                    <th data-translate="_Service_Status">Service Status</th>
                                                    <th data-translate="Customer">Customer</th>
                                                    <%--<th style="text-align:right;" data-translate="_total">Total</th>--%>
                                                    <th data-translate="_Service_User">Services User</th>
                                                    <th data-translate="_status">Status</th>
                                                    <%-- <th>Description</th>--%>
                                                </tr>
                                            </thead>
                                            <tbody id="table_list">
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="row">
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

                                    </div>

                                </div>



                                <div class="tab-pane fade" id="tab-search">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">

                                                    <div class="form-group">

                                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="_name_code">Name / Code</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search" placeholder="">
                                                        </div>
                                                    </div>

                                                    <div class="form-group">
                                                        <div class="col-md-2"></div>
                                                        <div class="col-md-6">


                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="clearSearch();return false;">
                                                                <i class="btn-label ion-backspace"></i>
                                                                <span class="bold" data-translate="_showall">Show All</span></button>

                                                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="search();return false;"><i class="btn-label ion-search"></i><span class="bold" data-translate="_search">Search</span></button>


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


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
  <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
    <script src='<%=ResolveUrl("pageCustomerGroupService.js")%>'></script>
</asp:Content>
