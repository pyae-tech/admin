﻿using DevExpress.XtraPrinting;
using DevExpress.XtraReports.UI;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Text;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using DevExpress.Web;
using DevExpress.RichEdit;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class PageRequestReport : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            if (IsPostBack == false)
                do_load_report();
        }
        rpt_request_report the_report;
        void do_load_report()
        { 

            string search_reqid = Request.QueryString["id"];
            string search_deoid = Request.QueryString["DepartmentId"];
              the_report = new rpt_request_report();
            
            if (search_deoid != "")
            {
                the_report.do_fill_data(search_deoid, search_reqid);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);

               
            }


           
        }
       


        protected void btn_download_Pdf_Click(object sender, EventArgs e)
        {
            string search_reqid = Request.QueryString["id"];
            string search_deoid = Request.QueryString["DepartmentId"];
            the_report = new rpt_request_report();
      
            if (search_deoid != "")
            {
                the_report.do_fill_data(search_deoid, search_reqid);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);



            }
             
            the_report.ExportToDocx("C://Systematic//test.docx", new DocxExportOptions() { TableLayout = false, ExportMode = DocxExportMode.SingleFilePageByPage });
            richEditor_temp.Open("C://Systematic//test.docx");

       
            using (MemoryStream stream = new MemoryStream())
            {
                richEditor_temp.ExportToPdf(stream,new PdfExportOptions() {  PageRange=""});
                DevExpress.Web.Internal.HttpUtils.WriteFileToResponse(Page, stream, "ExportedDocument1", true, "pdf");
               
            }
        }

        protected void LinkButton1_Click(object sender, EventArgs e)
        {
            string search_reqid = Request.QueryString["id"];
            string search_deoid = Request.QueryString["DepartmentId"];
            the_report = new rpt_request_report();

            if (search_deoid != "")
            {
                the_report.do_fill_data(search_deoid, search_reqid);
                the_report.CreateDocument();
                docViwer.OpenReport(the_report);  
            }

            the_report.ExportToDocx("C://Systematic//test.docx", new DocxExportOptions() { TableLayout = false, ExportMode = DocxExportMode.SingleFilePageByPage });
            richEditor_temp.Open("C://Systematic//test.docx");


            using (MemoryStream stream = new MemoryStream())
            {
                richEditor_temp.ExportToPdf(stream, new PdfExportOptions() { PageRange = "" });
                DevExpress.Web.Internal.HttpUtils.WriteFileToResponse(Page, stream, "ExportedDocument1", true, "pdf");

            }
        }
    }
}