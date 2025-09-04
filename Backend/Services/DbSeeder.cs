using Backend.Models;

namespace Backend.Services;

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        //ResourceTypes
        if (!context.ResourceTypes.Any())
        {
            context.ResourceTypes.AddRange(
            new ResourceType { ResourceTypeName = "Drop-in skrivbord" },
            new ResourceType { ResourceTypeName = "Mötesrum" },
            new ResourceType { ResourceTypeName = "VR headset" },
            new ResourceType { ResourceTypeName = "AI server" }
            );
            context.SaveChanges();
        }

        //Resources
        if (!context.Resources.Any())
        {
            var dropinDesks = Enumerable.Range(1, 15)
                .Select(i => new Resource { ResourceTypeId = 1, ResourceName = $"Drop-in skrivbord {i}" });
            var meetingRooms = Enumerable.Range(1, 4)
                .Select(i => new Resource { ResourceTypeId = 2, ResourceName = $"Mötesrum {i}" });
            var vrHeadsets = Enumerable.Range(1, 4)
                .Select(i => new Resource { ResourceTypeId = 3, ResourceName = $"VR Headset {i}" });
            var aiServers = new[] { new Resource { ResourceTypeId = 4, ResourceName = "AI Server" } };

            context.Resources.AddRange(dropinDesks);
            context.Resources.AddRange(meetingRooms);
            context.Resources.AddRange(vrHeadsets);
            context.Resources.AddRange(aiServers);

            context.SaveChanges();
        }
    }
}