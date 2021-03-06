﻿using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;
using System.Drawing.Text;
using System.Web;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleReport.requsetreport
{
    public partial class rpt_request_report : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_request_report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string depID,string reqID)
        {
            par_depID.Value = depID;
            par_REQID.Value = reqID;
            parameter1.Value = reqID;
            sqlDataSource1.Fill();
        }

        private void xrPictureBox1_BeforePrint(System.Object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            string test = xrPictureBox1.ImageUrl;
            if(GetCurrentColumnValue("ImagePath") != null){
                xrPictureBox1.ImageUrl =
                    "http://localhost:2291/PortalAdministration/img/User_Images/" + GetCurrentColumnValue("ImageName").ToString();
                //GetCurrentColumnValue("ImageName").ToString();

            }

        }
        private void xrSubreport_item_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
           
        }

        private void CalcHeight(XRSubreport subreport)
        {
            //var pi = subreport.ReportSource.GetType().GetProperty("DisplayableRowCount", System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic);
            //var rows = Convert.ToInt32(pi.GetValue(subreport.ReportSource, null));
            //var rowHeight = subreport.ReportSource.Bands.GetBandByType(typeof(DetailBand)).HeightF;

            //var newHeight = rows * rowHeight;
           // xrTableCell3.HeightF = newHeight;
    
        }

        private void rpt_request_report_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //PrivateFontCollection fontColl = new PrivateFontCollection();
            //fontColl.AddFontFile("D:\\01 Source Code\\NYPDC\\NPTDC\\PortalAdministration\\fonts\\Pyidaungsu-2.5_Bold.ttf");
            //rpt_request_report report = (rpt_request_report)sender;
            //foreach (Band b in report.Bands)
            //{
            //    foreach (XRControl c in b.Controls)
            //    {
            //        c.Font = new Font(fontColl.Families[0], c.Font.Size, c.Font.Style);
            //    }
            //}
        }
    }
}
