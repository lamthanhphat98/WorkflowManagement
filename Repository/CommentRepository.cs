using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IRepository;
using EntityContext;
using WorkflowManagement.IRepository;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WorkflowManagement.Models;
using WorkflowManagement.ViewModel;
using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace WorkflowManagement.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private static string SenderID = "558274726483";
        private static String WebApiKey = "AIzaSyBNKVN9jdEdFBRUhFbsnnMVRs8Km6lwvAM";
        private static String FireBasePushNotificationsURL = "https://fcm.googleapis.com/fcm/send";
        private static String ServerKey = "AAAAgfvESlM:APA91bF5Dnp0mz4RdCQV2535jjrGj2rp85Sl-pGG1287ufjWXef6BHp6tXVGW1qybQKR9hlsXFCiwxM_-fDOMMeeu0dvuN3i8Sz8RTtulxU-rTUx3XtjR0cQXSP0f2fItaBXHvWsr4CH";
        private String[] tokenDevice = new String[] {
            new string("f1TBKCikq9I:APA91bGpprSoKiWwR_gBvYwYmmKnHgLVbjdm7Wi9LpYA69zKjtbMnrcBwsib0P5vuMvzELu9WzMDCyqBD1Rk3RKXak7ZT7zucz4YaQrrcsme1qJu8R_HWPHEQxdqipgyzhEQWVcwe68K")
        };
        private readonly WorkflowContext _context;
        public CommentRepository(WorkflowContext context)
        {
            _context = context;
        }

        public List<Comment> countComment(int organizationId, string userId)
        {
            var organization = new SqlParameter("@OrganizationId", organizationId);
            var user = new SqlParameter("@UserId", userId);
            var getComment = _context.Comment.FromSql("EXECUTE dbo.getCommentByOrganization @OrganizationId", organization).Where(c => !c.UserId.Equals(userId)).ToList();
            return getComment;
        }

        public List<CommentViewModel> getCommentByOrganization(int organizationId, string userId)
        {
            List<CommentViewModel> commentViewModels = new List<CommentViewModel>();
            var viewModel = new CommentViewModel();
            var organization = new SqlParameter("@OrganizationId", organizationId);
           // var user = new SqlParameter("@UserId", userId);
            var getComment = _context.Comment.FromSql("EXECUTE dbo.getCommentByOrganization @OrganizationId", organization).Where(c=>!c.UserId.Equals(userId)).ToList();
            foreach (var item in getComment)
            {
                viewModel.Id = item.Id;
                viewModel.TaskId = item.TaskId;
                viewModel.UserId = item.UserId;
                viewModel.Comment1 = item.Comment1;
                viewModel.Priority = item.Priority;
                viewModel.IsRead = item.IsRead;
                var getUser = _context.User.Where(u => u.Id.Equals(item.UserId)).FirstOrDefault();
                viewModel.UserImage = getUser.Avatar;
                commentViewModels.Add(viewModel);
            }
            return commentViewModels;
        }

        public void SendNotification(string text,string[] tokenDevice)
        {
            var messageInformation = new Message()
            {
                notification = new Notification()
                {
                    title = "Workflow Notification",
                    text = text,
                },
                data = null,
                registration_ids = tokenDevice
            };
            sendNotification(messageInformation);
        }
        public static async void sendNotification(Message messageInformation)
        {
            string jsonMessage = JsonConvert.SerializeObject(messageInformation);
            // Create request to Firebase API
            var request = new HttpRequestMessage(HttpMethod.Post, FireBasePushNotificationsURL);
            request.Headers.TryAddWithoutValidation("Authorization", "key=" + ServerKey);
            request.Headers.TryAddWithoutValidation("Content-Type", "application/json");
            request.Content = new StringContent(jsonMessage, Encoding.UTF8, "application/json");
            HttpResponseMessage result;
            using (var client = new HttpClient())
            {
                result = await client.SendAsync(request);
                string response = await result.Content.ReadAsStringAsync();
                // Console.ReadLine();
            }
        }

    }
}
