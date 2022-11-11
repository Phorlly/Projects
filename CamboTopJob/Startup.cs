using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(CamboTopJob.Startup))]
namespace CamboTopJob
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
