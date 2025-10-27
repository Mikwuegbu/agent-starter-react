"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  useObservableEvent,
  useSendAppMessage,
} from "./cvi/hooks/cvi-events-hooks";
import { SIGNALS } from "@/lib/signals";
import { useConversation } from "@/context/ConversationContext";
import { sendPerceptionWebhook } from "@/lib/webhook";

const IGNORE_DELIMITER = "#<SYSTEM>:";
const SELECTED_AGENT_FOR_TRUTHMATRIX = "p536524de9b8";

const TavusConversationWithTranscription = () => {
  const { conversation, isInvited, user } = useConversation();
  const [transcription, setTranscription] = useState([]);
  const sendAppMessage = useSendAppMessage();

  const [currentPerceptions, setCurrentPerceptions] = useState({
    facial_expression: "",
    body_language: "",
    emotional_state: "",
  });

  // Track if the replica is currently speaking
  const [isReplicaSpeaking, setIsReplicaSpeaking] = useState(false);
  const isReplicaSpeakingRef = useRef(isReplicaSpeaking);

  useEffect(() => {
    isReplicaSpeakingRef.current = isReplicaSpeaking;
  }, [isReplicaSpeaking]);


  const debouncedSendAppMessage = useCallback(
    debounce((newContext) => {
      // Use the ref to get the latest speaking state, avoiding stale closures
      if (!isReplicaSpeakingRef.current) {
        console.warn("Propagating agent response...");
        sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.respond",
          conversation_id: conversation?.conversation_id,
          properties: {
            text: IGNORE_DELIMITER + newContext,
          },
        });
      } else {
        console.warn("Skipping message send because replica is speaking...");
      }
    }, 6000),
    [conversation, sendAppMessage] // isReplicaSpeaking is removed to keep the debounced function stable
  );

  useObservableEvent((event) => {
    if (isInvited) {
      console.warn("Guest user, skipping event", event);
      return;
    }

    // Handle replica speaking events
    if (event.event_type === "conversation.replica.started_speaking") {
      console.warn("Replica started speaking");
      setIsReplicaSpeaking(true);
    }

    if (event.event_type === "conversation.replica.stopped_speaking") {
      console.warn("Replica stopped speaking");
      setIsReplicaSpeaking(false);
    }

    if (event.event_type === "conversation.utterance") {
      const utteranceData = event.properties;
      console.warn("Utterance data:", utteranceData);
      if (utteranceData.speech?.length > 0) {
        // ignore the transcript that starts with the `IGNORE_DELIMITER`
        if (utteranceData.speech.includes(IGNORE_DELIMITER)) {
          console.warn(
            "ignoring system transcript that starts with custom instruction: ",
            utteranceData.speech
          );
          return;
        }

        setTranscription((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random().toString(16).substring(6),
            role: utteranceData.role,
            content: utteranceData.speech,
            timestamp: new Date().toLocaleTimeString(),
          },
        ]);
      }
    }

    if (event.event_type === "conversation.perception_tool_call") {
      let perceptionData = event.properties || ({} as any);
      // console.log("perception_tool_call:", perceptionData);

      let updatedPerceptions = { ...currentPerceptions };

      if (perceptionData.name === "notify_if_trigger_micro_reaction") {
        updatedPerceptions.facial_expression =
          perceptionData.arguments.facial_expression;
        updatedPerceptions.body_language =
          perceptionData.arguments.body_language;
      } else if (perceptionData.name === "notify_if_report_emotion") {
        updatedPerceptions.emotional_state =
          perceptionData.arguments.emotional_state;
      }

      setCurrentPerceptions(updatedPerceptions);

      const allSignals = [
        ...SIGNALS.verbal_signals,
        ...SIGNALS.non_verbal_signals,
      ];

      const matchedSignal = allSignals.find(
        (signal) =>
          signal.perception_event.facial_expression ===
            updatedPerceptions.facial_expression &&
          signal.perception_event.body_language ===
            updatedPerceptions.body_language &&
          signal.perception_event.emotional_state ===
            updatedPerceptions.emotional_state
      );

      if (
        matchedSignal &&
        conversation?.selected_agent?.persona_id ===
          SELECTED_AGENT_FOR_TRUTHMATRIX
      ) {
        const cues = matchedSignal.cues.flatMap((c, i) => `${i + 1} ${c}.`);
        const newContext = `
Only respond contextually when the Cues are met with the current conversation history, otherwise give a generic response.

# Cues:
${matchedSignal.agent_instruction}
${cues.join("\n")}`;

        // console.warn("Signal:", matchedSignal);
        // console.warn("Signal: new context", newContext);

        // overrite the context..
        sendAppMessage({
          message_type: "conversation",
          event_type: "conversation.overwrite_llm_context",
          conversation_id: conversation?.conversation_id,
          properties: {
            context: newContext,
          },
        });

        // then forward the message
        debouncedSendAppMessage(newContext);
      }

      Object.assign(perceptionData, {
        user: {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
        },
        date: new Date(),
        conversation_id: conversation?.conversation_id,
      });
      sendPerceptionWebhook(perceptionData);
    }
  });

  const messagesEndRef = useRef(null);

  if (!user) {
    return <>Waiting for user to be authenticated...</>;
  }

  return (
    <div className="overflow-y-auto scrollbar w-full max-h-96 sm:max-w-2xl mx-auto bg-transparent backdrop-blur-md border-0">
      <div className="backdrop-blur-md bg-black/40 border border-white/20 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="font-bold text-lg text-white">Live Transcription</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {transcription.length === 0 ? (
            <div className="text-center text-white/60 py-8">
              <p>Waiting for conversation to begin...</p>
            </div>
          ) : (
            transcription.map((item) => (
              <div
                key={item.id + Math.random().toString(16)}
                className={`p-3 rounded-lg max-w-[90%] backdrop-blur-sm ${
                  item.role === "user"
                    ? "bg-blue-500/20 ml-auto border border-blue-400/30"
                    : "bg-white/5 mr-auto border border-white/10"
                }`}
              >
                <div className="text-xs font-medium text-white/70 mb-1">
                  {item.role === "user" ? "You" : "AI"} • {item.timestamp}
                </div>
                <div className="text-sm text-white font-[Roboto]">
                  {item.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default TavusConversationWithTranscription;
