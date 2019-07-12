<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_VanSale.master" CodeBehind="SaleOrderByDate.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleOrderByDate.SaleOrderByDate" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <script>
/* Ensure that the demo table scrolls */
    th, td { white-space: nowrap; }
    div.dataTables_wrapper {
        width: 800px;
        margin: 0 auto;
    }
    </script>
    <!--DataTables [ OPTIONAL ]-->
    <link href='<%= ResolveUrl("../../../plugins/datatables/media/css/dataTables.bootstrap.css")%>' rel="stylesheet">
	<link href='<%= ResolveUrl("../../../plugins/datatables/extensions/Responsive/css/responsive.dataTables.min.css")%>' rel="stylesheet">
    <link href='<%= ResolveUrl("../../../plugins/datatables/extensions/FixedColumns/css/fixedColumns.bootstrap.css")%>' rel="stylesheet" />
       <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' rel="stylesheet" />
    <link href='<%=ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' rel="stylesheet" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <!--Page Title-->
    <div id="page-title">
        <h1 class="page-header text-overflow" data-translate="">Order By Date</h1>
    </div>
    <!--End page title-->


    <!--Breadcrumb-->
    <ol class="breadcrumb">
        <li><a href="#"><i class="demo-pli-home"></i></a></li>
        <li><a href="#" data-translate="_sale">Sale</a></li>
        <li class="active" data-translate="">Order By Date</li>
    </ol>
    <!--End breadcrumb-->


</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <%--<form id="form1" runat="server">--%>
    <div id="page-content">
        <div class="panel">
            <div class="panel-body">
                <div class="panel">
                    <div class="tabs-container" id="tab-main">
                        <!--Panel heading-->
                        <div class="panel-heading">
                            <h3><i class="ion-printer"></i>&nbsp;
                            <span data-translate="">Order By Date</span></h3>
                        </div>
                             <div class="col-md-2" style="float:right;margin-top: -61px;">
                                  <form runat="server">
                                      <asp:HiddenField ID="hdnfldOrderid1" runat="server" />
                                   <input type="hidden" id="hf_selected_value" value="" runat="server" />
                                     <asp:Button ID="BtnExportToExcel" runat="server" Text="Export To Excel"   OnClientClick="test();" OnClick="BtnExportToExcel_Click" CssClass="btn btn-mint btn-rounded" />
                                 
                                 </form>
                    </div>
                        <!--Panel body-->
                        <div class="panel-body">
                            <div class="tab-content">
                                <form class="form-horizontal">
                                    <div class="form-group">
                                        <input type="hidden" id="tb_orgid" value="" runat="server" />
                                        <input type="hidden" id="tb_selecteddate" value="" runat="server" />
                                        <input type="hidden" id="tb_routeid" value="" runat="server" />
                                        <input type="hidden" id="tb_customerid" value="" runat="server" />
                                        <div class="col-md-2">
                                            <input type="text" class="form-control" id="tb_search_from_date" placeholder="ေန႕စြဲ">
                                        </div>
                                        <div class="col-md-3">
                                            <div class="btn-group">
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('previous'); return false;">
                                                    <i class="btn-label ion-chevron-left"></i>
                                                    <span data-translate="_front" class="bold">ေရွ႕</span></button>
                                                <button class="btn  btn-primary  btn-rounded  btn-labeled" type="button" onclick="change_date('next'); return false;">

                                                    <span data-translate="_back" class="bold">ေနာက္</span>
                                                    <i class="btn-label ion-chevron-right"></i>
                                                </button>
                                            </div>

                                        </div>
                                        <div class="col-md-3">
                                            <label for="tb_contact_info" class="col-md-3 control-label" data-translate="">Route</label>
                                            <div class="col-md-9">
                                                <select id="tb_route" class="form-control" onchange="SelectChange();"></select>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <label for="tb_contact_info" class="col-md-3 control-label" data-translate="">Customer</label>
                                            <div class="col-md-9">
                                                <select id="tb_customer_name" class="form-control" onchange="SelectChange();"></select>
                                            </div>
                                        </div>
                                    </div>
                                  <%--  <div class="form-group">
                                        <div class="col-md-3">             
                                            <asp:Button ID="BtnExportToExcel" runat="server" Text="Export To Excel" Style="color: #fff; float: right; background: #1c4188" OnClick="BtnExportToExcel_Click" />
                                        </div>
                                    </div>--%>
                                </form>
                                <div class="table-responsive" id="tab-list"  style="display:none;">
                                    <div id="div_result" style="width: 100%;min-height: 300px;border: 0px solid silver;" ></div>
                                </div>

                                  <img src='<%= ResolveUrl("../../../img/nodata.svg")%>' style="width: 70%;" id="img_no_data" />
                                <div id="My_room" <%--style="width: 100%;overflow-x:scroll;"--%>>                                 

                                </div>
                                   <div id="gridContainer"></div>
                                        <div class="options">
                                            <div class="option">
                                                <div id="autoExpand"></div>
                                            </div>
                                        </div>
                            </div>
                        </div>
                        <%--<form class="form-horizontal" runat="server">
                        </form>--%>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>
            </div>
        </div>
    </div>
      <%--</form>--%>
</asp:Content>

<asp:Content ID="Content4" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
      <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/jszip.min.js")%>'></script>
    <script src='<%=ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/datatables/extensions/FixedColumns/js/dataTables.fixedColumns.min.js")%>'></script>
    <script src='<%= ResolveUrl("SaleOrderByDate.js")%>'></script>
</asp:Content>
