import { useState } from "react"

function IndexPopup() {
  const [prompt, setPrompt] = useState("")
  const [status, setStatus] = useState("")

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      setStatus("Please enter a prompt");
      return;
    }

    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab.id) return setStatus("No active tab found");

      await chrome.tabs.sendMessage(tab.id, { type: "INSERT_PROMPT", prompt });
      setStatus("Prompt sent! ✓");
      setPrompt("");
      setTimeout(() => setStatus(""), 2000);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div
      style={{
        minWidth: "450px",
        minHeight: "300px",
        padding: "20px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#fff"
      }}>
      <h2 style={{
        margin: "0 0 8px 0",
        fontSize: "20px",
        color: "#333",
        fontWeight: "600"
      }}>
        TinyToken
      </h2>
      <p style={{
        margin: "0 0 16px 0",
        fontSize: "14px",
        color: "#666"
      }}>
        Send a prompt to ChatGPT or Claude
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your prompt here... (Shift+Enter for new line)"
        autoFocus
        style={{
          width: "100%",
          minHeight: "150px",
          padding: "12px",
          border: "2px solid #e5e7eb",
          borderRadius: "8px",
          fontSize: "14px",
          fontFamily: "inherit",
          resize: "vertical",
          outline: "none",
          boxSizing: "border-box",
          lineHeight: "1.5"
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          marginTop: "16px",
          padding: "12px",
          border: "none",
          background: "#10a37f",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "15px",
          fontWeight: "600",
          transition: "background 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#0d8c6f"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#10a37f"}>
        Send to Chat
      </button>

      {status && (
        <p style={{
          marginTop: "12px",
          fontSize: "14px",
          color: status.includes("✓") ? "#10a37f" : "#ef4444",
          textAlign: "center",
          fontWeight: "500"
        }}>
          {status}
        </p>
      )}
    </div>
  )
}

export default IndexPopup