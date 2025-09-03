using Microsoft.AspNetCore.Identity;

namespace Backend.Models;

/// Identity-användare. Ärver från IdentityUser<int> vilket ger Id, Email, PasswordHash m.m.
public class User : IdentityUser
{
    public string Name { get; set; }
}