import { CONVERSAION_WEBHOOK_URL } from "@/config";

export function sendPerceptionWebhook(data: Record<string, any>) {
  fetch(CONVERSAION_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).catch((error) => {
    console.error("Error sending perception webhook:", error);
  });
}
