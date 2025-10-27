export const SIGNALS = {
  "verbal_signals": [
    {
      "cues": ["How much does it cost?", "What's the price?", "Is there a discount?"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_forward",
        "emotional_state": "curious",
      },
      "agent_instruction": "The user is interested in pricing. Your next step is to provide clear pricing information. Address their questions about cost, discounts, and value directly. Your goal is to be transparent and build trust.",
      "agent_reaction": "Provide Pricing",
    },
    {
      "cues": [
        "How does it work?",
        "Can you explain that again?",
        "I don't understand.",
      ],
      "perception_event": {
        "facial_expression": "furrowed_brow",
        "body_language": "leaning_forward",
        "emotional_state": "confused",
      },
      "agent_instruction": "The user is confused. Your next response should simplify the explanation. Use an analogy or offer a demonstration to clarify how it works. Your goal is to ensure they understand before moving on.",
      "agent_reaction": "Clarify and Simplify",
    },
    {
      "cues": [
        "That's great!",
        "I'm excited about this.",
        "This is exactly what I need.",
      ],
      "perception_event": {
        "facial_expression": "smiling",
        "body_language": "nodding",
        "emotional_state": "enthusiastic",
      },
      "agent_instruction": "The user is showing strong enthusiasm. Your next step is to capitalize on this positive momentum. Reinforce the benefits they've identified and smoothly guide them toward the next logical step in the process.",
      "agent_reaction": "Reinforce and Advance",
    },
    {
      "cues": ["I need to think about it", "It's too expensive, but..."],
      "perception_event": {
        "facial_expression": "furrowed_brow",
        "body_language": "leaning_back",
        "emotional_state": "hesitant",
      },
      "agent_instruction": "The user is hesitant. Your next response should address their underlying objections without being pushy. Offer reassurance, clarify the value proposition, and explore their concerns with empathy.",
      "agent_reaction": "Needs Reassurance / Handle Objection",
    },
  ],
  "non_verbal_signals": [
    {
      "cues": ["Arms Crossed"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "crossed_arms",
        "emotional_state": "skeptical",
      },
      "agent_instruction": "The user has crossed their arms, signaling defensiveness. Your next response should aim to disarm them. Ask an open-ended question to understand their perspective and build rapport.",
      "agent_reaction": "Acknowledge Defensiveness",
    },
    {
      "cues": ["Duchenne Smile"],
      "perception_event": {
        "facial_expression": "smiling",
        "body_language": "relaxed",
        "emotional_state": "happy",
      },
      "agent_instruction": "The user is genuinely smiling, indicating happiness and rapport. Your next response should mirror this positive emotion to strengthen the connection.",
      "agent_reaction": "Mirror Positive Emotion",
    },
    {
      "cues": ["Furrowed Brows"],
      "perception_event": {
        "facial_expression": "furrowed_brow",
        "body_language": "tense",
        "emotional_state": "angry",
      },
      "agent_instruction": "The user's brows are furrowed, suggesting anger or deep concentration. Your next step is to clarify the situation. Ask a question to understand the source of their concern or frustration.",
      "agent_reaction": "Address Concern",
    },
    {
      "cues": ["Raised Eyebrows"],
      "perception_event": {
        "facial_expression": "raised_eyebrows",
        "body_language": "leaning_forward",
        "emotional_state": "curious",
      },
      "agent_instruction": "The user has raised their eyebrows, a sign of surprise or interest. Your next response should capitalize on this by providing more engaging information or asking a thought-provoking question.",
      "agent_reaction": "Encourage Engagement",
    },
    {
      "cues": ["Lip Biting"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "tense",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is biting their lip, indicating anxiety. Your next response should be reassuring and calm to help alleviate their worry.",
      "agent_reaction": "Offer Reassurance",
    },
    {
      "cues": ["Nodding"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "nodding",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is nodding in agreement. Your next step is to continue the conversation's flow, building on this positive signal.",
      "agent_reaction": "Continue Conversation",
    },
    {
      "cues": ["Head Shake"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "shaking_head",
        "emotional_state": "skeptical",
      },
      "agent_instruction": "The user is shaking their head in disagreement. Your next response should address this directly. Acknowledge their disagreement and ask for clarification.",
      "agent_reaction": "Address Disagreement",
    },
    {
      "cues": ["Leaning Forward"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_forward",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is leaning forward, showing engagement. Your next response should maintain this engagement by providing valuable information or asking a relevant question.",
      "agent_reaction": "Acknowledge Engagement",
    },
    {
      "cues": ["Slouching"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_back",
        "emotional_state": "neutral",
      },
      "agent_instruction": "The user is slouching, which can indicate disinterest. Your next response should re-engage them. Try asking a question or introducing a new topic.",
      "agent_reaction": "Re-engage User",
    },
    {
      "cues": ["Steady Eye Contact"],
      "perception_event": {
        "facial_expression": "eye_contact",
        "body_language": "relaxed",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is maintaining steady eye contact, a sign of trust. Your next response should build on this by being open and trustworthy in return.",
      "agent_reaction": "Build Rapport",
    },
    {
      "cues": ["Gaze Aversion"],
      "perception_event": {
        "facial_expression": "looking_away",
        "body_language": "tense",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is looking away, which can signal discomfort. Your next response should be gentle and aim to make them feel more comfortable.",
      "agent_reaction": "Assess Comfort Level",
    },
    {
      "cues": ["Rapid Blinking"],
      "perception_event": {
        "facial_expression": "blinking",
        "body_language": "tense",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is blinking rapidly, a sign of stress. Your next response should be calm and reassuring.",
      "agent_reaction": "Detect Arousal",
    },
    {
      "cues": ["Stepping Closer"],
      "perception_event": {
        "facial_expression": "smiling",
        "body_language": "leaning_forward",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is moving closer, indicating a high level of engagement. Your next response should be warm and welcoming.",
      "agent_reaction": "Flirtation Alert",
    },
    {
      "cues": ["Backing Away"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_back",
        "emotional_state": "hesitant",
      },
      "agent_instruction": "The user is backing away, signaling discomfort. Your next response should respect their space and give them room.",
      "agent_reaction": "Respect Space",
    },
    {
      "cues": ["Sighing"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_back",
        "emotional_state": "sad",
      },
      "agent_instruction": "The user is sighing, which could mean several things. Your next response should gently probe to understand the emotion behind the sigh.",
      "agent_reaction": "Clarify Emotion",
    },
    {
      "cues": ["Head Tilt"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "relaxed",
        "emotional_state": "curious",
      },
      "agent_instruction": "The user is tilting their head, showing curiosity. Your next response should provide more information to satisfy their curiosity.",
      "agent_reaction": "Encourage Active Listening",
    },
    {
      "cues": ["Shallow Breaths"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "tense",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is taking shallow breaths, a sign of anxiety. Your next response should be calming and help them feel at ease.",
      "agent_reaction": "Address Stress",
    },
    {
      "cues": ["Mirroring Posture"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "relaxed",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is mirroring your posture, indicating a connection. Your next response should reinforce this connection.",
      "agent_reaction": "Enhance Connection",
    },
    {
      "cues": ["Quick Movements"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "restless",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is making quick, restless movements. Your next response should be grounding and help them to slow down.",
      "agent_reaction": "Detect Impatience",
    },
    {
      "cues": ["Foot Tapping"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "fidgeting",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is tapping their foot, a sign of impatience or restlessness. Your next response should be concise and to the point.",
      "agent_reaction": "Address Restlessness",
    },
    {
      "cues": ["Shoulder Shrug"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "relaxed",
        "emotional_state": "confused",
      },
      "agent_instruction": "The user shrugged, indicating uncertainty. Your next response should provide clarity or ask a clarifying question.",
      "agent_reaction": "Express Doubt",
    },
    {
      "cues": ["Eye Roll"],
      "perception_event": {
        "facial_expression": "looking_away",
        "body_language": "leaning_back",
        "emotional_state": "frustrated",
      },
      "agent_instruction": "The user rolled their eyes, signaling annoyance. Your next response should address their frustration or change the topic.",
      "agent_reaction": "Flag Disapproval",
    },
    {
      "cues": ["Pursed Lips"],
      "perception_event": {
        "facial_expression": "frowning",
        "body_language": "tense",
        "emotional_state": "skeptical",
      },
      "agent_instruction": "The user is pursing their lips, a sign of disapproval. Your next response should address their potential disagreement.",
      "agent_reaction": "Acknowledge Negative Judgment",
    },
    {
      "cues": ["Fist Clench"],
      "perception_event": {
        "facial_expression": "frowning",
        "body_language": "tense",
        "emotional_state": "angry",
      },
      "agent_instruction": "The user has clenched their fist, a strong sign of anger. Your next response should be de-escalating.",
      "agent_reaction": "Tension Alert",
    },
    {
      "cues": ["Open Palms"],
      "perception_event": {
        "facial_expression": "smiling",
        "body_language": "open_posture",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user is showing open palms, a sign of honesty. Your next response should be equally open and honest to build trust.",
      "agent_reaction": "Invite Trust",
    },
    {
      "cues": ["Yawn"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "leaning_back",
        "emotional_state": "neutral",
      },
      "agent_instruction": "The user is yawning, indicating boredom. Your next response should be more engaging or ask a question to recapture their attention.",
      "agent_reaction": "Fatigue Check",
    },
    {
      "cues": ["Nail Biting"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "fidgeting",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is biting their nails, a sign of anxiety. Your next response should be reassuring.",
      "agent_reaction": "Describe Anxiety",
    },
    {
      "cues": ["Pacing"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "restless",
        "emotional_state": "anxious",
      },
      "agent_instruction": "The user is pacing, a sign of agitation. Your next response should be calming and direct.",
      "agent_reaction": "Address Agitation",
    },
    {
      "cues": ["Freezing"],
      "perception_event": {
        "facial_expression": "surprised",
        "body_language": "tense",
        "emotional_state": "overwhelmed",
      },
      "agent_instruction": "The user has frozen, indicating shock. Your next response should be gentle and give them a moment to process.",
      "agent_reaction": "Pause Interaction",
    },
    {
      "cues": ["Wide Stance"],
      "perception_event": {
        "facial_expression": "neutral",
        "body_language": "open_posture",
        "emotional_state": "engaged",
      },
      "agent_instruction": "The user has taken a wide stance, a sign of confidence. Your next response should match their level of confidence.",
      "agent_reaction": "Acknowledge Power Stance",
    }
  ]
}
