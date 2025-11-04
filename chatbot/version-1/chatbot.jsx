function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = React.useState('');

    function saveInputText(event) {
        setInputText(event.target.value);
    }

    function sendMessage() {
        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);

        const response = Chatbot.getResponse(inputText);
        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID()
            }
        ]);

        setInputText('');
    }

    return (
        <div className="chat-input-container">
            <input
                placeholder="Send a message to Chatbot"
                size="30"
                onChange={saveInputText}
                value={inputText}
                className="chat-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >Send</button>
        </div>
    );
}



function ChatMessage( {message, sender} ) {
    return (
        <div className={
            sender === 'user'
                ? 'chat-message-user'
                : 'chat-message-robot'
        }>
            {sender === 'robot' && (
                <img
                    src="./images/robot.png"
                    className="chat-message-profile"
                />
            )}
            <div className="chat-message-text">
                {message}
            </div>
            {sender === 'user' && (
                <img
                    src="./images/user.png"
                    className="chat-message-profile"
                />
            )}
        </div>
    );
}



function ChatMessages({ chatMessages }) {
    const chatMessagesRef = React.useRef(null);

    React.useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [chatMessages]);

    return (
        <div
            className="chat-messages-container"
            ref={chatMessagesRef}
        >
            {chatMessages.map((chatMessage) => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    );
}



function App() {
    const [chatMessages, setChatMessages] = React.useState([]);
    
    return (
        <div className="app-container">
            <ChatMessages
                chatMessages={chatMessages}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}



const container = document.querySelector('.js-container');
ReactDOM.createRoot(container).render(<App />);