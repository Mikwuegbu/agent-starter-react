import { useState, useEffect, useRef } from "react";
import { useSendAppMessage } from "../../hooks/cvi-events-hooks";
import styles from "../conversation/conversation.module.css";
import { useConversation } from "@/context/ConversationContext";
import { EarIcon, EarOffIcon     } from "lucide-react"

export const MuteAgentButton = () => {
  const { conversation, isInvited: isGuest } = useConversation();
  const sendAppMessage = useSendAppMessage();
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Only show the button for the host (not guest)
  if (isGuest) {
    return null;
  }

  // Handle continuous interrupts while muted
  useEffect(() => {
    if (isMuted && conversation?.conversation_id) {
      // Send initial interrupt
      sendAppMessage({
        message_type: "conversation",
        event_type: "conversation.interrupt",
        conversation_id: conversation.conversation_id,
      });

      // Set up interval to continuously send interrupts
      intervalRef.current = setInterval(() => {
        sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.interrupt",
          conversation_id: conversation.conversation_id,
        });
      }, 1000); // Send interrupt every 1 second
    } else {
      // Clear interval when unmuted
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isMuted, conversation?.conversation_id, sendAppMessage]);

  const handleMuteAgent = () => {
    if (!conversation?.conversation_id) return;

    setIsMuted(!isMuted);
    console.warn("Mute agent?", isMuted);
  };    

  return (
    <button
      type="button"
      className={styles.muteAgentButton}
      onClick={handleMuteAgent}
      aria-label={isMuted ? "Unmute agent" : "Mute agent"}
      title={isMuted ? "Unmute agent" : "Mute agent"}
    >
      <span className={styles.muteAgentButtonIcon}>
        {isMuted ? (
          // Unmute icon (speaker with sound waves)
        <EarOffIcon/>
        ) : (
          // Mute icon (speaker with line through it)
         <EarIcon/>
        )}
      </span>
    </button>
  );
};
