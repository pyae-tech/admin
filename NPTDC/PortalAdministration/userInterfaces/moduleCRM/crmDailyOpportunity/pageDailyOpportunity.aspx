<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.Master" AutoEventWireup="true" CodeBehind="pageDailyOpportunity.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmDailyOpportunity.pageDailyOpportunity" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/crmActivityPlugin/controlActivity.ascx" TagPrefix="uc1" TagName="controlActivity" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow"><span data-translate="">Daily Opportunity</span></h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#"><span data-translate="">Marketing Scout</span></a></li>
        <li class="active"><span data-translate="">Daily Opportunity</span></li>
        <li class="active">
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('Portal/dailyopportunity');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
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
                                    <li class="tab-menu" id="tab_list_menu"><a href="#tab-list" data-toggle="tab"><span data-translate="_Listing">Listing</span> <span class="pull-right badge badge-primary list_count">0</span></a></li> 
                                    <li class="tab-menu" id="tab_search_menu"><a href="#tab-search" data-toggle="tab"><span data-translate="_search">Search</span></a></li>
                                </ul>
                            </div>
                            <h3><i class="ion-gear-b">&nbsp;</i><span data-translate="">Daily Opportunity</span> </h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">
                                       <form class="form-horizontal">
                                        <div class="form-group">

                                            <div class="col-md-2 col-sm-3">
                                                <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                            </div>

                                            <div class="col-md-4 col-sm-4" >
                                                <div class="btn-group">
					                            <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                    <i class="btn-label ion-chevron-left"></i>
                                                    <span data-translate="_front" class="bold">ေရွ႕</span></button>
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;"> 
                                                    <span data-translate="_back" class="bold">ေနာက္</span>    <i class="btn-label ion-chevron-right"></i></button>
					                        </div>
                                               
                                            </div>


                                        
                                            <div class="col-md-1">
                                                 
                                            </div>
                                            
                                            <div class="col-md-2 col-sm-3">
                                                <div class="checkbox pad-btm text-right">
					                          <input value="" type="checkbox" id="btn_search_all_dates" class="magic-checkbox"  checked="checked"/>
					                            <label for="btn_search_all_dates">All</label>
					                        </div> 
                                            </div>
                                           <%-- <div class="col-md-1"></div>--%>
                                             <div class="col-md-3">
                                                <div class="input-group mar-btm">
					                        <span class="input-group-btn">
					                            <button class="btn btn-primary" type="button"><i class="ion-connection-bars"></i></button>
					                        </span>
					                             <select id="ddl_sorting" class="form-control">
                                                     <option value="All" selected>All</option>
                                                     <option value="New">New</option>
                                                     <option value="On Progress">On Progress</option>
                                                     <option value="Cancelled">Cancelled</option>
                                                     <option value="Success">Success</option>
                                                     <option value="Pending">Pending</option>
                                                     <option value="FollowUp">FollowUp</option>
					                             </select>                                                    					                     
					                    </div>
                                            </div>  
                                           
                                        </div>





                                    </form>
                                    <table style="display: none">
                                        <tbody id="template_row">
                                            <tr style="cursor: pointer;" onclick="GotoPage('Portal/dailyopportunity?id=[OpportunityID]');return false;">
                                                <td>[OpportunityDate]</td>
                                                <td>[LeadName]</td>
                                                <td>[LeadCompany]</td>
                                                <td>[Source]</td>
                                                <td>[Status]</td>
                                               
                                                
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="table-responsive" style="min-height: 300px; border:1px solid silver;" id="panel_list_background">
                                        <table class="table table-striped table-hover  table-bordered" id="panel_list">
                                            <thead>
                                                <tr>
                                                    <th data-translate="" class="col-md-2">Date</th>
                                                    <th data-translate="" class="col-md-3">Lead Name</th>
                                                    <th data-translate="" class="col-md-3">Lead Company</th>
                                                    <th data-translate="" class="col-md-3">Source</th>
                                                    <th class="col-md-1">Status</th>
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
                                                                <span class="bold" data-translate="">Show All</span></button>

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
    <script src='<%= ResolveUrl("pageDailyOpportunity.js")%>'></script>
</asp:Content>
