import React, { useState, useEffect, useRef } from 'react';
import '@millicast/sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Broadcast = () => {
  const [mediaStream, setMediaStream] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [publisher, setPublisher] = useState(null);
  const [playbackUrl, setPlaybackUrl] = useState('');
  const videoRef = useRef(null);

  const yourPublishingToken = 'b9dd0ce12913b4b149fe39555c8c1c25161227061e1b1e3893171d368093e267';
  // const yourStreamAccountId = 'j9ccCM';
  const yourStreamName = 'myStreamName';

  useEffect(() => {
    const initializePublisher = async () => {
      try {
        const tokenGenerator = () =>
          window.millicast.Director.getPublisher({
            token: yourPublishingToken,
            streamName: yourStreamName,
          });

        const publisherInstance = new window.millicast.Publish(yourStreamName, tokenGenerator);
        setPublisher(publisherInstance);
      } catch (error) {
        console.error('Error initializing Millicast publisher:', error);
      }
    };

    initializePublisher();

    return () => {
      if (publisher) {
        publisher.stop();
      }
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startStreaming = async () => {
    if (!publisher) {
      console.error('Publisher is not initialized.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      const videoNode = videoRef.current;
      videoNode.srcObject = stream;
      videoNode.hidden = false;
      videoNode.autoplay = true;

      await publisher.connect({ mediaStream: stream });
      console.log('Broadcast has begun.');

      const newPlaybackUrl = `http://localhost:3000/playback`;
      setPlaybackUrl(newPlaybackUrl);
      document.getElementById('viewer-url').innerHTML = `<a href="${newPlaybackUrl}" target="_new">${newPlaybackUrl}</a>`;

      setMediaStream(stream);
    } catch (e) {
      console.error('Failed to begin broadcast', e);
    }
  };

  const toggleMute = () => {
    if (mediaStream) {
      const audioTracks = mediaStream.getAudioTracks();
      if (audioTracks.length > 0) {
        const newMuteStatus = !isMuted;
        setIsMuted(newMuteStatus);
        audioTracks[0].enabled = !newMuteStatus;
      }
    }
  };

  const toggleCamera = () => {
    if (mediaStream) {
      const videoTracks = mediaStream.getVideoTracks();
      if (videoTracks.length > 0) {
        const newCameraStatus = !isCameraOn;
        setIsCameraOn(newCameraStatus);
        videoTracks[0].enabled = newCameraStatus;
      }
    }
  };

  const copyToClipboard = () => {
    if (playbackUrl) {
      navigator.clipboard.writeText(playbackUrl).then(
        () => alert('Playback URL copied to clipboard!'),
        (err) => console.error('Failed to copy: ', err)
      );
    }
  };

  return (
    <div className="container px-4 mt-4">
      <div className="row justify-content-around mt-3">
        <div className="col-8 shadow p-3 mb-5 bg-body rounded text-center">
          <h1>Broadcast</h1>
          <video
            width="640"
            height="360"
            ref={videoRef}
            className="vidBox"
            controls
          >
            This browser does not support video playback.
          </video>
          <div className="mt-3">
            <button type="button" className="btn btn-dark mx-1" onClick={toggleMute}>
              <i className={`bi ${isMuted ? 'bi-volume-up' : 'bi-volume-mute'}`}></i> {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button type="button" className="btn btn-dark mx-1" onClick={toggleCamera}>
              <i className={`bi ${isCameraOn ? 'bi-camera' : 'bi-camera-off'}`}></i> {isCameraOn ? 'Toggle Camera' : 'Camera Off'}
            </button>
            <div className="mt-2">
              <button type="button" className="btn btn-dark mx-1" onClick={startStreaming}>
                <i className="bi bi-play-circle-fill"></i> Start Stream
              </button>
              <button
                type="button"
                className="btn btn-dark mx-1"
                onClick={() => {
                  if (publisher) {
                    publisher.stop();
                    window.location.reload();
                  }
                }}
              >
                <i className="bi bi-pause-circle-fill"></i> Stop Stream
              </button>
              <button
                type="button"
                className="btn btn-dark mx-1"
                onClick={copyToClipboard}
              >
                <i className="bi bi-share"></i> Invite
              </button>
            </div>
          </div>
          <div className="text-center" id="viewer-url"></div>
        </div>
      </div>
    </div>
  );
};

export default Broadcast;
