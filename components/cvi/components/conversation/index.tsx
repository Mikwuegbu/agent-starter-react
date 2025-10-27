import React, { useEffect, useCallback, useRef } from 'react';
import {
	DailyAudio,
	DailyVideo,
	useDevices,
	useLocalSessionId,
	useMeetingState,
	useScreenVideoTrack,
	useVideoTrack,
	useParticipantIds,
	useRecording,
} from '@daily-co/daily-react';
import {
	MicSelectBtn,
	CameraSelectBtn,
	ScreenShareButton,
} from '../device-select';
import { useLocalScreenshare } from '../../hooks/use-local-screenshare';
import { useReplicaIDs } from '../../hooks/use-replica-ids';
import { useCVICall } from '../../hooks/use-cvi-call';
import { useDocumentPIP } from '../../hooks/use-document-pip';
import { AudioWave } from '../audio-wave';
import { PipButton } from '../pip-button';
import { MuteAgentButton } from '../mute-agent-button';

import styles from './conversation.module.css';
import clsx from 'clsx';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChromaKeyOverlay } from '../webgl-video';

import { useConversation } from '@/context/ConversationContext';
import { Circle } from 'lucide-react';

interface ConversationProps {
	onLeave: () => void;
	conversationUrl: string;
	layout?: 'spotlight' | 'side-by-side' | 'grid';
}

const VideoPreview = React.memo(({ id }: { id: string }) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const replicaIds = useReplicaIDs();
	const isReplica = replicaIds.includes(id);
	const videoState = useVideoTrack(id);
	const widthVideo = videoState.track?.getSettings()?.width;
	const heightVideo = videoState.track?.getSettings()?.height;
	const isVertical =
		widthVideo && heightVideo ? widthVideo < heightVideo : false;

	const isMobile = useIsMobile();
	console.log('isReplica', isReplica);
	return (
		<div
			className={`${styles.previewVideoContainer} ${
				isVertical ? styles.previewVideoContainerVertical : ''
			} ${videoState.isOff ? styles.previewVideoContainerHidden : ''}`}
		>
			<DailyVideo
				automirror
				sessionId={id}
				type="video"
				style={
					isMobile && {
						objectFit: 'cover',
						width: '100%',
						height: '100%',
						objectPosition: 'center',
					}
				}
				className={clsx(
					styles.previewVideo,
					isVertical ? styles.previewVideoVertical : '',
					videoState.isOff ? styles.previewVideoHidden : ''
				)}
				ref={videoRef}
			/>
			<div className={styles.audioWaveContainer}>
				<AudioWave id={id} />
			</div>

			{isReplica && <ChromaKeyOverlay videoElement={videoRef.current} />}
		</div>
	);
});
VideoPreview.displayName = 'VideoPreview';

const PreviewVideos = React.memo(() => {
	const ids = useParticipantIds();
	const { isScreenSharing } = useLocalScreenshare();
	const replicaIds = useReplicaIDs();
	const replicaId = replicaIds[0];

	return (
		<>
			{isScreenSharing && <VideoPreview id={replicaId} />}

			{ids
				.filter((id) => id !== replicaId)
				.map((id) => {
					return <VideoPreview key={id} id={id} />;
				})}
		</>
	);
});

PreviewVideos.displayName = 'PreviewVideos';

const MainVideo = () => {
	const videoRef = useRef<HTMLVideoElement>(null);
	const replicaIds = useReplicaIDs();
	const localId = useLocalSessionId();
	const videoState = useVideoTrack(replicaIds[0]);
	const screenVideoState = useScreenVideoTrack(localId);
	const isScreenSharing = !screenVideoState.isOff;
	// This is one-to-one call, so we can use the first replica id
	const replicaId = replicaIds[0];

	if (!replicaId) {
		return (
			<div className={styles.waitingContainer}>
				<p>Connecting...</p>
			</div>
		);
	}

	// Switching between replica video and screen sharing video
	return (
		<div
			className={`${styles.mainVideoContainer} ${
				isScreenSharing ? styles.mainVideoContainerScreenSharing : ''
			}`}
		>
			<DailyVideo
				automirror
				sessionId={isScreenSharing ? localId : replicaId}
				type={isScreenSharing ? 'screenVideo' : 'video'}
				className={`${styles.mainVideo}
				${isScreenSharing ? styles.mainVideoScreenSharing : ''}
				${videoState.isOff ? styles.mainVideoHidden : ''}`}
				ref={videoRef}
			/>
			<ChromaKeyOverlay videoElement={videoRef.current} />
		</div>
	);
};

export const Conversation = React.memo(
	({ onLeave, conversationUrl, layout = 'spotlight' }: ConversationProps) => {
		const conversationRef = useRef<HTMLDivElement>(null);
		const { joinCall, leaveCall } = useCVICall();

		const meetingState = useMeetingState();
		const { hasMicError } = useDevices();
		const { isScreenSharing } = useLocalScreenshare();
		const { isPipSupported, isPipActive, togglePip, enterPip } =
			useDocumentPIP(conversationRef);
		const ids = useParticipantIds();
		const replicaIds = useReplicaIDs();
		const replicaId = replicaIds[0];

		const { startRecording, stopRecording, isRecording } = useRecording();
		const { setIsRecording, isInvited: isGuest } = useConversation();

		useEffect(() => {
			if (isScreenSharing) {
				enterPip();
			}
		}, [isScreenSharing, enterPip]);

		useEffect(() => {
			if (meetingState === 'error') {
				console.log('Meeting error');
				onLeave();
			}
		}, [meetingState, onLeave]);

		// Sync recording state with context
		useEffect(() => {
			setIsRecording(isRecording);
		}, [isRecording, setIsRecording]);

		// Auto-start recording when meeting is joined
		useEffect(() => {
			// Only auto-start recording for hosts, not guests
			if (isGuest) {
				console.warn('Guest mode: not auto-starting recording');
				return;
			}

			// Start recording when we have participants and meeting is loaded/joining
			const currentState = meetingState as any;
			console.log({ currentState });
			if (
				(currentState === 'joined-meeting' || currentState === 'joined') &&
				!isRecording &&
				ids.length > 0
			) {
				console.log('Auto-starting recording...', {
					meetingState: currentState,
					participantCount: ids.length,
				});
				startRecording();
			}
		}, [meetingState, isRecording, startRecording, ids.length, isGuest]);

		// Initialize call when conversation is available
		useEffect(() => {
			console.log('Initializing call...', conversationUrl);
			joinCall({ url: conversationUrl });
		}, []);

		const handleLeave = useCallback(() => {
			if (isRecording) {
				stopRecording();
			}
			leaveCall();
			onLeave();
		}, [leaveCall, onLeave, isRecording, stopRecording]);

		const handleRecording = useCallback(() => {
			if (isRecording) {
				stopRecording();
			} else {
				startRecording();
			}
		}, [isRecording, startRecording, stopRecording]);

		return (
			<div className={styles.container} ref={conversationRef}>
				<div
					className={`${styles.videoContainer} ${
						layout === 'side-by-side' ? styles.videoContainerSideBySide : ''
					}`}
				>
					{hasMicError && (
						<div className={styles.errorContainer}>
							<p>
								Camera or microphone access denied. Please check your settings
								and try again.
							</p>
						</div>
					)}

					{layout === 'grid' ? (
						<div className={styles.gridContainer}>
							{(replicaId
								? [replicaId, ...ids.filter((id) => id !== replicaId)]
								: ids
							).map((id) => (
								<VideoPreview id={id} key={id} />
							))}
						</div>
					) : (
						<>
							{/* Main video */}
							<div
								className={
									layout === 'side-by-side'
										? styles.mainVideoSideBySide
										: styles.mainVideoContainer
								}
							>
								<MainVideo />
							</div>

							{/* Self view */}
							<div
								className={
									layout === 'side-by-side'
										? styles.selfViewSideBySide
										: styles.selfViewContainer
								}
							>
								<PreviewVideos />
							</div>
						</>
					)}
				</div>

				<div className={styles.footer}>
					<div className="flex gap-2 flex-wrap justify-center">
						{/* Microphone button */}
						<MicSelectBtn />

						{/* Camera button */}
						<CameraSelectBtn />

						{/* Screen share button */}
						<ScreenShareButton />

						{/* Picture-in-picture button */}
						<PipButton
							isPipSupported={isPipSupported}
							isPipActive={isPipActive}
							togglePip={togglePip}
						/>

						{/* Mute agent button */}
						<MuteAgentButton />

						{/* Recording button - only show for host */}
						{!isGuest && (
							<button
								type="button"
								className={clsx(
									styles.muteAgentButton,
									isRecording && styles.recordingButtonActive
								)}
								onClick={handleRecording}
								aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
								title={isRecording ? 'Stop Recording' : 'Start Recording'}
							>
								<span className={styles.muteAgentButtonIcon}>
									<Circle
										className={
											isRecording
												? 'fill-white text-white'
												: 'fill-white text-white'
										}
									/>
								</span>
							</button>
						)}

						{/* Leave button */}
						<button
							type="button"
							className={styles.leaveButton}
							onClick={handleLeave}
						>
							<span className={styles.leaveButtonIcon}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									role="img"
									aria-label="Leave Call"
								>
									<path
										d="M18 6L6 18M6 6L18 18"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</span>
						</button>
					</div>
				</div>

				<DailyAudio />
			</div>
		);
	}
);
