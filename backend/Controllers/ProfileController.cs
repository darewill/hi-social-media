using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers {

[ApiController]
[Route("api/[controller]")]
public class ProfileController : ControllerBase
{
    private static List<UserProfile> profiles = new List<UserProfile>
    {
        new UserProfile
        {
            Id = 1,
            Name = "John Doe",
            Username = "johndoe",
            Bio = "Software Developer",
            Gender = "Male",
            ProfileImage = "default-image-url"
        }
    };

    [HttpGet("{id}")]
    public IActionResult GetProfile(int id)
    {
        var profile = profiles.FirstOrDefault(p => p.Id == id);
        if (profile == null) return NotFound();
        return Ok(profile);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateProfile(int id, [FromBody] UserProfile updatedProfile)
    {
        var profile = profiles.FirstOrDefault(p => p.Id == id);
        if (profile == null) return NotFound();

        profile.Name = updatedProfile.Name;
        profile.Username = updatedProfile.Username;
        profile.Bio = updatedProfile.Bio;
        profile.Gender = updatedProfile.Gender;
        profile.ProfileImage = updatedProfile.ProfileImage;

        return Ok(profile);
    }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Username { get; set;}
    public string Bio { get; set; }
    public string Gender { get; set; }
    public string ProfileImage { get; set; }
}

}