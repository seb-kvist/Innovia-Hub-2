using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace restAi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public ChatController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        public record ChatRequest(string question);

        [HttpPost]
        public async Task<IActionResult> Chat ([FromBody] ChatRequest request)
        {
            var http = _httpClientFactory.CreateClient("openai");

            var body = new
            {
                model = "gpt-4.1",

                input = new object[]
                {
                    new {
                        role = "system",
                        content ="Det du kan göra är att: svara på frågor om kapacitet för mötesrum. Svara på hur många mötesrum, skrivbord, AI servers, och VR-headset vi har. Ge förslag på vilka resurser kunden borde boka beroende på den information hon eller han ger. Du kan INTE göra bokningar åt kunden, men du kan guida kunden att göra bokningen. Att göra en bokning är enkelt, om en kund frågar hur man gör kan du ge dom en guide: 1. Välj den resurs du vill boka. 2. Välj först datum. 3. Välj sedan tidsslott. 4. Klicka sedan på boka-knappen.Sedan kan kunden se sina bokningar på Profil-sidan. Du ska endast svara på frågor som har med vårat bokningsystem att göra. Ställer de icke-relevanta frågor så ska du ignorera deras frågor och be dom förklara att du endast hjälper kunden att använda vårat system. InnoviaHub har: 4st mötesrum med kapacitet för 10 personer per mötesrum som bokas per timme. 4st VR headset som bokas per timme. 15st skrivbord som bokas per timme. 1st AI server som bokas per timme."
                    },
                    new {
                        role = "assistant",
                        content = "Hej! Jag är din assistent för att hjälpa dig med bokningar av våra resurser. Hur kan jag hjälpa dig idag?"
                    },
                    new {
                        role = "user",
                        content = request.question
                    }
                }
            };

            var content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");
            var response = await http.PostAsync("responses", content);

            var raw = await response.Content.ReadAsStringAsync();

            System.Console.WriteLine("raw:" + raw);

            var doc = JsonDocument.Parse(raw);
            var root = doc.RootElement;
            string answer = root.GetProperty("output")[0].GetProperty("content")[0].GetProperty("text").GetString() ?? "inget svar";

            return Ok(answer);
        }

    }
}
