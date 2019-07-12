<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageSystemLog.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemLog.pageSystemLog" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>


<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">Detail Information Of Log</h1> 
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->

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
                                </ul>
                            </div>
                            <h3><i class="ion-clock"></i> System Log Detail</h3>
                        </div>

                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <div class="tab-pane fade in " id="tab-list">

                                    
                                      <div id="panel_summary">
                                        <div class="row">
                                            <div class="col-md-5">
                                                <div class="panel-heading"><span>ျပင္ဆင္သည့္ အခ်ိန္</span></div>
                                                 <table style="display: none">
                                                    <tbody id="template_table_log">
                                                        
                                                             <tr style="cursor: pointer;" onclick="showLogItem('[SystemLogID]');return false;">
                                                                    <td class="col-md-3">[UserName]</td>
                                                                    <td class="col-md-2">[LogDateTime]</td>
                                                                 </tr>
                                                    </tbody>
                                                </table>
                                                <div class="table-responsive" style="min-height: 300px; border: 1px solid silver;">
                                                    <table class="table tablesorter table-striped table-hover  table-bordered" id="log_list">
                                                        <thead>
                                                            <tr>

                                                               <th class="col-md-3"> ျပင္သူ</th>
                                                               <th class="col-md-2">ျပင္သည့္အခ်ိန္</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="table_list_log">
                                                        </tbody>
                                                    </table>
                                                </div>

                                                 <div class="row">
                                                <div id="div_pagination_log" style="padding: 10px;" class="row pull-right">
                <input type="hidden" id="hf_current_page_log" value="1" />
                <ul class="pager pager-rounded">
                    <li><span id="lbl_record_count_log" class="lbl_record_count"></span></li>
                    <li><a href="#" class=" btn_pagination_previous_log" onclick="pageJumpToThis(this);return false;"  actionpage=""><i class="ion-chevron-left"></i></a>
                    </li>
                    <li>
                        <input type="number" id="tb_current_page_log" class="tb_current_page" value="1" style="width: 50px; color: black; text-align: right" /></li>
                    <li><a href="#" class="btn_pagination_next_log" onclick="pageJumpToThis(this);return false;" actionpage=""><i class="ion-chevron-right"></i></a></li>
                    <li><span id="lbl_page_count_log" class="lbl_page_count"></span></li>
                    <li><a class=" btn_pagination_jump" href="#" onclick="pageJumpToThis();return false;"><i class="ion-refresh"></i></a></li>
                </ul>
            </div>

                                    </div>

                                            </div>


                                            <div class="col-md-7">
                                                <div class="panel-heading">ျပင္ဆင္သည့္ အေသးစိတ္</div>
                                                <table style="display: none">
                                                    <tbody id="template_row">
                                                        <tr style="cursor: pointer;">
                                                             <td>[FieldName]</td>
                                                             <td>[OldValue]</td>
                                                             <td>[NewValue]</td>                                                    
                                                            
                                                         </tr>
                                                    </tbody>
                                                </table>


                                                <div class="table-responsive" style="min-height: 300px; border: 1px solid silver;">
                                                    <table class="table tablesorter table-striped table-hover  table-bordered" id="panel_list">
                                                        <thead>
                                                            <tr>

                                                               <th>ျပင္သည့္ စာရင္း</th>
                                                              <th>မူလ အေၾကာင္းအရာ</th>
                                                               <th>အသစ္ အေၾကာင္းအရာ</th>
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
    <script src='<%= ResolveUrl("pageSystemLog.js")%>'></script>
</asp:Content>
