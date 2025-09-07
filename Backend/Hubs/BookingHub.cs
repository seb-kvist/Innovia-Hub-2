using System;
using Microsoft.AspNetCore.SignalR;


namespace Backend.Hubs;

public class BookingHub : Hub
{
    //Metod som anropas från backend för att visa klienter att bokning är gjord
    public async Task SendBookingUpdate(string message)
    {
        await Clients.All.SendAsync("ReceiveBookingUpdate", message);
    }
}
