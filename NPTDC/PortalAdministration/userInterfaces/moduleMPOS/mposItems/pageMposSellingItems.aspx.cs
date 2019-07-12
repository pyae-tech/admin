using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SBSPortal3.PortalAdministration.userInterfaces.moduleMPOS.mposItems
{
    public partial class pageMposSellingItems : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            string userID = Request.QueryString["UserId"];
            string tt = Request["id"];
            if (Page.Request.Files.Count != 0)
            {
                string filename = "";
                if (Request.Browser.Browser.Contains("InternetExplorer"))
                {
                    filename = System.IO.Path.GetFileName(Page.Request.Files[0].FileName);
                  
                }

                else
                {
                    filename = Page.Request.Files[0].FileName;
                    
                }
               string fileName = filename.Split('.')[0] + "_" + userID + "." + filename.Split('.')[1];
                try
                {
                    Page.Request.Files[0].SaveAs(Server.MapPath("~/PortalAdministration/img/ImportedExcel/" + fileName));
                }
                catch(Exception ex)
                {

                }
               
            }

        }

        #region Export
        protected void BtnExportToExcel_Click(object sender, EventArgs e)
        {

            List<string> search_parameters = tb_orgid.Value.Split('~').ToList();
            string orgid = search_parameters[0];
            if (orgid != "")
            {
                string CS = ConfigurationManager.ConnectionStrings["SS_FriendChildConnectionString"].ConnectionString;
                using (SqlConnection con = new SqlConnection(CS))
                {

                    DataTable myTable = new DataTable();
                    DataSet data = new DataSet();
                    SqlCommand cmd = new SqlCommand("Mst_Item_List", con);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@orgid", orgid);
                    con.Open();
                    SqlDataAdapter dsCommand = new SqlDataAdapter(cmd);
                    dsCommand.Fill(data);
                    con.Close();
                    myTable = data.Tables[0];
                    ExportExcel(myTable);
                }
            }

        }

        public void ExportExcel(DataTable dt)
        {

            IWorkbook workbook;
            string extension = ".xlsx";
            workbook = new XSSFWorkbook();
            ISheet sheet1 = workbook.CreateSheet("Sheet 1");

            // make a header row
            IRow row1 = sheet1.CreateRow(0);
            var boldFont = workbook.CreateFont();
            boldFont.FontHeightInPoints = 11;
            boldFont.FontName = "Zawgyi-One";
            for (int j = 0; j < dt.Columns.Count; j++)
            {

                ICell cell = row1.CreateCell(j);
                // String columnName = dt.Columns[j].ToString();
                cell.SetCellValue(getColumnHeaderName(j));
                cell.CellStyle = workbook.CreateCellStyle();
                cell.CellStyle.SetFont(boldFont);
                sheet1.AutoSizeColumn(j);
            }

            //  loops through data
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                IRow row = sheet1.CreateRow(i + 1);
                for (int j = 0; j < dt.Columns.Count; j++)
                {

                    ICell cell = row.CreateCell(j);
                    String columnName = dt.Columns[j].ToString();
                    string cellValue = "";
                    switch (dt.Rows[i][columnName].GetType().ToString())
                    {
                        case "System.DBNull":
                            cellValue = "";
                            break;

                        default:
                            cellValue = dt.Rows[i][columnName].ToString();
                            //cellValue = dt.Rows[i][columnName].ToString() == "" ? "-" : dt.Rows[i][columnName].ToString();
                            break;
                    }
                    cell.SetCellValue(cellValue);
                    cell.CellStyle = workbook.CreateCellStyle();
                    cell.CellStyle.SetFont(boldFont);
                }
            }

            using (var exportData = new MemoryStream())
            {
                Response.Clear();
                workbook.Write(exportData);
                if (extension == ".xlsx") //xlsx file format
                {
                    string attachment = "attachment; filename=Item List.xlsx";
                    Response.ClearContent();
                    Response.AddHeader("content-disposition", attachment);
                    Response.ContentType = "application/vnd.ms-excel";
                    Response.BinaryWrite(exportData.ToArray());
                }
                else if (extension == "xls")  //xls file format
                {
                    string attachment = "attachment; filename=Item List.xlx";
                    Response.ClearContent();
                    Response.AddHeader("content-disposition", attachment);
                    Response.ContentType = "application/vnd.ms-excel";
                    Response.BinaryWrite(exportData.ToArray());
                }
                Response.End();
            }
        }


        public string getColumnHeaderName(int i)
        {
            int caseSwitch = i;
            string return_header = "";
            switch (caseSwitch)
            {
                case 0:
                    return_header = "ItemCode";
                    break;
                case 1:
                    return_header = "Item Name";
                    break;
                case 2:
                    return_header = "ItemNo";
                    break;
                case 3:
                    return_header = "Item Type Name";
                    break;
                case 4:
                    return_header = "Supplier Name";
                    break;
                case 5:
                    return_header = "Brand Name";
                    break;
                case 6:
                    return_header = "Item Price";
                    break;
                case 7:
                    return_header = "Item Price2";
                    break;
                case 8:
                    return_header = "Item Price3";
                    break;
                case 9:
                    return_header = "Remark";
                    break;
                case 10:
                    return_header = "ShortCode1";
                    break;
                case 11:
                    return_header = "ShortCode2";
                    break;
                case 12:
                    return_header = "WarningLevelQuantity";
                    break;
                case 13:
                    return_header = "PackageLevel1Name";
                    break;
                case 14:
                    return_header = "PackageLevel1Qty";
                    break;
                case 15:
                    return_header = "PackageLevel1SellPrice";
                    break;
                case 16:
                    return_header = "PackageLevel2Name";
                    break;
                case 17:
                    return_header = "PackageLevel2Qty";
                    break;
                case 18:
                    return_header = "PackageLevel2SellPrice";
                    break;
                case 19:
                    return_header = "PackageLevel3Name";
                    break;
                case 20:
                    return_header = "PackageLevel3Qty";
                    break;
                case 21:
                    return_header = "PackageLevel3SellPrice";
                    break;
                case 22:
                    return_header = "NotAvaliable";
                    break;
                case 23:
                    return_header = "UOM";
                    break;
                case 24:
                    return_header = "EcommerceDescription";
                    break;
                case 25:
                    return_header = "IsEcommerce";
                    break;
                case 26:
                    return_header = "ShortDescription";
                    break;
                case 27:
                    return_header = "OrderQtySequence";
                    break;
                case 28:
                    return_header = "MOQ";
                    break;
                case 29:
                    return_header = "CurrencyCode";
                    break;
                default:
                    return_header = "";
                    break;

            }
            return return_header;

        }
        #endregion
    }
}