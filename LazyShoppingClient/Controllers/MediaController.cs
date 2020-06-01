using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using LazyShoppingClient.Infrastructures;

namespace LazyShoppingClient.Controllers
{
    [Route("Media")]
    public class MediaController : BaseController
    {
        public MediaController(HttpClient httpClient, IOptions<ClientConfig> clientConfig, CurrentProcess currentProcess)
            : base(httpClient, clientConfig, currentProcess)
        {
            
        }
    }
}