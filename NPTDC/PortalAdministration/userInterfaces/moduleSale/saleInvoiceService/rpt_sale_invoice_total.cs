using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using DevExpress.XtraReports.UI;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleSale.saleInvoiceService
{
    public partial class rpt_sale_invoice_total : DevExpress.XtraReports.UI.XtraReport
    {
        public rpt_sale_invoice_total()
        {
            InitializeComponent();
        }
        public void do_fill_data1(string sellVouncherID)
        {
            par_sellvouncherID.Value = sellVouncherID;
            parameter1.Value = sellVouncherID;
            sqlDataSource1.Fill();
        }
       
        double totalsub = 0;

        private void Detail_BeforePrint(object sender, System.Drawing.Printing.PrintEventArgs e)
        {
            //totalsub += Convert.ToDouble(GetCurrentColumnValue("SubTotal"));
            //double totalservice = totalsub * 0.095;
            //double totalnet = totalsub + totalservice;
            //int total = Convert.ToInt32(totalnet);
            //lbl_numbertotext.Text = NumberToWords(total).ToString();
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
