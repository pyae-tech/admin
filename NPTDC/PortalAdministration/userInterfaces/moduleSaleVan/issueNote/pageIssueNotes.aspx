<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.Master" AutoEventWireup="true" CodeBehind="pageIssueNotes.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSaleVan.issueNote.pageIssueNotes" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
       <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
    <style>
        .full-width {
     height:19px;
     width:58.72px;
     display:inline-block;
     padding-top:4px;
     padding-bottom:5px;
}
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="_issuenote">Issue Note</h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_vansale">Van Sale</a></li>
        <li class="active" data-translate="_issuenote">Issue Note</li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/issue');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span> <span class="pull-right badge badge-primary list_count">0</span></a></li>
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab"><span data-translate="_advancedsearch">Advanced search</span></a></li>
                                </ul>
                            </div>
                           
                        </div>
                         <h3><i class="ion-printer">&nbsp;</i><span data-translate="_daily_issuenote">Daily Issue Notes</span> <span class="list_total_amount"></span></h3>
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
                                                        <span class="bold" data-translate="_front">ေရွ႕</span></button>
                                                    <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">
                                                        <span class="bold" data-translate="_back">ေနာက္</span>
                                                        <i class="btn-label ion-chevron-right"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            <div class="col-md-4"></div>
                                          
                                            <div class="col-md-1">

                                                 <div class="checkbox pad-btm text-left">
                                                    <input value="" type="checkbox" id="btn_search_all_dates" class="magic-checkbox" />
                                                    <label for="btn_search_all_dates">Range</label>
                                                </div>

                                            </div>

                                               <div class="col-md-2  col-sm-3">
                                                 <input type="text" class="form-control" id="tb_search_to_date" placeholder="ေန႕စြဲ">
                                            </div>
      <%--                                      <div class="col-md-5">
                                                <ul class="pager pager-rounded" style="margin: 0px;">
                                                    <li><span class="lbl_record_count"></span></li>
                                                    <li><a href="#" class=" btn_pagination_previous" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-left"></i></a>
                                                    </li>
                                                    <li>
                                                        <input type="number" id="tb_current_page2" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                                                    <li><a href="#" class="btn_pagination_next" onclick="pageJump(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                                                    <li><span class="lbl_page_count"></span></li>
                                                    <li><a class=" btn_pagination_jump" href="#" onclick="pageJumpToThis();return false;"><i class="ion-refresh"></i></a></li>
                                                </ul>

                                            </div>--%>
                                        </div>

                                    </form>
                                          <div class="dx-viewport demo-container" id="panel_list_background" style="min-height: 300px;">
                                        <div id="gridContainer"></div>
                                        <div class="options">

                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                                    </div>
                              <%--      <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GotoPage('Portal/issue?id=[IssueNoteID]');return false;">
                                                <td>[IssueNoteNo]</td>
                                                <td>[IssueDate]</td>
                                                <td>[CarNo]</td>
                                                <td>[WayNo]</td>
                                                <td>
                                                    <div class="label label-table [statusColor]" style="font-weight: normal;">[Status]</div>
                                                </td>
                                                <td>[ApproveStatus]</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div class="table-responsive" style="min-height: 300px;  border: 1px solid silver;" id="panel_list_background">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="_issueno">Issue No.</th>
                                                    <th data-translate="_issuedate">Issue Date</th>
                                                    <th data-translate="_carno">Car No</th>
                                                    <th data-translate="_way">Way</th>
                                                    <th data-translate="_status">Status</th>
                                                    <th></th>

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

                                    </div>--%>

                                </div>

                              <%--  <div class="tab-pane fade" id="tab-search">
                                    <div class="panel-body">
                                        <div class="panel  panel-filled panel-c-accent">

                                            <div class="panel-body">
                                                <form class="form-horizontal">
                                                    <div class="form-group">
                                                        <label for="tb_search_text" class="col-md-2 control-label" data-translate="_name_code">Search Text</label>
                                                        <div class="col-md-6">
                                                            <input type="text" id="tb_search_OutTypeName" class="form-control"/>
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
                                </div>--%>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>


</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/backDetect/jquery.backDetect.js")%>'></script>
    <script src='<%= ResolveUrl("pageIssueNotes.js")%>'></script>
</asp:Content>
