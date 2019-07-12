<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_Marketing.Master" AutoEventWireup="true" CodeBehind="pageDailyOpportunityDetail.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleCRM.crmDailyOpportunity.pageDailyOpportunityDetail" %>

<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemComment/controlComment.ascx" TagPrefix="uc1" TagName="controlComment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemApproval/controlApproval.ascx" TagPrefix="uc1" TagName="controlApproval" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemAttachment/ControlAttachment.ascx" TagPrefix="uc1" TagName="ControlAttachment" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/crmActivityPlugin/controlActivity.ascx" TagPrefix="uc1" TagName="controlActivity" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <link href='<%= ResolveUrl("../../../plugins/easyautocomplete/easy-autocomplete.css")%>' rel="stylesheet" />
     <%--start highlighted block--%>
    <script type="text/javascript">
        function onFileUploadComplete(s, e) {
            if (e.callbackData) {
                var fileData = e.callbackData.split('|');
                var fileName = fileData[0],
                    fileUrl = fileData[1],
                    fileSize = fileData[2];
                DXUploadedFilesContainer.AddFile(fileName, fileUrl, fileSize);
            }
        }
    </script>
    <%--end highlighted block--%>
    <style>
        .form-group {
            margin-bottom: 5px;
        }
    </style>

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
    <!--Breadcrumb-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#"><span data-translate="">Marketing Scout</span></a></li>
        <li class="active"><span data-translate="">Daily Opportunity</span></li>
        <li class="active">
            <button class="btn btn-purple  btn-rounded  btn-labeled" type="button" onclick="SaveRecord();return false;"><i class="btn-label ion-checkmark"></i><span class="bold" data-translate="_save">Save</span></button>
            <button class="btn btn-mint  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/dailyopportunity?id=');return false;"><i class="btn-label ion-plus-round"></i><span class="bold" data-translate="_new">New</span></button>
            <button class="btn btn-danger  btn-rounded btn-labeled" type="button" onclick="DeleteRecordConfirmation();return false;"<i class="btn-label ion-trash-b"></i><span class="bold" data-translate="_delete">Delete</span></button>
            <button class="btn btn-dark  btn-rounded  btn-labeled" type="button" onclick="GotoPage('portal/dailyopportunitys');return false;"><i class="btn-label ion-close"></i><span class="bold" data-translate="_close">Close</span></button>

        </li>
    </ol>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">

    <div id="page-content">

        <div class="row">


           
            <div class="col-md-12">

                <div class="panel ">
                    <div class="panel-heading">
                        <div class="panel-control">
                        </div>
                         <h3 class="panel-title" data-translate=""><i class="ion-gear-b">&nbsp;</i>Daily Opportunity Detail - Information</h3>
                    </div> 
                    <div class="panel-body">
                        <form class="form-horizontal">
                             <input type="hidden" id="tb_id" value="" />

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="">Opportunity No</label>
                                <div class="col-md-3">
                                    <input type="text" class="form-control" id="tb_opportunityno" readonly="true">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="tb_code" class="col-md-2 control-label" data-translate="">Date</label>
                                 <div class="col-md-3">
                                    <input type="text" class="form-control" id="tb_oppotunitydate">
                                </div>
                                  <label for="tb_code" class="col-md-3 control-label" style="text-align: right;">Status</label>
                              <div class="col-md-3">
                               <select id="ddl_status" class="form-control">
                             <option value="New">New</option>
                             <option value="On Progress">On Progress</option>
                            <option value="Cancelled">Cancelled</option>
                             <option value="Success">Success</option>
                             <option value="Pending">Pending</option>
                            <option value="FollowUp">FollowUp</option>
                                 
                                    </select>
                                       </div>
                            </div>

                            
                             <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" data-translate="">Lead Name</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_leadname" placeholder="Enter Lead Name" />
                                                    </div>
                                                </div>

                             <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" data-translate="">Lead Company</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_leadcompany" placeholder="Enter Lead Company" />
                                                    </div>
                                                </div>

                             <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" data-translate="">Source</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_source" placeholder="Enter Source" />
                                                    </div>
                                                </div>

                           <div class="form-group">
                           <label for="tb_code" class="col-md-2 control-label" data-translate="">Staff</label>
                                                   <div class="col-md-3">
                                 <input type="hidden" id="hf_staffid" value="" />
                                <select id="tb_staffname" class="form-control demo_select2"></select>
                            </div>
                                  <div class="col-md-1">
                                 <span ><i class="ion-ios-plus urllink" style="font-size:21px;" onclick="OpenNewURLInNewTab('staffs');return false;"></i></span>     &nbsp;  
                            <span ><i class="ion-ios-refresh urllink" style="font-size:21px;" onclick="Load_StaffName1_List();return false;"></i></span>     &nbsp;  
                                      </div>
                           
                            <label for="tb_supplier" class="col-md-2 control-label" style="text-align: right;" data-translate="">Supplier</label>
                            <div class="col-md-3">
                                <input type="hidden" id="hf_supplierid" value="" />
                                <select id="tb_supplier" class="form-control demo_select2"></select>
                            </div>
                           
                                 <span ><i class="ion-ios-plus urllink" style="font-size:21px;" onclick="OpenNewURLInNewTab('suppliers');return false;"></i></span>     &nbsp;  
                            <span ><i class="ion-ios-refresh urllink" style="font-size:21px;" onclick="Load_Supplier_List();return false;"></i></span>     &nbsp;  
                           
                          
                        </div>

                          


                              <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" data-translate="">Reference</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_reference" placeholder="Enter Reference" />
                                                    </div>
                                                </div>

                             <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label"  data-translate="">Product</label>
                                                    <div class="col-md-9">
                                                        <input type="text" class="form-control" id="tb_product" placeholder="Enter Product" />
                                                    </div>
                                                </div>

                           <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" style="text-align: right;" data-translate="">Title</label>
                                                    <div class="col-md-9">
                                                         <textarea rows="2"   class="form-control" id="tb_title" placeholder="Enter Title"></textarea>
                                                    </div>
                                                </div>

                             <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" style="text-align: right;" data-translate="">Description</label>
                                                    <div class="col-md-9">
                                                        <textarea rows="2"   class="form-control" id="tb_description" placeholder="Enter Description"></textarea>
                                                    </div>
                                                </div>

                                <div class="form-group">
                                                    <label for="tb_code" class="col-md-2 control-label" style="text-align: right;" data-translate="Remark">Remark</label>
                                                    <div class="col-md-9">
                                                        <textarea rows="3"   class="form-control" id="tb_remark" placeholder="Enter Remark"></textarea>
                                                    </div>
                                                </div>

                            <hr />

                              <div class="form-group">
                       <div class="col-md-2"></div>
                            <div class="col-md-9">
                                <uc1:controlActivity runat="server" ID="controlActivity" />
                                                            </div>
                        </div>
                              <hr />
                         <div class="form-group">
                       <div class="col-md-2"></div>
                            <div class="col-md-9">
                                <uc1:ControlAttachment runat="server" ID="ControlAttachment" />
                                                            </div>
                        </div>

                        <div class="form-group">
                            <label for="" class="col-md-2 control-label"></label>
                            <div class="col-md-9">
                                <uc1:controlComment runat="server" ID="controlComment" />
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
                </div>

              


            </div>





        </div>

       
    </div>

 
</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script src='<%= ResolveUrl("../../../plugins/easyautocomplete/jquery.easy-autocomplete.js")%>'></script>
     <script src='<%=ResolveUrl("../../moduleSystem/crmActivityPlugin/controlActivity.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemAttachment/ControlAttachment.js")%>'></script>
    <script src='<%= ResolveUrl("../../moduleSystem/systemComment/controlComment.js")%>'></script>
    <script src='<%= ResolveUrl("pageDailyOpportunityDetail.js")%>'></script>
</asp:Content>
