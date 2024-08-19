// /* eslint-disable no-undef */
// import React, { useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import '@millicast/sdk';

// const Playback = () => {
//   useEffect(() => {
//     const yourStreamAccountId = 'j9ccCM';
//     const yourStreamName = 'myStreamName';

//     const tokenGenerator = () =>
//       millicast.Director.getSubscriber({
//         streamName: yourStreamName,
//         streamAccountId: yourStreamAccountId,
//       });

//     const videoNode = document.getElementById('streaming-video-placeholder');
//     const millicastView = new millicast.View(yourStreamName, tokenGenerator);

//     millicastView.on('track', (event) => {
//       console.log('Stream has started.');
//       videoNode.srcObject = event.streams[0];
//       videoNode.hidden = false;
//       videoNode.autoplay = true;
//     });

//     const startConnection = async () => {
//       try {
//         await millicastView.connect();
//       } catch (e) {
//         if (!millicastView.isActive()) {
//           console.log('Stream is not live, the broadcast will begin soon.');
//         }
//         console.log('Connection failed:', e);
//         millicastView.reconnect();
//       }
//     };

//     startConnection();
//   }, []);

//   return (
//     <div className="container px-4 mt-4">
//       <div className="row justify-content-around mt-3">
//         <div className="col-8 shadow p-3 mb-5 bg-body rounded text-center">
//           <h1>Playback</h1>
//           <video
//             width="640"
//             height="360"
//             id="streaming-video-placeholder"
//             className="vidBox"
//             controls
//           >
//             This browser does not support video playback.
//           </video>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Playback;



// works fine till here---------------------------------------------------------
import React, { useEffect } from 'react';
import '@millicast/sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Playback = () => {
  const yourStreamAccountId = 'j9ccCM';
  const yourStreamName = 'myStreamName';

  useEffect(() => {
    const initializePlayback = async () => {
      try {
        const tokenGenerator = () =>
          window.millicast.Director.getSubscriber({
            streamName: yourStreamName,
            streamAccountId: yourStreamAccountId,
          });

        const videoNode = document.getElementById('playback-video');
        const millicastView = new window.millicast.View(
          yourStreamName,
          tokenGenerator
        );
        
        millicastView.on('track', (event) => {
          console.log('Stream has started.');
          videoNode.srcObject = event.streams[0];
          videoNode.hidden = false;
          videoNode.autoplay = true;
        });

        await millicastView.connect();
      } catch (e) {
        console.error('Failed to connect to stream', e);
      }
    };

    initializePlayback();

    return () => {
      const videoNode = document.getElementById('playback-video');
      if (videoNode && videoNode.srcObject) {
        const tracks = videoNode.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="container px-4 mt-4">
      <div className="row justify-content-around mt-3">
        <div className="col-8 shadow p-3 mb-5 bg-body rounded text-center">
          <h1>Playback</h1>
          <video
            width="640"
            height="360"
            id="playback-video"
            className="vidBox"
            controls
          >
            This browser does not support video playback.
          </video>
        </div>
      </div>
    </div>
  );
};

export default Playback;
