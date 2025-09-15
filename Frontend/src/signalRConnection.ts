import * as signalR from "@microsoft/signalr";

const token = localStorage.getItem("token");

export const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://2b991f4fb50d.ngrok-free.app/bookingHub", {
    accessTokenFactory: () => token || ""
  })
  .withAutomaticReconnect()
  .build();