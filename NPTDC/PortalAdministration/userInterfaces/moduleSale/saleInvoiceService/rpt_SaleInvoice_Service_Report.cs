using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;
using System.Data;
using System.Reflection;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleInvoiceService
{
    public partial class rpt_SaleInvoice_Service_Report : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_SaleInvoice_Service_Report()
        {
            InitializeComponent();
        }
        public void do_fill_data(string sellVouncherID)
        {
            parameter1.Value = sellVouncherID;
            par_sellvouncherID.Value = sellVouncherID;
            sqlDataSource1.Fill();
        }

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            double totalNet = Convert.ToDouble(GetCurrentColumnValue("TotalServiceCost"));
            double totalSC = Convert.ToDouble(GetCurrentColumnValue("TotalServiceChagres"));            
            int total = Convert.ToInt32(totalNet+ totalSC);
            lbl_numbertotext.Text = NumberToWords(total).ToString()+ " Myanmar Kyats /.";
        }
       
        private void xrPictureBox1_BeforePrint(System.Object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            string test = xrPictureBox1.ImageUrl;
            xrPictureBox1.ImageUrl = GetCurrentColumnValue("ImagePath").ToString();
        }

        private void sc_percent_BeforePrint(System.Object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //double sc_percent = Convert.ToDouble(GetCurrentColumnValue("ServiceChagresPercentage"));
            //if (sc_percent != 0)
            //{
            //    xrLabel23.Text = "(" + sc_percent.ToString() + "% )";
            //}
            //else
            //{
            //    xrLabel23.Text = "";
            //}
        }

        public static string NumberToWords(int number)
        {
            if (number == 0)
                return "zero";

            if (number < 0)
                return "minus " + NumberToWords(Math.Abs(number));

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += NumberToWords(number / 1000000) + " million ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += NumberToWords(number / 1000) + " thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += NumberToWords(number / 100) + " hundred ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "-";

                var unitsMap = new[] { "zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen" };
                var tensMap = new[] { "zero", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words;
        }

    }
}
