using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ViewModel
{
    public class FormCategoryViewModel
    {
        
        public string Title { get; set; }
        public string Type { get; set; }
        public string Url { get; set; }

        public IFormFile File { get; set; }
    }
}
