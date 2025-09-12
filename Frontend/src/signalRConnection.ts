import * as signalR from "@microsoft/signalr";

const token = localStorage.getItem("token");

export const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://83c353ae5f2e.ngrok-free.app/bookingHub", {
    accessTokenFactory: () => token || ""
  })
  .withAutomaticReconnect()
  .build();