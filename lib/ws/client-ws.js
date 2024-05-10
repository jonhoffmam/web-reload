(async () => {
  const socketUrl = 'ws://localhost:8090';
  let socket = new WebSocket(socketUrl);

  let failureMessage = 'Connection lost, refresh page';

  socket.onopen = () => {
    console.log('Connection established');
  };

  socket.onmessage = (event) => {
    failureMessage = event.data;
  };

  socket.onclose = () => {
    const interAttemptTimeoutMilliseconds = 1000;
    const maxDisconnectedTimeMilliseconds = 3000;
    const maxAttempts = Math.round(maxDisconnectedTimeMilliseconds / interAttemptTimeoutMilliseconds);

    let attempts = 0;

    const reloadIfCanConnect = () => {
      attempts++;

      if (attempts > maxAttempts) {
        console.error('Could not reconnect to dev server.');
        document.body.innerHTML = failureMessage;

        return;
      }

      socket = new WebSocket(socketUrl);

      socket.addEventListener('error', () => {
        setTimeout(reloadIfCanConnect, interAttemptTimeoutMilliseconds);
      });

      socket.addEventListener('open', () => {
        location.reload();
      });
    };

    reloadIfCanConnect();
  };
})();
