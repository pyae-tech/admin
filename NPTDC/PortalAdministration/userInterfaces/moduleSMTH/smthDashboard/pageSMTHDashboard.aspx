<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster.Master" AutoEventWireup="true" CodeBehind="pageSMTHDashboard.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSMTH.smthDashboard.pageSMTHDashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">

    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' />
    <link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
    <!--Page content-->
    <!--===================================================-->
    <div id="page-content">


        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal">
                    <input type="hidden" id="tb_id" value="" />
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control">
                            </div>
                            <h3 class="panel-title" data-translate="">Search</h3>
                        </div>
                        <div class="panel-body">
                            <div class="form-group row">


                                <div class="col-md-2">
                                <div id="dx_customergroup"></div>
                                </div>
                               

             
                                <div class="col-md-2">
                                   <%-- <input type="hidden" id="hf_typeoftower" value="" />
                                    <select id="ddl_typeoftower" class="form-control  demo_select2"></select>--%>
                                    <div id="ddl_typeoftower"></div>
                                </div>
                                <div class="col-md-2" style="margin-top: -20px; margin-left: -15px;">
                                    <input type="file" class="upload" id="f_UploadFile" onchange="readURL(this)" style="visibility: hidden;" multiple>

                                    <input type="button" value="Browse" onclick="document.getElementById('f_UploadFile').click()" class="btn btn-warning  btn-rounded  btn-labeled">
                                    <button class="btn btn-purple  btn-rounded  btn-labeled" id="btn_imported" type="button" onclick=" CheckAndDeleteOldRecord()" disabled><span class="bold">Import Excel</span></button>

                                </div>

                            </div>



                        

                    </div>
                        </div>
                </form>

            </div>

        </div>

        <div class="row"  id="panel_list_background">
            <div class="col-md-6">
                <form id="form1" runat="server">
                    <input type="hidden" id="tb_po_received_id" value="" />
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="">Fuel Data of Site </span></h3>
                        </div>
                        <div class="panel-body">
                            <div style="width: 100%;border: 1px solid gray;min-height: 500px;"><br />
                                  <div id="pie" style="height: 400px;"></div>
                                <hr />
                                   <div id="gridContainer" style="width: 97%;margin-left:10px; height: 400px;"></div>
                            </div>
                           

                        </div>
                    </div>
                </form>
            </div>
            <div class="col-md-6">
                <form class="form-horizontal">
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="panel-control"></div>
                            <h3 class="panel-title"><span data-translate="">Site on Map</span></h3>
                        </div>
                        <div class="panel-body" style="min-height: 500px;">
                            <!-- Map box -->
                            <div class="map" style="width: 100%; height: 800px; border: 1px solid gray;"></div>
                        </div>
                    </div>
                </form>
            </div>

        </div>
    </div>
    <!--===================================================-->
    <!--End page content-->
  

</asp:Content>
<asp:Content ID="Content4" ContentPlaceHolderID="cph_slider_general_bar" runat="server">
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="ContentPlaceHolder_SliderMenu" runat="server">
</asp:Content>
<asp:Content ID="Content6" ContentPlaceHolderID="ContentPlaceHolder_JS" runat="server">
    <script>
        $('#container').removeClass("mainnav-lg");
        $('#container').addClass("mainnav-out slide");

    </script>
    <script type="text/javascript" src='<%= ResolveUrl("https://maps.google.com/maps/api/js?key=AIzaSyBRph29gJJ_G4zVm-qtjLLpYt2GXv2ePLY&callback=initMap")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/map/gmap3.js")%>'></script>
      <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/cldr.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/cldr/event.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/cldr/supplemental.min.js")%>'></script>
    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/cldr/unresolved.min.js")%>'></script>
    <script type="text/javascript" src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/globalize.min.js")%>'></script>
    <script type="text/javascript" src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/globalize/message.min.js")%>'></script>
    <script type="text/javascript" src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/globalize/number.min.js")%>'></script>
    <script type="text/javascript" src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/globalize/currency.min.js")%>'></script>
    <script type="text/javascript" src='<%= ResolveUrl("../../../../js/globalize/date.min.js")%>'></script>
      <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
   
       <script src='<%= ResolveUrl("pageSMTHDashboard.js")%>'></script>

</asp:Content>
