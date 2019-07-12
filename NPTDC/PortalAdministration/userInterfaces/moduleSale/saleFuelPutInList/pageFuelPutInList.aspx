<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_CustomerGroupLogin.Master" AutoEventWireup="true" CodeBehind="pageFuelPutInList.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleFuelPutInList.pageFuelPutInList" %>

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
        <li><a href="#" data-translate="">Customer Group </a></li>
        <li class="active" data-translate="">Fueling PutIn </li>
        <%-- <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/customergroupservice');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="">New</span></button>
        --%>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div  id="page-content">

        <div class="panel">
            <div class="panel-body">
                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading">
                            <div class="panel-control" style="display: none;">
                                <ul class="nav nav-tabs">
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span><span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab" data-translate="_search">Search</a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-archive"></i>&nbsp;<span data-translate="">Fueling Put In</span><span class="list_total_amount"></span></h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body" id="backdetect">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">


                                    <form class="form-horizontal">
                                        <div class="form-group">
                                          
                                            <div class="col-md-2">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-2">
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
                                            <div class="col-md-2  col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>

                                           <%-- <div class="col-md-4" id="demo-dp-range">
					                                <div class="input-daterange input-group" id="datepicker">
					                                    <input type="text" class="form-control" id="tb_search_from_date" name="start" />
					                                    <span class="input-group-addon">to</span>
					                                    <input type="text" class="form-control" id="tb_search_to_date" name="end" />
					                                </div>
					                            </div>
                                            --%>
                                            <div class="col-md-3">
                                                <input type="hidden" id="hf_customergroup" value="" />
                                                <select id="ddl_customergroup" class="form-control demo_select2"></select>

                                            </div>
                                <div class="col-md-3">

                                               <%-- <select id="ddl_orderby" class="form-control">
                                                    <option value="date">Date</option>
                                                    <option value="ppl">Price Per Liter</option>
                                                    <option value="typetower">Type of Tower</option>
                                                </select>--%>
                               <input type="hidden" id="hf_typeoftower" value="" />
                               <select id="ddl_typeoftower" class="form-control chzn-select demo_select2"></select>

                                            </div>
                                        </div>

                                    </form>
                                    <table style="display: none;" id="template_table">
                                        <tbody id="template_row">
                                            <tr class="indexed" style="cursor: pointer;" onclick="GoService('[ServiceID]');return false;">
                                            
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive">
                                        <table class="sortable-table indexed table" id="panel_list">
                                            <thead>
                                                <tr class="sorter-header" id="fpi_table_Header">
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

                                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="">Site Code</label>
                                                        <div class="col-md-6">
                                                            <input type="text" class="form-control" id="tb_search" placeholder="Enter Site Code">
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
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/SortTableByContent/js/table-sorter.js")%>'></script>
    <link href='<%= ResolveUrl("../../../plugins/SortTableByContent/css/table-sorter.css")%>' rel="stylesheet" />
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemApproval/controlApproval.js")%>'></script>
    <script src='<%=ResolveUrl("pageFuelPutInList.js")%>'></script>
</asp:Content>
