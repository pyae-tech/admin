<%@ Page Title="" Language="C#" MasterPageFile="~/PortalAdministration/userInterfaces/moduleSystem/masterFiles/FullFrameMaster_NPTDC.Master" AutoEventWireup="true" CodeBehind="pageAttachment.aspx.cs" Inherits="SBSPortal3.PortalAdministration.userInterfaces.moduleSystem.systemImage.pageAttachment" %>

<%@ Register Assembly="DevExpress.Web.v17.2, Version=17.2.5.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Src="~/PortalAdministration/userInterfaces/moduleSystem/systemImage/UploadedFilesContainer.ascx" TagPrefix="uc1" TagName="UploadedFilesContainer" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder_CSS" runat="server">
    <%--start highlighted block--%>
    <link href='<%= ResolveUrl("attachment.css")%>' rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.spa.css")%>' />
    <link rel="stylesheet" type="text/css" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.common.css")%>' />
    <link rel="dx-theme" data-theme="generic.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.light.css")%>' />
    <link rel="dx-theme" data-theme="android5.light" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.android5.light.css")%>' />
    <link rel="dx-theme" data-theme="ios7.default" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.ios7.default.css")%>' />
    <link rel="dx-theme" data-theme="win10.black" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.black.css")%>' />
    <link rel="dx-theme" data-theme="win10.white" href='<%= ResolveUrl("../../../plugins/WidgetsGallery/css/dx.win10.white.css")%>' />
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
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder_Header" runat="server">
    <br />
  
    <!--Page Title-->
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <div id="page-title">
        <h1 class="page-header text-overflow">ဖိုင်လ်တင်ရန် <i class="ion-ios-cloud-upload"></i> </h1>
    </div>
    <!--~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
    <!--End page title-->


    

</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder_Body" runat="server">
     
    <div id="page-content">


        <div class="row">
            <div class="panel  ">
                <div class="panel-heading">
                    <div class="panel-control">
                    </div>
                    <br />
                    <h3 class="panel-title" data-translate="">နောက်ဆက်တွဲ အချက်အလက် ဖိုင်လ်များတင်ရန်</h3>
                </div>
                <div class="panel-body">
                  

                  <div class="col-md-12" style="border:1px solid #ddd;min-height:600px;">
                      <form  id="form1">
                        <div class="demo-container" style="min-height: 100%">
                            <div id="fileuploader">
                                <div class="widget-container">
                                    <div id="file-uploader"></div>
                                    <div class="content" id="selected-files">
                                        <div>
                                            <h4>တင်မည့် ဖိုင်လ် ရွှေးချယ်ပါ။</h4>
                                        </div>
                                    </div>
                                </div>
                                <div class="options">
                                    <div class="caption">အခြားရွှေးချယ်ခြင်း</div>
                                    <div class="option">
                                        <span>ဖိုင်လ် အမျိုးအစား</span>
                                        <div id="accept-option"></div>
                                    </div>
                                    <div class="option">
                                        <span>ပုံစံ</span>
                                        <div id="upload-option"></div>
                                    </div>
                                    <div class="option">
                                        <div id="multiple-option"></div>
                                    </div>
                                    <div class="option">
                                        <br/><br /> 
                                         <button data-dismiss="modal" class="btn btn-danger  btn-rounded  btn-labeled btn-large" type="button" onclick="window.close();"><i class="btn-label ion-close"></i><span class="bold" >ပိတ်မည်</span></button>


                                    </div>
                                </div>
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

    <script src='<%= ResolveUrl("../../../plugins/WidgetsGallery/js/dx.all.js")%>'></script>
    <script src='<%= ResolveUrl("Demo.js")%>'></script>
    <script src='<%= ResolveUrl("pageAttachment.js")%>'></script>
</asp:Content>
