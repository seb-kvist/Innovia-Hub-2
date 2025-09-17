# Innovia Hub – Intranät och bokningssystem

Detta repo innehåller projektarbetet för kursuppgiften **Innovia Hub**.

## Om uppgiften

Innovia Hub är ett intranät och bokningssystem för coworkingcentret Innovia Hub. Systemet är byggt för att underlätta vardagen för både medlemmar och administratörer.

För användaren
- Medlemmar kan logga in och boka resurser i realtid, som skrivbord, mötesrum, VR-headsets och AI-servrar.
- Systemet visar aktuellt tillgängliga tider och uppdateras automatiskt via SignalR när någon annan gör en bokning – användaren ser direkt om en tid blir upptagen.
- En responsiv och enkel frontend gör att systemet kan användas på dator, surfplatta och mobil.

För administratören
- Administratörer har en egen panel där de kan hantera användare, resurser och bokningar.
- De kan aktivera/inaktivera resurser, ta bort bokningar eller uppdatera information om medlemmar.
- All data hanteras via ett API som backend tillhandahåller.

Tekniska funktioner
- Backend är byggt i ASP.NET Core med Entity Framework Core och Identity för autentisering och behörigheter.
- Bokningar och användare lagras i en SQL-databas (MySQL).
- Realtidskommunikation sker med SignalR, vilket gör att alla användare får live-uppdateringar utan att behöva ladda om sidan.
- Frontend är byggd i React (Vite) och kommunicerar med backend via ett REST API och en SignalR-klient.


## Vår Stack

- **Backend:** ASP.NET Core (C#)
- **Frontend:** React
- **Databas:** SQL (MySQL)
- **Realtidskommunikation:** SignalR
- **Deployment:** DigitalOcean
- **API:** Mockat sensor-API

---

## Kom igång – Installation (Backend + Frontend)

Nedan följer en steg-för-steg guide för att köra projektet lokalt.

### 1. Backend

Öppna en terminal i `Backend/` och kör:
```powershell
cd Backend
dotnet restore
dotnet build
dotnet run
```

Backend startar på `http://localhost:5022` (API-bas: `http://localhost:5022/api`).

Notera:
- Projektet seedar data och en admin-användare vid första körningen (se `Services/DbSeeder.cs`).
- Standard-admin skapas med: användarnamn `admin`, lösenord `Admin@123`, roll `admin`.
- SignalR hub körs på `/bookingHub`.

### 2. Starta Frontend

Frontend använder Vite och läser API-bas via `VITE_API_URL`.

1. Skapa en .env i `Frontend` med:
```env
VITE_API_URL=http://localhost:5022/api
```

Öppna en ny terminal i `Frontend/` och kör:
```powershell
cd Frontend
npm install
npm run dev
```

Frontend startar på `http://localhost:5173` 

---

## Strukturen
- `Backend/` – ASP.NET Core API, EF Core, Identity, SignalR
- `Frontend/` – React + Vite, React Router, SignalR-klient

## DATABASEN (TBA)
Mer info om hur du använder databasen kommer här.
