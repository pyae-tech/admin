using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Net;
using NPT_DC_App.LINQs;

namespace NPT_DC_App.Controllers
{
    public class Controller_EmailHelper
    {
        public static String SendEmail(string to_mail_address, string subject, string body, List<Attachment> the_attachments, string bcc)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_Config the_config = (from c in dc.SYS_Configs select c).FirstOrDefault();
                if (the_config == null) return "Error: No Config.";

                string Smtp_ClientValue = the_config.DefaultEmailClient;
                string Smtp_Credential_Password = the_config.DefaultEmailPassword;
                string Smtp_Credential_UserName = the_config.DefaultEmailAddress;

                MailMessage mailObj = new MailMessage(Smtp_Credential_UserName, to_mail_address, subject, body);
                

                if (!string.IsNullOrEmpty(bcc))
                    mailObj.Bcc.Add(bcc);

                mailObj.Priority = MailPriority.High;
                mailObj.BodyEncoding = System.Text.Encoding.UTF8;
                if (the_attachments != null)
                {
                    foreach (Attachment the_attachment in the_attachments)
                    {
                        mailObj.Attachments.Add(the_attachment);
                    }
                }

                mailObj.IsBodyHtml = true;
                SmtpClient SMTPServer = new SmtpClient(Smtp_ClientValue);
                SMTPServer.Port = 587;
                SMTPServer.EnableSsl = true;
                SMTPServer.Timeout = 10000;
                SMTPServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SMTPServer.UseDefaultCredentials = true;

                SMTPServer.Credentials = new NetworkCredential(Smtp_Credential_UserName, Smtp_Credential_Password);
                try
                {
                    SMTPServer.Send(mailObj);
                    return "success";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static String SendEmailToMultipleCC(List<string> to_mail_address_List, string subject, string body, List<Attachment> the_attachments, string bcc)
        {
            try
            {
                LINQ_SystemDataContext dc = new LINQ_SystemDataContext();
                SYS_Config the_config = (from c in dc.SYS_Configs select c).FirstOrDefault();
                if (the_config == null) return "Error: No Config.";

                string Smtp_ClientValue = the_config.DefaultEmailClient;
                string Smtp_Credential_Password = the_config.DefaultEmailPassword;
                string Smtp_Credential_from_UserName = the_config.DefaultEmailAddress;

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress(Smtp_Credential_from_UserName); //From Email Id
                mailMessage.Subject = subject;//  //Subject of Email
                mailMessage.Body = body; //body or message of Email
                mailMessage.IsBodyHtml = true;


                if (!string.IsNullOrEmpty(bcc))
                    mailMessage.Bcc.Add(bcc);

                foreach (string CCEmail in to_mail_address_List)
                {
                    mailMessage.CC.Add(new MailAddress(CCEmail)); //Adding Multiple CC email Id
                }

                mailMessage.Priority = MailPriority.High;
                mailMessage.BodyEncoding = System.Text.Encoding.UTF8;
                if (the_attachments != null)
                {
                    foreach (Attachment the_attachment in the_attachments)
                    {
                        mailMessage.Attachments.Add(the_attachment);
                    }
                }

               
                SmtpClient SMTPServer = new SmtpClient(Smtp_ClientValue);
                SMTPServer.Port = 587;
                SMTPServer.EnableSsl = true;
                SMTPServer.Timeout = 10000;
                SMTPServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                SMTPServer.UseDefaultCredentials = true;

                SMTPServer.Credentials = new NetworkCredential(Smtp_Credential_from_UserName, Smtp_Credential_Password);
                try
                {
                    SMTPServer.Send(mailMessage);
                    return "success";
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

    }
}