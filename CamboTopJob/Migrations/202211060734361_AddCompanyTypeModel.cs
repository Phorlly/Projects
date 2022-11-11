namespace CamboTopJob.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCompanyTypeModel : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CompanyTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.CompanyTypes");
        }
    }
}
