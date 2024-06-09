    // Hàm xử lý khi người dùng nhấn nút hoặc phím Enter
    function handleUserInput() {
    const userInput = document.getElementById("user-query");
    const userQuery = userInput.value.trim();
    
    if (userQuery === "") return;
    
    userInput.value = ""; // Reset input value
    
    // Vô hiệu hóa nút send-request
    const sendRequestButton = document.getElementById("send-request");
    sendRequestButton.disabled = true;
    
    // Ngăn người dùng nhấn phím Enter
    const userQueryInput = document.getElementById("user-query");
    userQueryInput.disabled = true;
    
    // Hiển thị chữ "Loading..."
    document.getElementById("loading").style.display = "block";
    
    const chatWindow = document.getElementById("chat-window");
    chatWindow.innerHTML += `<div class="message user">User: ${userQuery}</div>`;
    
    fetchBotResponse(userQuery)
        .then((botResponse) => {
        if (botResponse) {
            chatWindow.innerHTML += `<div class="message bot">Bot: ${botResponse.content}</div>`;
        } else {
            chatWindow.innerHTML += '<div class="message bot">Bot: No response received.</div>';
        }
        })
        .catch((error) => {
        chatWindow.innerHTML += `<div class="message bot">Bot: Error: ${error.message}</div>`;
        })
        .finally(() => {
        // Kích hoạt lại nút send-request
        sendRequestButton.disabled = false;
    
        // Kích hoạt lại khả năng nhập cho input
        userQueryInput.disabled = false;
    
        // Ẩn chữ "Loading..."
        document.getElementById("loading").style.display = "none";
        });
    }
    
    // Hàm fetch để gửi yêu cầu đến bot và nhận câu trả lời
    const api = "https://us-central1-tesingcoze.cloudfunctions.net/app"
    const api_local = "http://localhost:3000"
    async function fetchBotResponse(userQuery) {
        try {
            const response = await fetch(`${api}/coze-ai`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    query: userQuery,
                }),
            });
            
            const data = await response.json();
            if (data && data.messages) {
                const botResponse = data.messages.find(
                    (message) => message.type === "answer"
                );
                return botResponse;
            } else {
                throw new Error("No response received from the bot.");
            }
        } catch (error) {
            console.error("Error fetching from API:", error);
            // Nếu fetch từ API không thành công, thử fetch từ API local
            try {
                const response = await fetch(`${api_local}/coze-ai`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: userQuery,
                    }),
                });
                
                const data = await response.json();
                if (data && data.messages) {
                    const botResponse = data.messages.find(
                        (message) => message.type === "answer"
                    );
                    return botResponse;
                } else {
                    throw new Error("No response received from the bot.");
                }
            } catch (error) {
                console.error("Error fetching from local API:", error);
                throw error;
            }
        }
    }
    
    // Gắn sự kiện click cho nút send-request
    document.getElementById("send-request").addEventListener("click", () => {
    if (!document.getElementById("send-request").disabled) {
        handleUserInput();
    }
    });
    
    // Gắn sự kiện keydown cho input để xử lý khi người dùng nhấn phím Enter
    document.getElementById("user-query").addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !document.getElementById("send-request").disabled) {
        handleUserInput();
    }
    });  