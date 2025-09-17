# Innovia Hub – Intranät och bokningssystem

Detta repo innehåller projektarbetet för kursuppgiften **Innovia Hub**, där vi som utvecklingsteam utvecklar ett intranät och bokningssystem åt coworkingcentret Innovia Hub.

## Om uppgiften

Projektet går ut på att ta fram ett system som hanterar:
- Bokning av resurser i realtid (skrivbord, mötesrum, VR-headset, AI-server)
- Användarvänlig administrationspanel för medlemmar
- Integration av realtidsdata från sensorer (tillhandahålls via mockat API)
- Responsiv design för dator, surfplatta och mobil

## Teknikstack

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