$(function () {

    // Lets be professional, shall we?
    "use strict";

    // Some variables for later
    var dictionary, set_lang;

    // Object literal behaving as multi-dictionary
    dictionary = {
        "english": {
            "_log": "Log",
            "_edit":"Edit",
            "_save": "Save",
            "_delete": "Delete",
            "_new": "New",
            "_close": "Close",
            "_reflesh": "Reflesh",
            "_upload": "Upload",
            "_createdon": "Created On",
            "_modifiedon": "Modified On",
            "_createdby": "Created By",
            "_modifiedby": "Modified By",
            "_search": "Search",
            "_Listing": "Listing",
            "_detailinfo": "Detail Information",
            "_showall": "Show All",
            "_front": "Previous",
            "_back": "Next",
            "_advancedsearch": "Advanced search",
            "_date": "Date",
            "_name_code": "Name/Code",
            "_description": "Description",
            "_inventory":"Stock",
            "_approve_reject":"Approve / Reject",
            //Cash Flow Menu
            "_cashflow": "Cash Flow",
            "_advanceForm": "Advanced Form",
            "_dailyExpense": "Daily's Expense",
            "_dailyIncome": "Daily's Income",
            "_claim": "Staff's Claim",
            "_monthlyFlow": "Monthly's Flow",
            "_wallet": "Wallets",
            "_walletTransaction": "Wallet Transaction",
            "_walletTransfer": "Wallet Transfer",
            "_billing": "Billing Reminder",
            "_expenseTitle": "Expense titles",
            "_incomeTitle": "Income titles",
            "_signature": "Signature",
            //System Menu
            "_system": "System",
            "_systemorganization": "Organization",

            //Master Menu
            "_materbook": "Master Book",
            "_item": "Item",
            "_itemgroup": "Item Group",
            "_customer": "Customer",
            "_customergroup": "Customer Group",
            "_warehouse": "Warehouse",
            "_ways": "Route Plan",
            "_cars": "Cars",
            "_salestaff": "Sale Staff",
            "_region":"Region",
            "_city": "City",
            "_township": "Township",
            "_creditremain": "Credit Remain",
            "_assetType":"Asset Group",

            //City
            "_cities": "Cities",
            "_code": "Code",
            "_city_name": "City Name",
            "_city_detail": " City - Detail Information",

            //Region
            "_region_name": "Region Name",
            "_region_detail": "Region - Detail Information",

            //Township
            "_townships": "Townships",
            "_township_name": "Township Name",
            "_township_detail":"Township - Detail Infromation",

            //Items
            "_items": "Items",
            "_itemDetailInformation": "Item - Detail Infromation ",
            "_itemno": "Item No.",
            "_itemGroup": "Item Group",
            "_Brand": "Brand",
            "_supplier": "Supplier",
            "_ItemName": "Item Name",
            "_itemBasicPrice": "Item Price (Basic)",
            "_itemPartnerPrice": "Partner",
            "_itemSpecialPrice": "Special",
            "_shortcode1": "Short Code1",
            "_shortcode2": "Short Code2",
            "_wlevel": "Warning Level Quantity",
            "_Quantity": "Quantity",
            "_price": "Price",
            "_packagelevel1": "Package Level 1",
            "_packagelevel2": "Package Level 2",
            "_packagelevel3": "Package Level 3",
            "_remark": "Remark",
            "_itemuom": "UOM",
            "_ShortDescription": "Short Description",
            "_NotAvailable": "Not Available ",
            "_itemmoq": "MOQ",
            

            //Brand

          
            //Van Sale Menu
            "_vansale": "Van Sale",
            "_issuenote": "Issue Note",
            "_loadin": "Load In",
            "_loadout": "Load Out",
            "_cashier": "Cashier",
            "_carSchedule":"Car Schedule",


            //Cash Flow Group
            //Wallettransfer Module
            "_Transferno": "Transfer No",
            "_TransferDate": "Transfer Date",
            "_fromwallet": "From Wallet No",
            "_towallet": "To Wallet No",
            "_OutAmount": "Out Amount",
            "_InAmount": "In Amount",
            "_ExchangeRate": "Exchange Rate",
            "_walletstatus": "Wallet Status",
            "_walletTransferdetailinfo": "Wallet Transfer - Detail Information",

            //Wallet Module
            "_walletname": "Wallet Name",
            "_accinfo": "Account Info",
            "_walletdetailinfo": "Wallet - Detail Information",
            "_currency": "Currency",
            "_isdefwallet": "Is DefaultWallet",

            //Master Data Group
            //Warehouse Module
           
            "_locationcode": "Location",
            "_locationname": "Location Name",
            "_contactinfo":"Contact Info",
            "_agent": "Agent",
            "_isdefloc": "Is Default Location",
            "_warehousedetInfo": "Warehouse - Detail Information",
            "_locationnamecode": "Location Name / Code",

            //Ways Module
            "_routeplan": "Route",
            "_routeno": "Route No",
            "_routename": "Route Name",
            "_routedescr": "Description",
            "_routenamecode": "Route Name / No",
            "_wayplandetinfo": "Way Plan - Detail Information",
            "_routestatus": "Route Status",
            "_routeseq": "Route Sequence",

            //Item Customer Price
            "_itemcustomerprice": "Item Customer Price",

            //Invoice
            
           "_servicecharges": "Service Charges",
            "_totalServiceCost": "Total Service Cost",
            "_sale": "Sale",
            "_invoice": "Invoice",
            "_invoice_information": "Invoice Information",
            "_invoice_no": "Invoice No",
            "_invoice_items": "Invoice Items",
            "_no": "No.",
            "_item_name": "Item Name",
            "_price": "Price",
            "_cost": "Cost",
            "_costing": "Costing",
            "_finalInvoiceCost": "Final Invoice Cost",
            "_other2": "Other 2",
            "_other1": "Other 1",
            "_tax": "Tax",
            "_discount": "Discount",
            "_totalItemCost": "Total Item Cost",
            "_cash": "Cash",
            "_refund_amount": "Refund",
            "_credit_paid": "Credit Collected",
            "_credit_remain": "Credit Remain",
            "_payment": "Payment",
            "_way": "Way",
            "_invoiceComments": "Invoice Comments",
            "_amount": "Amount",
            "_invoicestatus": "Status",
            "_newinvoice": "New Invoice",
            "_SaleInvoices":"Sale Invoices",
            "_saleOrder": "Sale Order",
            "_salebyitem": "Sale By Item",
            "_salebycustomer": "Sale By Customer",
            "_editDesc": "You can edit Description.",

             //Way Sale
            "_waysale": "Way's Sale",
            "_waysaledetail": "Way Sale Detail",
            "_waydate": "Way Date",
            "_wayno": "Way No.",
            "_cashsale": "Cash Sale",
            "_creditsale": "Credit Sale",
            "_balnace": "Balance",
            "_DetailInformationsOfWays":"Detail Informations Of Ways",
            "_waystatus": "Status",
            "_shopskipreason": "Shop Skip Reason",
            "_skipreason": "Skip Reason",

            //Stock Balance 
            "_stockbalance": "Stock Balance",
            "_SoldQty": "Sold Qty",
            "_IssuedQty": "Issue Qty",
            "_RemainingQty": "Remaining Qty",

           

            //Route Customer
            "_routplan": "Route Plan",
            "_vansaleroutes": "Van Sale's Routes",
            "_availablecustomer":"Available Customers",

            //Route Schedule
            "_routeschedule": "Monthly Van's Route",
            "_route": "Route",
            "_carnolist":"Car No List",

            //Car
            "_car": "Car",
            "_carstatus": "Status",
            "_carsaleperson1": "Car Sale Person 1",
            "_carsaleperson2": "Car Sale Person 2",
            "_cardetailinformation": "Car Detail Information",
           

            //Issue Note
            "_issuenoteInformation": "Issue Note Information",
            "_daily_issuenote": "Daily Issue Notes",
            "_issueno": "Issue No.",
            "_issuedate": "Issue Date",
            "_carno": "Car No",
            "_status": "Status",
            "_qty": "Qty",
            "_Issuenote_items": "Issue Note Items",
            "_adminComments": "Admin Comments",
            "_newissue": "New Issue",

            // Issue Note Reason
            "_issueNoteReason": "Reason",
            "_resonCreatedby": "Created By",
            "_resonStatus": "Status",

            //Scout Type
            "_scoutType": "Scout Type",
            "_preparedby": "Prepared By",
            //waysale
            "_waysalecomments": "Way Sales Comments",
            "_totalCashamount": "Total Cash Amount",
            "_totalCreditamount": "Total Credit Amount",
            //Brand
            "_brand": "Brand",
            //Supplier
            "_suppliertitle": "Supplier",
            //department
            "_departmenttitle": "Staff Department",
            //position
            "_positiontitle": "Staff Position",
            //exchangerate
            "_exchangeratedetail": "Exchange Rate",

            //AssessType
            "_asset": "Asset",
            "_assesstypedetail": "AssetType - Detail Information",
            "_assesstype": "Asset Type",
            "_assesstypename": "Asset Group",
            "_assesscode": "AssetType Code",
            "_assessremark": "Remark",

            //Asset
            "_assets": "My Assets",
            "_assetdetail":"Asset - Detail Information",
            "_assessno":"Asset No",
            "_assetname":"Asset Name",
            "_assetypename": "AssetType Name",
            "_originalcode": "Original Asset Code",
            "_purchasedate": "Purchase Date",
            "_receivedon": "Received On",
            "_staffname": "Staff Name",
            "_companycode": "Company Barcode",
            "_warranty": "Warranty",
            "_assessqty": "Qty",
            "_assessprice":"Price",
            "_assesscost":"Cost",
            "_asseremark":"Remark",

            //purchaseorder
            "_purchasetitle":"Purchase Order",
            "_purchaseno":"Purchase No",
            "_purchasddate":"Date",
            "_title":"Title",
            "_suppliername":"Supplier",
            "_itemcost":"Item Cost",
            "_other1title":"Other1 Title",
            "_other1amount":"Amount1",
            "_other2title":"Other2 Title",
            "_other2amount":"Amount2",
            "_finalamount":"Final Amount",
            "_exchangerate":"Exchange Rate",
            "_finaloc":"Final Localamount",
            "_pocurrency":"Currency",
            "_poremark":"Remark",
            "_purchaseheader":"Purchase Order's Information",
            "_purchaserecord":"Purchase Items ",
            "_purno":"No",
            "_puritemname":"Item Name",
            "_purprice":"Price",
            "_purqty":"Qty",
            "_purcost":"Cost",
            "_purremark":"Remark",
            "_dailypur":"Daily Purchase Order",

            "_ordertitle":"Sale Order",
            "_orderdetail":"Daily Sale Order",
            "_orderno":"Order No",
            "_orderdate":"Order Date",
            "_ordcustomer":"Customer",
            "_ordremark":"Remark",
            "_ordrecord":"Order Items",
            "_ordno":"No",
            "_orditemname":"Item Name",
            "_ordqty":"Qty",
            "_orderheader":" Sale Order's Information",
            "_ordstatus":"Status",
           
            "_customerlogin": "Customer Login",

            "_purchase_order_rec": " Purchase Order's Received",
            "_received_on_pur": "  Received On",
            "_rec_item": "Item",
            "_rec_ord_qty": "Order Qty",
            "_rec_qty": "Received Qty",
            "_rec_loc": "Location",
            "rec_searial": "Item Serial",
            "_rec_remarrk": "Remark",
            "_rec_item_list":"Item's Received",

            //advanced
            "add_expense":"Add New Expense",
            "refresh_expense":"Refresh Expense",
            "_adv_header":"Daily Advanced",
            "_advanced_title":"Daily Advanced - Detail Information",
            "_advanced_on":"Advanced Date",
            "_advanced_no":"Advanced No",
            "_advanced_status":"Status",
            "_advanced_description":"Description",
            "advanced_staff":"Staff",
            "advanced_approved":"Approved By",
            "advanced_customer":"Customer",
            "advaned_supplier":"Supplier",
            "advaned_amount":"Advanced Amount",
            "advaned_expense":"Expense",
            "advaned_balance":"Balance",
            "advaned_return_amount":"Return Amount",
            "advanced_return_on":"Return On",
            "expense_date":"Date",
            "expense_title": "Expense Title",
            "amount":"Amount",

            
           

            //Daily Expense
            "ExenseTitle":"Expense Title",
            "Expense_header":"Daily Expense",
            "ExpenseRemark":"",
            "ExpenseHed": "",
            "ExpenseGroup":"Expense group",
            "ExpenseRecord":"Records",
            "ExpenseAmount":"Amount",
            "ExpenseDate":"Date",
            
            "ExpenseDescription":"Description",
            "ExpStatus":"Status",
            "ExpNo":"Expense No",
            "ExpWallet":"Wallet",
            "ExpAdvNo":"Advance No",
            "ExpSup":"Supplier",
            "ExpCus":"Customer",
            "ExpStaff":"Staff",
            "ExpenseHed":"Expense Type - Detail Information",
            "ExpReark":"Remark",
            "ExpParent":"Is Parent",
            "ExpAccount":"Account",

            
            
            //Daily Income
            "Income_Header":"Daily Income",
            "IncomeDate":"Date",
            "IncomeNo":"Income No",
            "IncomeType":"Income Type",
            "IncDescription":"Description",
            "IncAmount":"Amount",
            "IncWallet":"Wallet",
            "IncType":"Payment",
            "IncSup":"Supplier",
            "IncCust":"Customer",
            "IncStaff":"Staff 1",
            "IncStaff2":"Staff 2",
            "IncomeGroup":"Income Group",
            
             

            //Daily IncomType
            "IncomeTiTle":"Income Type",
            "IncTitle_Header":"Income Type - Detail Information",
            "IncIsParent":"Is Parent",
            "IncIncomeType":"Income Type",
            "IncSh1":"Short Code 1",
            "Incsh2":"Short Code 2",
            "IncRemark":"Remark",

            //Daily Billing Plan
            "BPheader":"Billing Reminder",
            "BillTitle":"Billing Reminder - Detail Information",
            "BPDate":"Date",
            "BPNo":"Bill No",
            "Title":"Title",
            "ReminderType":"Reminder Type",
            "BillAmount":"Amount",
            "BilCurrency":"Currency",
            "TransType":"Transaction Type",
            "BillStatus":"Status",
            "BillIncome":"Income Type",
            "BillExp":"Expense Type",
            "BillCustomer":"Customer",
            "BillStaff":"Staff",
            "BillEmail":"Email",
            "BillRemark":"Remark",
            "BillRefer":"Reference",
            "BillDay":"Reminder Day",
            "Billday":"Day",

            //Brand
            "Brand_Tit":"Brands",
            "BrandHeader":"Brand - Detail Information",
            "BrandName":"Brand Name",
            "Short Code":"Short Code",
            "Contact_Info":"Contact Info",
            "Remark": "Remark",

            //Service
            "Service_Detail": "Service - Detail Information",
            "Service_No": "Service No",
            "Service_Status": "Service Status",
            "Service_Customer": "Customer",
            "Service_Man": "Service Man",
            "Service_Description": "Description",
            "Service_StartOn": "Start On",
            "Service_ContactName": "Contact Name",
            "Service_Position": "Contact Position",
            "Service_amount": "Amount",
            "Service_EndOn": "End On",
            "service_Remark": "Remark",
            "_Service": "Service DOs",

            //StockIn
            "Stock_InTitle": "StockIn Item",
            "Stock_DailyIn": "Daily StockIn Item",
            "Stock_InHeader": "StockIn - Detail Information",
            "Stock_Date": "Date",
            "Stock_Item": "Item",
            "Stock_Price": "Price",
            "Stock_Qty": "In Qty",
            "Stock_Intotal": "In Total",
            "Stock_SellPrice": "Sell Price",
            "Stock_Cost": "Cost",
            "Stock_Location": "Loaction",
            "Stock_Supplier": "Supplier",
            "Stock_Remark": "Remark",

            //StockLost
            "Stock_LostTitle": "StockLost Item",
            "Stock_DailyLost": "Daily StockLost Item",
            "Stock_LostHeader":"StockLost - Detail Information",
            "Lost_Location": "Location",
            "Stock_Item": "Item",
            "Lost_Qty": "Lost Qty",
            "Lost_Remark": "Remark",
            "Lost_Cost": "Cost",
            "Lost_Date": "Date",

            //Delivery Order
            "DeliverOrder": "Delivery Order",
            "DeliveryNO": "DO No",
            "DelStatus": "Status",
            "StockDORemark": "Stock Remark",
            "DOItem": "Item",
            "DOLocation": "Location",
            "DOQty": "DO Qty",
            "DOLabelRemark": "Package Note",
            "DOOtherRemark": "Other Remark",
            "Delivery By": "Delivery By",
            "Delivery Info": "Delivery Info",
            "DOReceivedDate": "Received Date",
            "DORecLocation": "Received Location",
            "DOInformation": "DO Information",
            "DOItemInformation": "Do Item Information ",
            "Deliver Information": "Deliver Information",
            "Received Information": "Received Information",
            "DailyDeliveryInfo": "Daily Delivery Order",

            //Projects
            "_projects": "Projects",
            "_projectcode": "Project Code",
            "_projectname": "Project Name",
            "_contactinfo": "Contact Info",
            "_starton": "Start Date",
            "_closeon": "End Date",
            "_projectdetailinfo":"Project - Detail Information",
            "_projectstatus": "Status",

            //supplier
            "Supplier":"Suppliers",
            "supplier_detail": "Supplier-Detail Information",
            "supplier_name": "Supplier Name",
            "Contact Info": "Contact Info",
            "Supshortcode": "Short Code",

            //Item Group
            "Item Groups":"Item Groups",
            "ItemGroupDetail": "Item Group - Detail Information",
            "Item Group": "Group Name",
            "Is Parent": "Is Parent",
            "ItemGroupSequence": "Sequence",
            "GroupRemark": "Remark",

            //Customer
            "Customer": "Customer",
            "CustomerDetail": "Customer - Detail Information",
            "Info": "Info:",
            "CustomerNo": "Customer No",
            "CustomerGroup": "Customer Group",
            "Name(Eng)": "Name (Eng)",
            "Name(Myanmar)": "Name (Myanmar)",
            "Code1": "Code 1",
            "Code2": "Code 2",
            "Sale Person": "Sale Person",
            "ContactDate": "Contact Date",
            "Address": "Address",
            "Phone No": "Phone No",
            "FaxNo": "Fax No",            
            "City": "City",
            "Township": "Township",
            "Name1":"Name 1",
            "Position1": "Position 1",
            "MobileNo1": "Mobile No 1",
            "Office Phone1": "Office Phone 1",
            "Address1": "Address 1",
            "Name2": "Name 2",
            "Position2": "Position 2",
            "MobileNo2": "Mobile No 2",
            "Officehone2": "Office Phone 2",
            "Address2": "Address 2",

            //Customer Group
            "CustomerGroupDetail":"Customer Group - Detail Information ",
            "Customer Group": "Customer Group",
            "GroupName": "Group Name",
            "Description": "Description",

            //Staff List
            "Staff":"Staffs",
            "StaffDetail": "Position Info:",
            "StaffName": "Staff Name",
            "PositionName": "Position Name",
            "DepartmentName": "Department Name",
            "Sequence": "Sequence",
            "Join Date": "Join Date",
            "Personal Info": "Person Info:",
            "DOB": "Date Of Birth",
            "Gentle": "Gentle",
            "NRCNo": "NRC No",
            "Married": "Married",
            "Father Name": "Father Name",
            "Mother Name": "Mother Name",
            "Race": "Race",
            "Contact No": "Contact No",
            "Regilious": "Regilious",

            //Position 
            "Position": "Position",
            "PositionDetail": "Position - Detail Information",
            "PositionName": "Name",
            "Code": "Code",
            "Basic Salary": "BasicSalary",
            "OT Rate": "OT Rate",
            "Mini Salary": "Mini Salary",
            "Adjustment": "Position Adjustment",
            "JobLevel": "Job Level",

            //Sale Invoice Report
            "_sale_invoice_report": "Sale Invoice Report",


            //Services
            "_Services": "Services",
            "_ServiceNo": "Service No",
            "_Service_Status": "Service Status",
            "_Service_User": "Service User",
            "_Service_Date": "Service Date",
            "_Start_On": "Start On",
            "_End_On": "End On",
            "_Service_Man": "Service Man",
            "_Contact_Position":"Contact Position",
            "_Contact_Name": "Contact Name",
            "_Service_charges":"Service Charges",
            "_total": "Total",
            "_Service_Detail Information":"Service - Detail Information",
           "_salemodule": "Sale Module"

           
        },
        "myanmar": {
            //#region master
            "_log": " မွတ္တမ္း",
            "_edit": "ျပင္မည္",
            "_save": "သိမ္းမည္",
            "_delete": "ဖ်တ္မည္",
            "_new": "အသစ္",
            "_close": "ပိတ္ရန္",
            "_reflesh": "ျပန္လည္ရယူမည္",
            "_upload":"တင္မည္",
            "_createdon": "ပိတ္ရန္",
            "_modifiedon": "ပိတ္ရန္",
            "_createdby": "လုပ္သူ",
            "_modifiedby": "ျပင္သူ",
            "_search": "ရွာမည္",
            "_Listing": "စာရင္း",
            "_detailinfo": "အေသးစိတ္အခ်က္အလက္",
            "_showall": "အားလံုးျပပါ",
            "_front": "ေရွ႕",
            "_back": "ေနာက္",
            "_advancedsearch": "ရွာရန္",
            "_date": "ေန႔စြဲ",
            "_name_code": "အမည္/ကုဒ္",
            "_description": "ေဖာ္ျပခ်က္",
            "_approve_reject": "Approve / Reject",
            "_signature":"လက္မွတ္",
        //#endregion
            

            //#region Cash Flow menu
            "_cashflow": "ေငြစာရင္း",
            "_advanceForm": "ၾကိဳထုတ္ေငြမ်ား",
            "_dailyExpense": "ေန႕စဥ္ ကုန္က်စရိတ္",
            "_dailyIncome": "ေန႕စဥ္ ဝင္ေငြ",
            "_claim": "ဝန္ထမ္း ေငြထုတ္",
            "_monthlyFlow": "လစဥ္ စာရင္းခ်ဳပ္",
            "_wallet": "ပုိက္ဆံအိတ္မ်ား",
            "_walletTransaction": "ပုိက္ဆံအိတ္ ေငြစာရင္း",
            "_walletTransfer": "ပိုက္ဆံလဲႊြ",
            "_billing": "ပုံမွန္ ဝင္/ထြက္ေငြမ်ား",
            "_expenseTitle": "ထြက္ေငြ ေခါင္းစဥ္",
            "_incomeTitle": "ဝင္ေငြ ေခါင္းစဥ္",
            //#endregion

            //System menu
            "_system": "စနစ္",
            "_systemorganization": "အဖြဲ႕အစည္း",

             //#region Master Menu
            "_materbook": "အေၿခခံစာရင္း",
            "_item": "ပစၥည္း",
            "_itemgroup": "ပစၥည္းအုပ္စု",
            "_customer": "ေဖာက္သည္",
            "_customergroup": "ေဖာက္သည္ အုပ္စု",
            "_warehouse": "ကုန္ေလွာင္ရံု",
            "_ways": "အေရာင္းလမ္းေၾက",
            "_cars": "ကားမ်ား",
            "_salestaff": "အေရာင္း၀န္ထမ္း",
            "_region": "တိုင္းေဒသၾကီးမ်ား",
            "_city": " ျမိဳ႕ ",
            "_township": "ျမိဳ႕နယ္",
            "_creditremain": "ေၾကြးရရန္က်န္စာရင္းမ်ား",
            "_assetType": "ပိုင္ဆိုင္မွဳအမ်ိဳးအစားမ်ား",
            //#endregion

            //City
            "_cities": "ျမိဳ႕မ်ား",
            "_code": "ကုဒ္",
            "_city_name": "ျမိဳ႕အမည္",
            "_city_detail": " ျမိဳ႕- အေသးစိတ္အခ်က္အလက္မ်ား",

            //Region
            "_region_name": "တိုင္း/ျပည္နယ္ အမည္",
            "_region_detail": "တိုင္း/ျပည္နယ- အေသးစိတ္အခ်က္အလက္မ်ား",

            //Township
            "_townships": "ျမိဳ႕နယ္မ်ား",
            "_township_name": "ျမိဳ႕နယ္ အမည္",
            "_township_detail": " ျမိဳ႕နယ္ - အေသးစိတ္အခ်က္အလက္မ်ား",

             //#region Items
            "_items": "ပစၥည္းမ်ား",
            "_itemDetailInformation": "ပစၥည္း အေသးစိတ္ အခ်က္အလက္မ်ား ",
            "_itemno": "ပစၥည္းအမွတ္",
            "_Brand": "ကုန္အမွတ္တံဆိပ္",
            "_supplier": "ကုန္သည္",
            "_ItemName": "ပစၥည္းအမည္",
            "_itemBasicPrice": "ပစၥည္းေစ်းႏွဳန္း (အေျခခံ)",
            "_itemPartnerPrice": "ေဖာက္သည္",
            "_itemSpecialPrice": "အထူး",
            "_shortcode1": "အတိုေကာက္ ၁",
            "_shortcode2": "အတိုေကာက္ ၂",
            "_wlevel": "သတိေပး အေရအတြက္",
            "_Quantity": "အေရအတြက္",
            "_price1": "ႏွဳန္း",
            "_packagelevel1": "ထုတ္ပိုးမွဳ အေရအတြက္ ၁",
            "_packagelevel2": "ထုတ္ပိုးမွဳ အေရအတြက္ ၂",
            "_packagelevel3": "ထုတ္ပိုးမွဳ အေရအတြက္ ၃",
            "_itemuom": "ေရတြက္ပံု",
            "_ShortDescription": "အတိုေကာက္ေဖာ္ျပခ်က္",
            "_NotAvailable": "မရေသးပါ",
            "_editDesc":"ေဖာ္ျပခ်က္မ်ား ျပင္ဆင္ရန္",
            "_itemmoq": "MOQ",
            //#endregion

            //Brand
            

            //Van Sale Menu
            "_vansale": "ကားအေရာင္းမ်ား",
            "_issuenote": "ကုန္ထုတ္မွတ္စု",
            "_loadin": "ကုန္တင္",
            "_loadout": "ကုန္ခ်",
            "_cashier": "ေငြကိုင္",
            "_carSchedule": "လမ္းေၾကာင္းအလိုက္ ကားအခ်ိန္ဇယား",

            //Wallettransfer Module
            "_Transferno": "လြႊဲေျပာင္းနံပါတ္",
            "_TransferDate": "လြႊဲေျပာင္းေန႔စြဲ",
            "_fromwallet": "ပိုက္ဆံအိတ္မွ",
            "_towallet": "ပိုက္ဆံအိတ္သို႔",
            "_OutAmount": "ထြက္ေငြ",
            "_InAmount": "၀င္ေငြ",
            "_ExchangeRate": "ေငြလဲလွယ္ႏႈန္း",
            "_remark": "မွတ္ခ်က္",
            "_walletstatus": "ပိုက္ဆံအိတ္အေျခအေန",
            "_walletTransferdetailinfo": "ပိုက္ဆံလြႊဲ အေသးစိတ္အခ်က္အလက္",

            //Wallet Module
            "_walletname": "ပိုက္ဆံအိတ္နာမည္",
            "_accinfo": "စာရင္းအခ်က္အလက္",
            "_walletdetailinfo": "ပိုက္ဆံအိတ္ အေသးစိတ္အခ်က္အလက္",
            "_currency": "ေငြေၾကးစနစ္",
            "_isdefwallet": "ပံုေသပိုက္ဆံအိတ္",
           
            //Master Data Group
            //Warehouse Module
            "_locationcode": "တည္ေနရာ ကုဒ္",
            "_locationname": "တည္ေနရာ နာမည္",
            "_contactinfo": "ဆက္သြယ္ရန္ ",
            "_agent": "ကိုယ္စားလွယ္",
            "_isdefloc": "ပံုေသတည္ေနရာ",
            "_warehousedetInfo": " ကုန္ေလွာင္ရံု အေသးစိတ္အခ်က္အလက္",
            "_locationnamecode": "တည္ေနရာ နာမည္ / ကုဒ္ ",

            //Ways Module
            "_wayplan": "လမ္းေၾကာင္းအစီအစဥ္",
            "_routeno": "လမ္းေၾကာင္းနံပါတ္",
            "_routename": "လမ္းေၾကာင္းနာမည္",
            "_routedescr": "လမ္းေၾကာင္းေဖာ္ျပခ်က္",
            "_routenamecode": "လမ္းေၾကာင္း နာမည္ / နံပါတ္",
            "_wayplandetinfo": "လမ္းေၾကာင္းအစီအစဥ္ - အေသးစိတ္အခ်က္အလက္",
            "_routestatus": "လမ္းေၾကာင္းအေျခအေန",
            "_routeseq": "လမ္းေၾကာင္း အမွတ္စဥ္",

             //Item Customer Price
            "_itemcustomerprice": "ေဖာက္သည္ ေစ်းႏွဳန္းမ်ား",

            //Invoice
            "_totalServiceCost": "Service က်ေငြေပါင္း",
            "_sale": "အေရာင္း",
            "_invoice": "ေဘာင္ခ်ာ",
            "_invoice_information": "ေဘာင္ခ်ာ အခ်က္အလက္မ်ား",
            "_invoice_no": "ေဘာင္ခ်ာ No.",
            "_invoice_items": "ေဘာင္ခ်ာပါ ပစၥည္းမ်ား",
            "_no": "စဥ္",
            "_item_name": "အမည္",
            "_price": "ေစ်းႏွဳန္း",
            "_cost": "က်ေငြ",
            "_costing":"က်သင့္ေငြ",
            "_finalInvoiceCost": "စုစုေပါင္း",
            "_other2": "အျခား ၂",
            "_other1": "အျခား ၁",
            "_tax": "အခြန္",
            "_discount": "ေလၽွာ႔ေစ်း",
            "_totalItemCost": "ပစၥည္းက်ေငြေပါင္း",
            "_cash": "လက္ငင္းေပးေငြ",
            "_refund_amount": "ျပန္အမ္းေငြ",
            "_credit_paid": "ေၾကြးဆပ္ျပီးေငြ",
            "_credit_remain":"ေၾကြးေတာင္ရန္ က်န္ေငြ",
            "_payment": "ေငြေပးေခ်ျခင္း",
            "_way": "အေရာင္းလမ္းေၾကာင္း",
            "_invoiceComments": "ေဘာင္ခ်ာ မွတ္ခ်က္",
            "_amount": "စုစုေပါင္း",
            "_invoicestatus": "အေျခအေန",
            "_newinvoice": "ေဘာင္ခ်ာ အသစ္",
            "_SaleInvoices": "အေရာင္း ေဘာင္ခ်ာမ်ား",
            "_saleOrder": "အမွာစာမ်ား",
            "_salebyitem": "ကုန္အလုိက္ ေရာင္းအား",
            "_salebycustomer": "ေဖာက္သည္ ေရာင္းအား",
         

            //Way Sale
            "_waysale": "အေရာင္းလမ္းေၾကာင္း",
            "_waysaledetail": "လမ္းေၾကာင္း အေရာင္း အခ်က္အလက္မ်ား",
            "_waydate":"အေရာင္းရက္စြဲ",
            "_wayno":"လမ္းေၾကာင္း နံပါတ္",
            "_cashsale":"လက္ငင္း",
            "_creditsale":"အေၾကြး",
            "_balnace":"လက္က်န္ေငြ",
            "_waystatus": "လမ္းေၾကာင္းအေျခအေန",
            "_DetailInformationsOfWays": "လမ္းေၾကာင္း အေရာင္း အခ်က္အလက္မ်ား",
            "_shopskipreason": "မဝင္သည့္ ဆိုင္မ်ား",
            "_skipreason": " အေၾကာင္းအရင္း",

            //Stock Balance 
            "_stockbalance": "ကုန္လက္က်န္",
            "_SoldQty": "ေရာင္းျပီး အေရအတြက္",
            "_IssuedQty": "ကုန္တင္ အေရအတြက္",
            "_RemainingQty": "လက္က်န္ အေရအတြက္",

            //Route Customer

            "_routplan": " လမ္းေၾကာင္း အစီအစဥ္",
            "_vansaleroutes":"ကားအေရာင္း လမ္းေၾကာင္းမ်ား",
            "_carnolist": "ကား နံပါတ္မ်ား",

            //Route Schedule
            "_routeschedule": "လမ္းေၾကာင္း အခ်ိန္ဇယား",
            "_route": "လမ္းေၾကာင္း",
            "_availablecustomer":"ေရြးခ်ယ္ႏိုင္ေသာ   ေဖာက္သည္မ်ား",

            //Car
            "_car": "ကား",
            "_carstatus":"အေျခအေန",
            "_carsaleperson1":"အေရာင္းသမား ၁",
            "_carsaleperson2":"အေရာင္းသမား ၂",
            "_carno": "ကားနံပါတ္",
            "_cardetailinformation": "ကားအေသးစိတ္ အခ်က္အလက္မ်ား",

            //Issue Note
            "_issuenoteInformation": "ကုန္ထုတ္မွတ္စု အခ်က္အလက္မ်ား",
            "_daily_issuenote": "ေန႔စဥ္ ကုန္ထုတ္မွတ္စုမ်ား",
            "_issueno": "ကုန္ထုတ္ နံပါတ္",
            "_issuedate": "ရက္စြဲ",       
            "_status": "အေျခအေန",
            "_preparedby": "ျပင္ဆင္သူ",
            "_qty": "အေရအတြက္",
            "_Issuenote_items": "ကုန္ထုတ္မွတ္စုပါ ပစၥည္း",
            "_adminComments": "Admin မွတ္ခ်က္",
            "_newissue":"ကုန္ထုတ္မွတ္စု အသစ္",

            // Issue Note Reason
            "_issueNoteReason": "အေၾကာင္းျပခ်က္",
            "_resonCreatedby": "ထည့္သြင္းသူ",
            "_resonStatus": "အေျခအေန",

            //Scout Type
            "_scoutType": "စေကာက္ အမ်ိဳးအစားမ်ား",
            //waysale
            "_waysalecomments": "လမ္းေၾကာင္း အေရာင္း မွတ္ခ်က္မ်ား",
            "_totalCashamount": "လက္ငင္းေငြ စုစုေပါင္း",
            "_totalCreditamount": "အေၾကြးေငြ စုစုေပါင္း",

            //brand
            "_brand": "တံဆိပ္",

            //Supplier
            "_suppliertitle": "ကုန္သည္",

            //department
            "_departmenttitle": "၀န္ထမ္း႒ာန",
            //position
            "_positiontitle": "၀န္ထမ္းရာထူး",
            //exchangerate
            "_exchangeratedetail": "ေငြလဲလွယ္ႏူန္း",

            //AssessType
            "_asset": "ပုိင္ဆုိင္မူ အမ်ိဳးအစား",
            "_assesstypedetail": "ပုိင္ဆုိင္မူအမ်ိဳးအစား - အေသးစိတ္အခ်က္အလက္",
            "_assesstype": "ပုိင္ဆုိင္မူ အမ်ိဳးအစား",
            "_assesstypename": "ပုိင္ဆုိင္မူ အမ်ိဳးအစား",
            "_assesscode": "အမ်ိဳးအစားကုဒ္",
            "_assessremark": "မွတ္ခ်က္",

            //Asset
            "_assets": "ပုိင္ဆုိင္မူ အမည္",
            "_assetdetail":"ပုိင္ဆုိင္မူ အမည္ - အေသးစိတ္အခ်က္အလက္",
            "_assessno":"ပုိင္ဆုိင္မွုနံပါတ္",
            "_assetname":"ပစၥည္းအမည္",
            "_assetypename": "ပုိင္ဆုိင္မွုအမ်ိဳးအစား",
            "_originalcode": "မူရင္းကုဒ္",
            "_purchasedate": "၀ယ္ယူေန႕စြဲ ",
            "_receivedon": "ရရွိသည္႔ေန႕",
            "_staffname": "၀န္ထမ္း အမည္",
            "_companycode": "ကုမၼဏီ  ဘားကုဒ္",
            "_warranty": "အာမခံခ်က္",
            "_assessqty": "အေရအတြက္",
            "_assessprice":"ေစ်းႏွုန္း",
            "_assesscost":"က်ေငြ",
            "_asseremark":"မွတ္ခ်က္",
            //purchaseorder
            "_purchasetitle":"ကုန္ အ၀ယ္ ပစၥည္း",
            "_purchaseno":"အဝယ္နံပတ္",
            "_purchasddate":"အ၀ယ္ ေန႔စြဲ",
            "_title":"ေခါင္းစဥ္",
            "_suppliername":"ကုန္သည္",
            "_itemcost":"ကုန္တန္ဖုိး",
            "_other1title":"အၿခား (၁)",
            "_other1amount":"က်ေငြ(၁)",
            "_other2title":"အၿခား (၂)",
            "_other2amount":"က်ေငြ(၂)",
            "_finalamount":"စုစုေပါင္း က်ေငြ",
            "_exchangerate":"ေငြလဲလွယ္ႏူန္း",
            "_finaloc":"ေနာက္ဆုံး local amount",
            "_pocurrency":"ေငြေၾကး",
            "_poremark":"မွတ္ခ်က္",
            "_purstatus":"အေျခအေန",
            "_purchaseheader":"ကုန္ အ၀ယ္ ပစၥည္း - အေသးစိတ္အခ်က္အလက္",
            "_purchaserecord":"ကုန္ အ၀ယ္ ပစၥည္း ",
            "_purno":"စဥ္",
            "_puritemname":"ကုန္ပစၥည္း",
            "_purprice":"ေစ်းႏွဳန္း",
            "_purqty":"အေရအတြက္",
            "_purcost":"က်ေငြ",
            "_purremark":"မွတ္ခ်က္",
            "_dailypur":"ေန႔စဥ္ ကုန္အ၀ယ္ပစၥည္း",
            //sale order
            "_ordertitle":"ကုန္ အမွာစာ",
            "_orderdetail":"ေန႕စဥ္ ကုန္ အမွာစာမ်ား",
            "_orderheader":" ကုန္ အမွာစာမ်ား - အေသးစိတ္အခ်က္အလက္",
            "_orderno":"အမွာစာ နံပါတ္",
            "_orderdate":"ေန႕စြဲ",
            "_ordcustomer":"ေဖာက္သည္",
            "_ordremark":"မွတ္ခ်က္",
            "_ordrecord":"ကုန္ အမွာစာ",
            "_ordno":"စဥ္",
            "_orditemname":"ကုန္ပစၥည္း",
            "_ordqty":"အေရအတြက္",
            "_ordstatus": "အေျခအေန",

            "_customerlogin": "ကုန္ပစၥည္းမွာရန္",

            "_purchase_order_rec": " ကုန္ အ၀ယ္ လက္ခံ - အေသးစိတ္ အခ်က္အလက္ ",
            "_received_on_pur": " ရရွိေန႔စြဲ ",
            "_rec_item": "ကုန္ပစၥည္း",
            "_rec_ord_qty": "Order Qty",
            "_rec_qty": "Received Qty",
            "_rec_loc": "တည္႕ေနရာ",
            "rec_searial": "Item Serial",
            "_rec_remarrk": "မွတ္ခ်က္",
            "_rec_item_list": " ကုန္လက္ခံ ပစၥည္း",

            //Advanced Form
            "_adv_header":"ေန႕စဥ္ ၾကိဳထုတ္ေငြမ်ား",
            "_advanced_title":"ေန႕စဥ္ ၾကိဳထုတ္ေငြ - အေသးစိတ္အခ်က္အလတ္",
            "_advanced_on":"ေန႕စြဲ",
            "_advanced_no":"ၾကိဳထုတ္ နံပတ္",
            "_advanced_status":"အေျခအေန",
            "_advanced_description":"အေၾကာင္းအရာ",
            "advanced_staff":"၀န္ထမ္း",
            "advanced_approved":"ေထာက္ခံသူ",
            "advanced_customer":"ေဖာက္သည္",
            "advaned_supplier":"ကုန္သည္",
            "advaned_amount":"ၾကိဳထုတ္ေငြ",
            "advaned_expense":"က်ေငြ",
            "advaned_balance":"က်န္ေငြ",
            "advaned_return_amount":"ျပန္အပ္ေငြ",
            "advanced_return_on":"ျပန္အပ္ေန႔",
            "add_expense":"ကုန္က်စရိတ္ တည္႔ရန္",
            "refresh_expense":"စာရင္းျပန္ယူရန္",
            "expense_date":"ေန႕စြဲ",
            "expense_title":"ထြက္ေငြ ေခါင္းစဥ္",
            "amount":"ပမာဏ",

            //Daily Expense
            "ExenseTitle":"ထြက္ေငြ အမ်ိဳးအစား",
            "Expense_header":"ေန႔စဥ္ ကုန္က်စရိတ္",
            "ExpenseRemark":"မွတ္ခ်က္",
            "ExpenseHed":"ထြက္ေငြ အမ်ိဳးအစား - အေသးစိတ္အခ်က္အလက္",
            "ExpenseGroup":"ထြက္ေငြ အုပ္စု",
            "ExpenseRecord":"စာရင္း",
            "ExpenseAmount":"ေငြပမာဏ",
            "Expense_Title":"ထြက္ေငြ ေခါင္းစဥ္",
            "ExpenseDate": "ေန႕စြဲ",
            "ExpenseDescripption":"အေၾကာင္းအရာ",
            "ExpStatus":"အေျခအေန",
            "ExpNo":"အမွတ္စဥ္",
            "ExpWallet":"ပိုက္ဆံအိတ္",
            "ExpAdvNo":"ၾကိဳထုတ္ အမွတ္စဥ္",
            "ExpSup":"ကုန္သည္",
            "ExpCus":"ဝယ္ယူသူ",
            "ExpStaff":"သက္ဆုိင္သူမ်ား",
            "ExpReark":"မွတ္ခ်က္",
            "ExpParent":"ေခါင္းစဥ္ၾကီး ရွိသည္။",
            "ExpAccount":"ေငြစာရင္း",

            //Daily Income
            "Income_Header":"ေန႔စဥ္ ၀င္ေငြ",
            "IncomeDate":"ေန႕စြဲ",
            "IncomeNo":"အမွတ္စဥ္",
            "IncomeType":"၀င္ေငြေခါင္းစဥ္",
            "IncDescription":"အေၾကာင္းအရာ",
            "IncAmount":"ေငြပမာဏ",
            "IncWallet":"ပိုက္ဆံအိတ္နာမည္",
            "IncType":"ပုံစံ",
            "IncSup":"ကုန္သည္",
            "IncCust":"၀ယ္ယူသူ",
            "IncStaff":"သက္ဆုိင္သူ ၁",
            "IncStaff2":"သက္ဆုိင္သူ ၂",
            "IncomeGroup":"၀င္ေငြအုပ္စု",
            
            //Daily IncomType
            "IncomeTiTle":"၀င္ေငြ အမ်ိဳးအစား",
            "IncTitle_Header":"၀င္ေငြ အမ်ိဳးအစား - အေသးစိတ္အခ်က္အလက္",
            "IncIsParent":"ေခါင္းစဥ္ၾကီးရွိသည္။",
            "IncIncomeType":"၀င္ေငြ အမ်ိဳးအစား",
            "IncSh1":"အတုိေကာက္၁",
            "Incsh2":"အတုိေကာက္၂",
            "IncRemark":"မွတ္ခ်က္",
            

            //Daily Billing Plan
            "BPheader":"ပုံမွန္ ၀င္/ထြက္ေငြမ်ား",
            "BillTitle":"ပုံမွန္ ၀င္/ထြက္ေငြမ်ား  - အေသးစိတ္အခ်က္အလက္",
            "BPDate":"ေန႕စြဲ",
            "BPNo":"ဘီလ္  နံပါတ္",
            "Title":"ေခါင္းစဥ္",
            "ReminderType":"သတိေပးအမ်ိဳးအစား",
            "BillAmount":"ပမာဏ",
            "BilCurrency":"ေငြေၾကး",
            "TransType":"၀င္ေငြ အမ်ိဳးအစား",
            "BillStatus":"အေျခအေန",
            "BillIncome":"၀င္ေငြေခါင္းစဥ္",
            "BillExp":"ထြက္ေငြေခါင္းစဥ္",
            "BillCustomer":"ေဖာက္သည္",
            "BillStaff":"၀န္ထမ္း",
            "BillEmail":"အီးေမးလ္",
            "BillRemark":"မွတ္ခ်က္",
            "BillRefer":"အေၾကာင္းအရာ",
            "BillDay":"သတိေပးသည္႔အၾကိမ္",
            "Billday":"ရက္",

            //Brand
            "Brand_Tit":"တံဆိပ္ မ်ား",
            "BrandHeader":"တံဆိပ္ - အေသးစိတ္အခ်က္အလက္",
            "BrandName":"တံဆိပ္ နာမည္",
            "Short Code":"အတုိေကာက္",
            "Contact_Info":"ဆက္သြယ္ ရန္",
            "Remark":"မွတ္ခ်က္",

            //Service
            "Service_Detail": "Service - Detail Information",
            "Service_No": "Service No",
            "Service_Status": "Service Status",
            "Service_Customer": "Customer",
            "Service_Man": "Service Man",
            "Service_Description": "Description",
            "Service_StartOn": "Start On",
            "Service_ContactName": "Contact Name",
            "Service_Position": "Contact Position",
            "Service_amount": "Amount",
            "Service_EndOn": "End On",
            "service_Remark": "Remark",
            "_Service": "Service DOs",

            //StockIn
            "_inventory": "ကုန္",
            "Stock_InTitle": "ကုန္အဝင္ စာရင္း",
            "Stock_DailyIn":"ေန႕စဥ္ ကုန္အ၀င္စာရင္း",
            "Stock_InHeader": "ကုန္အ၀င္ -  အေသးစိတ္အခ်က္အလက္",
            "Stock_Date": "ေန႕စြဲ",
            "Stock_Item": "ကုန္ပစၥည္း",
            "Stock_Price": "ေစ်းႏွဳန္း",
            "Stock_Qty": "ကုန္အဝင္",
            "Stock_Intotal": "ပစၥည္းေပါင္း",
            "Stock_SellPrice": "သြင္းေစ်း",
            "Stock_Cost": "က်ေငြ",
            "Stock_Location": "တည္ေနရာ",
            "Stock_Supplier": "ကုန္သည္",
            "Stock_Remark": "မွတ္ခ်က္",

            //StockLost
            "Stock_LostTitle": "ကုန္ ဆုံးရွဳံးမွဳ စာရင္း",
            "Stock_DailyLost": "ေန႔စဥ္ ကုန္ ဆုံးရွဳံးမွဳ စာရင္း",
            "Stock_LostHeader": "ကုန္ဆုံးရွုံးမွု -  အေသးစိတ္အခ်က္အလက္",
            "Lost_Date":"ေန႕စြဲ",
            "Lost_Location": "တည္႕ေနရာ",
            "Stock_Item": "ကုန္ပစၥည္း",
            "Lost_Qty": "အေရအတြက္",
            "Lost_Remark": "မွတ္ခ်က္",
            "Lost_Cost": "က်ေငြ",

            //Delivery
            "DailyDeliveryInfo":"ေန႔စဥ္ ကုန္ပုိလႊာ စာရင္း",
            "DeliverOrder": "ကုန္ပုိ႕လႊာ",
            "DeliveryNO": "DO နံပါတ္",
            "DelStatus": "အေျခအေန",
            "StockDORemark": "Stock Remark",
            "DOItem": "Item",
            "DOLocation": "တည္႕ေနရာ",
            "DOQty": "DO Qty",
            "DOLabelRemark": "Package Note",
            "DOOtherRemark": "Other Remark",
            "Delivery By": "Delivery By",
            "Delivery Info": "Delivery Info",
            "DOReceivedDate": "Received Date",
            "DORecLocation": "Received Location",
            "DOInformation": "ကုန္ပုိ႔ -  အေသးစိတ္အခ်က္အလက္",
            "DOItemInformation": "ကုန္ပုိ႔ပစၥည္း - အေသးစိတ္အခ်က္အလက္",
            "Deliver Information": "ကုန္ပုိ႔သည္ - အေသးစိတ္အခ်က္အလက္",
            "Received Information": "ကုန္လက္ခံသည္ -  အေသးစိတ္အခ်က္အလက္",

            //Projects
            "_projects": "စီမံခ်က္မ်ား",     
            "_projectcode": "စီမံခ်က္ကုဒ္",
            "_projectname": "စီမံခ်က္အမည္",
            "_contactinfo": "ဆက္သြယ္ရန္လိပ္စာ",
            "_starton": "စတင္သည့္ေန႔",
            "_closeon": "ၿပီးစီးသည့္ေန႔",
            "_projectdetailinfo": "စီမံခ်က္၏ အေသးစိတ္အခ်က္အလက္",
            "_projectstatus": "အေျခအေန",

            //supplier
            "Supplier":"ကုန္သည္မ်ား",
            "supplier_detail": "ကုန္သည္ - အေသးစိတ္အခ်က္အလက္",
            "supplier_name": "ကုန္သည္ အမည္",
            "Contact Info": "ဆက္သြယ္ရန္",
            "Remark": "မွတ္ခ်က္",
            "Supshortcode": "အတုိေကာက္",

            //Item Group
            "Item Groups":"ပစၥည္း အုပ္စုမ်ား",
            "ItemGroupDetail": "ပစၥည္း အုပ္စု - အေသးစိတ္အခ်က္အလက္",
            "Item Group Name": "အုပ္စု အမည္",
            "Is Parent": "ေခါင္းစဥ္ၾကီး ျဖစ္သည္။",
            "ItemGroupSequence": "အစီအစဥ္",
            "GroupRemark": "မွတ္ခ်က္",


            //Customer
            "Customer":"ေဖာက္သည္မ်ား",
            "CustomerDetail": "ေဖာက္သည္ အုပ္စု - အေသးစိတ္အခ်က္အလက္",
            "Info": "ေဖာက္သည္-  အခ်က္အလက္",
            "CustomerNo": "ေဖာက္သည္ နံပါတ္",
            "CustomerGroup": "ေဖာက္သည္ အုပ္စု",
            "Name(Eng)": "နာမည္ (Eng)",
            "Name(Myanmar)": "နာမည္ (Myanmar)",
            "Code1": "အတုိေကာက္ ၁",
            "Code2": "အတုိေကာက္ ၂",
            "Sale Person": "အေရာင္းစာေရး",
            "ContactDate": "ေန႔စြဲ",
            "Remark": "မွတ္ခ်က္",
            "AddressDetail": "လိပ္စာ -  အခ်က္အလက္",
            "CustomerPhoneNo": "ဖုန္းနံပါတ္",
            "FaxNo": "Fax နံပါတ္",
            "Address": "လိပ္စာ",
            "City": "တိုင္းေဒသၾကီးမ်ား",
            "Township": "ျမိဳ႕နယ္",
            "Name1": "နာမည္ ၁",
            "Position1": "ရာထူး ၁",
            "MobileNo1": "ဖုန္းနံပါတ္ ၁",
            "Office Phone1": "ရုံးဖုန္း ၁",
            "Address1": "လိပ္စာ ၁",
            "Name2": "နာမည္ ၂",
            "Position2": "ရာထူး ၂",
            "MobileNo2": "ဖုန္းနံပါတ္ ၂",
            "Officehone2": "ရုံးဖုန္း ၂",
            "Address2": "လိပ္စာ ၂",

            //Customer Group
            //Customer Group
            "CustomerGroupDetail": "ေဖာက္သည္အုပ္စု - အေသးစိတ္အခ်က္အလက္",
            "Customer Group": "ေဖာက္သည္အုပ္စုမ်ား",
            "GroupName": "အုပ္စု အမည္",
            "Description": "အေၾကာင္းအရာ",
            "Remark": "မွတ္ခ်က္",

            //Staff List
            "Staff": "အေရာင္း၀န္ထမ္းမ်ား",
            "StaffDetail": "ရာထူး - အခ်က္အလက္",
            "StaffName": "၀န္ထမ္းအမည္",
            "PositionName": "ရာထူး အမည္",
            "DepartmentName": "ဠာန အမည္",
            "Sequence": "အစီအစဥ္",
            "Join Date": "ေန႕စြဲ",
            "Personal Info": "ကုိယ္ေရး - အခ်က္အလက္",
            "DOB": "ေမႊးေန႔",
            "Gentle": "Gentle",
            "NRCNo": "မွတ္ပုံတင္ နံပါတ္",
            "Married": "Married",
            "Father Name": "အေဖ နာမည္",
            "Mother Name": "အေမ နာမည္",
            "Race": "လူမ်ိဳး",
            "Contact No": "ဆက္သြယ္ရန္",
            "Address": "လိပ္စာ",
            "Remark": "မွတ္ခ်က္",
            "Regilious": "ဘာသာ",

            //Position 
            "Position": "၀န္ထမ္းရာထူးမ်ား",
            "PositionDetail": "၀န္ထမ္းရာထူးမ်ား - အေသးစိတ္အခ်က္အလက္",
            "PositionName": "အမည္",
            "Code": "အတုိေကာက္",
            "BasicSalary": "အေျခခံလစာ",
            "OT Rate": "အခိ်န္ပိုႏႈန္း",
            "Mini Salary": "အနိမ့္ဆံုးလစာ",
            "Adjustment": "ရာထူးတိုး",
            "JobLevel": "ရာထူး အဆင္႔",


            //Sale Invoice Report
            "_sale_invoice_report": "ေဘာင္ခ်ာ စာရင္းခ်ဳပ္",

           //Services
            "_Services": "ဝန္ေဆာင္မႈ",
            "_ServiceNo": "ဝန္ေဆာင္မႈ NO",
            "_Service_Status": "အေျခအေန",
            "_Service_User": " အသံုးျပဳသူ",
            "_Service_Date": " ေန႔စြဲ",
            "_Start_On": "စသည့္အခ်ိန္",
            "_End_On": "ျပီးသည့္ခ်ိန္",
            "_Service_Man": "ဝန္ေဆာင္မႈေပးသူ",
            "_Contact_Position": "ရာထူး",
            "_Contact_Name": "အမည္",
            "_Service_charges": "ဝန္ေဆာင္ခ",
            "_total": "စုစုေပါင္း",
            "_Service_Detail Information": "ဝန္ေဆာင္မ - အေသးစိတ္",
            "_salemodule":"အေရာင္းမ်ား"


        },
    };

    // Function for swapping dictionaries
    set_lang = function (dictionary) {
        $("[data-translate]").text(function () {
            var key = $(this).data("translate");
            if (dictionary.hasOwnProperty(key)) {
                return dictionary[key];
            }
        });
    };

    // Swap languages when menu changes
    $("#lang").on("change", function () {
        var language = $(this).val().toLowerCase();
        if (dictionary.hasOwnProperty(language)) {
            set_lang(dictionary[language]);
            $.cookie('language', language, { expires: 1000, path: '/' });
        }
    });

    if ($.cookie('language') != "") {
        $("#lang").val($.cookie('language'));
        set_lang(dictionary[$.cookie('language')]);
    }


});