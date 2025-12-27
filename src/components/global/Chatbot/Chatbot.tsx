import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    time: string;
    type?: 'text' | 'disclaimer';
}

interface Button {
    label: string;
    action: string;
}

interface ChatbotProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CONTENT = {
    disclaimer: `Disclaimer: Our coaching sessions are led by qualified psychologists based in India and are offered for psychoeducation, emotional support, and personal development.\nCoaching is not therapy, does not include diagnosis or treatment, and may not be a regulated mental-health service in your region.\nFor licensed therapy or clinical care, please use the verified therapy resources provided.\nIf you feel unsafe or in crisis, contact local emergency services or crisis helplines immediately.`,
    opening: `Hi, I’m here to explain the different kinds of support available.\nYou don’t need to know what you need right now — many people feel unsure at first.\n\nIf you’re comfortable sharing, what are you feeling at the moment?`,
    reflection: `Thank you for sharing that.\nPeople experience these feelings in many different ways, and there isn’t one meaning behind them.\n\nI can share some general information about the types of support available here. You can explore any of them at your own pace.`,
    venting: `Venting is a space to express what you're feeling to a trained listener.\nThe purpose is emotional release and the experience of being heard.\n\nVenting does not include advice, diagnosis, treatment, or psychological analysis.\nIt is simply a private, supportive space to talk.`,
    coaching: `Coaching is a guided, skill-building conversation led by qualified psychologists based in India.\n\nIt focuses on:\n• emotional awareness\n• managing overthinking\n• relationship patterns\n• building confidence & clarity\n• personal growth tools\n\nCoaching is not therapy and does not involve diagnosis or medical treatment.`,
    therapy: `Therapy is provided by licensed mental-health professionals who diagnose and treat mental-health conditions.\n\nWe do not provide therapy inside this chat.\nInstead, we redirect you to verified external therapy platforms where you can connect with licensed professionals.`,
    crisis: `I’m really sorry that you’re feeling this way.\nThis chat cannot provide crisis support.\n\nPlease reach out to immediate, real-time help through your local emergency services or suicide prevention helplines.`,
    fallback: `I can help you explore Venting, Coaching, or Therapy. What would you like to know?`,
    crisisKeyword: `I’m really glad you reached out, but this space can’t provide crisis support.\nPlease contact your local emergency services or suicide prevention helplines immediately.`
};

const BUTTONS: Record<string, Button[]> = {
    feelings: [
        { label: "Overwhelmed / stressed", action: "feeling_picked" },
        { label: "Sad / low", action: "feeling_picked" },
        { label: "Confused / stuck", action: "feeling_picked" },
        { label: "Numb / disconnected", action: "feeling_picked" },
        { label: "Not sure", action: "feeling_picked" },
        { label: "I’d rather not say", action: "feeling_picked" }
    ],
    reflection: [
        { label: "What is Venting?", action: "explain_venting" },
        { label: "What is Coaching?", action: "explain_coaching" },
        { label: "What is Therapy?", action: "explain_therapy" },
        { label: "What if I feel unsafe?", action: "crisis_mode" }
    ],
    venting: [
        { label: "Start Venting", action: "goto_venting" },
        { label: "Learn about Coaching", action: "explain_coaching" }
    ],
    coaching: [
        { label: "Book Coaching", action: "goto_coaching" },
        { label: "Learn about Venting", action: "explain_venting" }
    ],
    therapy: [
        { label: "View Therapy Resources", action: "goto_therapy" },
        { label: "Learn about Coaching", action: "explain_coaching" }
    ],
    crisis: [
        { label: "Open Crisis Helplines", action: "goto_helpline" }
    ]
};

const CRISIS_KEYWORDS = ["suicide", "kill myself", "end my life", "want to die", "self-harm", "hurt myself"];

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: CONTENT.disclaimer, sender: 'bot', time: '', type: 'disclaimer' }
    ]);
    const [activeButtons, setActiveButtons] = useState<Button[]>(BUTTONS.feelings);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const panelRef = useRef<HTMLDivElement>(null);
    const helperBubbleRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

    const addBotMessage = (text: string, buttons: Button[] = []) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const newMessage: Message = {
                id: generateId(),
                text: text,
                sender: 'bot',
                time: getTime()
            };
            setMessages(prev => [...prev, newMessage]);
            if (buttons.length > 0) setActiveButtons(buttons);
        }, 600);
    };

    const addUserMessage = (text: string) => {
        const newMessage: Message = {
            id: generateId(),
            text: text,
            sender: 'user',
            time: getTime()
        };
        setMessages(prev => [...prev, newMessage]);
        setActiveButtons([]);
    };


    // GSAP Panel Animation
    useGSAP(() => {
        if (isOpen) {
            gsap.to(panelRef.current, {
                display: 'flex',
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power3.out'
            });
            gsap.to(helperBubbleRef.current, {
                opacity: 0,
                y: 10,
                duration: 0.2
            });
        } else {
            gsap.to(panelRef.current, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: 'power3.in',
                onComplete: () => {
                    if (panelRef.current) panelRef.current.style.display = 'none';
                }
            });
            // Show helper bubble if not open
            gsap.to(helperBubbleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 1,
                ease: 'back.out(1.7)'
            });
        }
    }, { scope: containerRef, dependencies: [isOpen] });

    useEffect(() => {
        // Add first bot message after disclaimer
        setTimeout(() => {
            addBotMessage(CONTENT.opening);
        }, 500);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);



    const handleAction = (action: string, label: string) => {
        addUserMessage(label);

        switch (action) {
            case 'feeling_picked':
                addBotMessage(CONTENT.reflection, BUTTONS.reflection);
                break;
            case 'explain_venting':
                addBotMessage(CONTENT.venting, BUTTONS.venting);
                break;
            case 'explain_coaching':
                addBotMessage(CONTENT.coaching, BUTTONS.coaching);
                break;
            case 'explain_therapy':
                addBotMessage(CONTENT.therapy, BUTTONS.therapy);
                break;
            case 'crisis_mode':
                addBotMessage(CONTENT.crisis, BUTTONS.crisis);
                break;
            case 'goto_venting':
                navigate('/venting');
                setIsOpen(false);
                break;
            case 'goto_coaching':
                navigate('/coaching');
                setIsOpen(false);
                break;
            case 'goto_therapy':
                navigate('/therapy');
                setIsOpen(false);
                break;
            case 'goto_helpline':
                window.open('https://findahelpline.com/', '_blank');
                break;
            default:
                addBotMessage(CONTENT.fallback, BUTTONS.reflection);
        }
    };

    const handleSend = () => {
        const txt = inputValue.trim();
        if (!txt) return;
        setInputValue('');
        addUserMessage(txt);

        const lower = txt.toLowerCase();
        if (CRISIS_KEYWORDS.some(kw => lower.includes(kw))) {
            addBotMessage(CONTENT.crisisKeyword, BUTTONS.crisis);
            return;
        }

        setTimeout(() => {
            addBotMessage(CONTENT.fallback, BUTTONS.reflection);
        }, 600);
    };

    return (
        <div ref={containerRef} className="fixed bottom-6 right-6 z-[999999] font-body">
            {/* Helper Bubble */}
            <div
                ref={helperBubbleRef}
                className="absolute bottom-20 right-0 bg-white text-vo-black py-3 px-5 rounded-t-2xl rounded-bl-2xl shadow-sm text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none"
            >
                How can we help you?
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-[60px] h-[60px] bg-[#F57F17] text-white border-none rounded-full cursor-pointer flex items-center justify-center shadow-[0_4px_12px_rgba(245,127,23,0.4)] transition-transform hover:scale-105 z-[999998]"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="white" />
                </svg>
            </button>

            {/* Chat Panel */}
            <div
                ref={panelRef}
                className="fixed sm:absolute bottom-[80px] right-0 sm:right-0 w-[90vw] sm:w-[390px] h-[80vh] sm:h-[560px] bg-white/80 backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[999999] opacity-0 translate-y-5 hidden"
            >
                <div className="flex-[0_0_56px] px-4 bg-white/40 border-b border-white/30 flex items-center justify-between">
                    <span className="font-heading font-bold text-lg text-vo-text-primary">Message</span>
                    <button onClick={() => setIsOpen(false)} className="text-vo-text-primary text-2xl">✕</button>
                </div>

                <div className="flex-grow overflow-y-auto p-4 flex flex-col gap-3 bg-transparent scroll-smooth custom-scrollbar">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            {msg.type === 'disclaimer' ? (
                                <div className="w-full p-3 bg-white/60 backdrop-blur-sm border border-white/30 rounded-base text-[10px] text-vo-text-muted leading-relaxed whitespace-pre-wrap mb-2">
                                    {msg.text}
                                </div>
                            ) : (
                                <>
                                    <div className={`py-3 px-4 text-sm leading-relaxed rounded-3xl max-w-[85%] break-words whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-[#C8EAC9] text-vo-text-primary self-end' : 'bg-vo-secondary text-vo-text-primary self-start'}`}>
                                        {msg.text}
                                    </div>
                                    <span className="text-[10px] text-vo-text-muted mt-1">{msg.time}</span>
                                </>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="py-3 px-4 bg-vo-secondary rounded-3xl self-start flex gap-1 items-center">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.32s]"></div>
                        </div>
                    )}
                    {activeButtons.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2 w-full">
                            {activeButtons.map((btn, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAction(btn.action, btn.label)}
                                    className="h-9 px-4 bg-[#F57F17] text-white border-none rounded-3xl text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90 flex items-center"
                                >
                                    {btn.label}
                                </button>
                            ))}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="flex-[0_0_56px] p-2.5 bg-white/40 border-t border-white/30 flex items-center gap-3">
                    <input
                        className="flex-grow h-9 border border-vo-border-light rounded-lg px-3 text-sm outline-none text-vo-text-primary font-body"
                        type="text"
                        placeholder="Type something..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button onClick={handleSend} className="text-[#F57F17] text-2xl">➔</button>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="sm:hidden fixed inset-0 bg-black/50 z-[999990] animate-fade-in"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d4d4d4; border-radius: 3px; }
                @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
                .animate-fade-in { animation: fade-in 0.3s ease; }
            `}} />
        </div>
    );
};

export default Chatbot;
