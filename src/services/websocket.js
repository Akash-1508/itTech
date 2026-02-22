class WebSocketService {
  constructor() {
    this.ws = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000; // 3 seconds
    this.listeners = new Map();
    this.messageQueue = [];
  }

  // Connect to WebSocket
  connect(token) {
    if (this.ws && this.isConnected) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      try {
        const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:4000';
        this.ws = new WebSocket(`${wsUrl}?token=${token}`);

        this.ws.onopen = () => {
          console.log('WebSocket connected');
          this.isConnected = true;
          this.reconnectAttempts = 0;
          
          // Send queued messages
          while (this.messageQueue.length > 0) {
            const message = this.messageQueue.shift();
            this.send(message);
          }
          
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket disconnected:', event.code, event.reason);
          this.isConnected = false;
          
          // Attempt to reconnect if not a normal closure
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnect();
          }
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };

      } catch (error) {
        console.error('Error creating WebSocket connection:', error);
        reject(error);
      }
    });
  }

  // Reconnect to WebSocket
  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.log('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    setTimeout(() => {
      const token = localStorage.getItem('token');
      if (token) {
        this.connect(token).catch(error => {
          console.error('Reconnection failed:', error);
        });
      }
    }, this.reconnectInterval);
  }

  // Send message
  send(message) {
    if (!this.isConnected) {
      // Queue message for later
      this.messageQueue.push(message);
      return;
    }

    try {
      this.ws.send(JSON.stringify(message));
    } catch (error) {
      console.error('Error sending WebSocket message:', error);
    }
  }

  // Handle incoming messages
  handleMessage(data) {
    const { type } = data;
    
    // Emit to all listeners for this message type
    if (this.listeners.has(type)) {
      this.listeners.get(type).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in WebSocket message handler:', error);
        }
      });
    }

    // Handle specific message types
    switch (type) {
      case 'connection':
        console.log('WebSocket connection established:', data.message);
        break;
      
      case 'order_update':
        this.handleOrderUpdate(data);
        break;
      
      case 'appointment_reminder':
        this.handleAppointmentReminder(data);
        break;
      
      case 'chat_message':
        this.handleChatMessage(data);
        break;
      
      case 'system_notification':
        this.handleSystemNotification(data);
        break;
      
      case 'otp':
        this.handleOTP(data);
        break;
      
      case 'error':
        console.error('WebSocket error:', data.message);
        break;
      
      default:
        console.log('Unknown WebSocket message type:', type);
    }
  }

  // Handle order updates
  handleOrderUpdate(data) {
    const { orderId, update } = data;
    console.log(`Order ${orderId} updated:`, update);
    
    // You can emit a custom event or use a state management solution
    this.emit('orderUpdate', { orderId, update });
  }

  // Handle appointment reminders
  handleAppointmentReminder(data) {
    const { appointmentId, appointment } = data;
    console.log(`Appointment reminder for ${appointmentId}:`, appointment);
    
    // Show notification to user
    this.showNotification('Appointment Reminder', `You have an appointment scheduled for ${appointment.date}`);
    
    this.emit('appointmentReminder', { appointmentId, appointment });
  }

  // Handle chat messages
  handleChatMessage(data) {
    const { senderId, content, orderId } = data;
    console.log(`Chat message from ${senderId}:`, content);
    
    this.emit('chatMessage', { senderId, content, orderId });
  }

  // Handle system notifications
  handleSystemNotification(data) {
    const { notification } = data;
    console.log('System notification:', notification);
    
    this.showNotification(notification.title, notification.message);
    this.emit('systemNotification', notification);
  }

  // Handle OTP
  handleOTP(data) {
    const { otp } = data;
    console.log('OTP received via WebSocket');
    
    this.emit('otp', { otp });
  }

  // Show browser notification
  showNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        }
      });
    }
  }

  // Join a room
  joinRoom(room) {
    this.send({
      type: 'join_room',
      room
    });
  }

  // Leave a room
  leaveRoom(room) {
    this.send({
      type: 'leave_room',
      room
    });
  }

  // Send chat message
  sendChatMessage(recipientId, content, orderId = null) {
    this.send({
      type: 'chat_message',
      recipientId,
      content,
      orderId
    });
  }

  // Ping server
  ping() {
    this.send({
      type: 'ping',
      timestamp: Date.now()
    });
  }

  // Add event listener
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  // Remove event listener
  off(event, callback) {
    if (this.listeners.has(event)) {
      const callbacks = this.listeners.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Emit event to listeners
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Error in event handler:', error);
        }
      });
    }
  }

  // Disconnect
  disconnect() {
    if (this.ws) {
      this.ws.close(1000, 'Client disconnecting');
      this.ws = null;
      this.isConnected = false;
    }
  }

  // Get connection status
  getStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts
    };
  }
}

// Create singleton instance
const websocketService = new WebSocketService();

export default websocketService; 